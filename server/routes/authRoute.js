const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const knex = require("../db/connection"); // Adjust the path to your Knex setup

const router = express.Router();



async function registerViaEmail(req, res) {
  const { email, password } = req.body
  const existingUser = await prisma.user.findUnique({
    where: { email: email }
  })
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" })
  }

  const hashedPassword = await hashPassword(password)
  const newUser = await prisma.user.create({
    data: { email: email, password: hashedPassword }
  })
  res.status(201).json({ message: 'User registered successfully' });
}



router.post("register", async function (req, res) {
  // email ? registerViaEmail(req, res) : registerViaPhoneNumber(req, res)
  registerViaEmail(req, res)
})

router.post("login", async function (req, res) {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await verifyPassword(password, user.password))) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Create a session token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })
  await prisma.session.create({
    data: {
      token,
      userId: user.id
    }
  })

  res.json({ message: "Login successfull", token },)
})

router.post("logout", async (req, res) => {
  await prisma.session.deleteMany({
    where: { userId: req.user.userId }
  })
  res.json({ message: "Logged out successfully" })
})





module.exports = router;
