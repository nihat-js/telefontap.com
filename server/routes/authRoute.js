const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
// const knex = require("../db/connection"); // Adjust the path to your Knex setup
const { hashPassword, verifyPassword } = require("../utils/password")
const { generateSessionToken, generateResetPasswordByEmailCode } = require("../utils");
const { DEFAULT_TOKEN_LIFESPAN_MS, RESET_PASSWORD_CODE_LIFESPAN } = require("../config/constants");
const prisma = require("../config/db");
const parseUserAgent = require("../utils/parseUserAgent");
const { VerificationType } = require("@prisma/client");
const EmailService = require("../service/EmailService");
const admin = require("firebase-admin")


const router = express.Router();


router.post("/register", register)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.post("/logout", logout)
router.post("/verify-email", verifyEmail)
router.post("/reset-password", resetPassword)
router.post("/logout-all-except-me", logoutAllExceptMe)


function social() {
  const idToken = req.body
  // const decodedToken = await admin.auth().verifyIdToken(idToken)
  // const uid = decodedToken.uid
  // admin.SDK_VERSION
}

function loginWithPhoneNumber(){

  //send 4 digit code
}


// router.post("/send-verification-code", sendVerificationCode); // New
// router.post("/confirm-verification-code", confirmVerificationCode); //
// router.delete("/account", deleteAccount); // New
// router.get("/auth/social", initiateSocialLogin); // New
// router.get("/auth/social/callback", socialLoginCallback); // New




// router.post("/2fa/enable", enableTwoFactorAuth); // New
// router.post("/2fa/disable", disableTwoFactorAuth); // New
// router.post("/2fa/verify", verifyTwoFactorCode); /



async function register(req, res) {
  // email ? registerViaEmail(req, res) : registerViaPhoneNumber(req, res)
  registerViaEmail(req, res)
}

async function registerViaEmail(req, res) {
  const { name, email, password } = req.body
  if (password.length < 6) {
    return res.json({
      code: "PASSWORD_TOO_SHORT"
    }, 401)
  }
  const existingUser = await prisma.user.findUnique({
    where: { email: email }
  })


  if (existingUser) {
    return res.status(400).json({
      code: "USER_ALREADY_EXISTS"
    }
    )
  }

  const hashedPassword = await hashPassword(password)
  const newUser = await prisma.user.create({
    data: {
      name,
      email: email,
      password: hashedPassword
    }
  })

  const token = generateSessionToken()
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const browserInfo = parseUserAgent(req.headers['user-agent'])
  await prisma.session.create({
    data: {
      userId: newUser.id,
      token,
      ipAddress,
      browserInfo: browserInfo,
      expiresAt: new Date(Date.now() + DEFAULT_TOKEN_LIFESPAN_MS)
    }
  })
  res.cookie('token', token, {
    maxAge: DEFAULT_TOKEN_LIFESPAN_MS, //
    httpOnly: true, // Prevents client-side access
    secure: false, // Send cookie over HTTPS only (requires HTTPS)
    sameSite: 'Strict' // Controls cookie sending behavior
  })

  res.status(201).json({ message: 'User registered successfully' });
}


async function login(req, res) {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.password))) {
    return res.status(401).json({
      code: 'INVALID_CREDENTIALS'
    });
  }
  // Create a session token
  const token = generateSessionToken()
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const browserInfo = parseUserAgent(req.headers['user-agent'])
  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      ipAddress,
      browserInfo: browserInfo,
      expiresAt: new Date(Date.now() + DEFAULT_TOKEN_LIFESPAN_MS)
    }
  })
  res.cookie('token', token, {
    maxAge: DEFAULT_TOKEN_LIFESPAN_MS, //
    httpOnly: true, // Prevents client-side access
    secure: false, // Send cookie over HTTPS only (requires HTTPS)
    sameSite: 'Strict' // Controls cookie sending behavior
  })
  res.json({
    code: "LOGIN_SUCCESSFUL",
    token
  },)
  // })
}

async function verifyEmail() {

}
async function resetPassword() {

}

async function changePassword() {

}

async function logout(req, res) {
  await prisma.session.deleteMany({
    where: { userId: req.user.userId }
  })
  res.json({ message: "Logged out successfully" })
}

async function logoutAllExceptMe(req, res) {
  await prisma.session.deleteMany({
    where: {
      userId: req.user.id,
      NOT: {
        id: req.cookie("token"),
      }
    }

  })
  res.json({ message: "Logged out successfully" })
}



/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

async function forgotPassword(req, res) {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({
      code: "EMAIL_REQUIRED"
    })
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json(
      { code: 'USER_NOT_FOUND' }
    )
  }
  const code = generateResetPasswordByEmailCode()
  let emailService = new EmailService()
  // emailService.sendVerificationEmail()
  await prisma.verificationCode.create({
    data: {
      code,
      userId: user.id,
      type: VerificationType.CONFIRM_BY_EMAIL,
      expiresAt: new Date(Date.now() + RESET_PASSWORD_CODE_LIFESPAN)
    }
  })

  res.status(201).json({
    code: "CODE_SENT"
  })

}


module.exports = router;
