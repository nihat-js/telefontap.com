const express = require("express");
const prisma = require("../config/db");
const { API_RESPONSE_CODES } = require("../config/constants");
const { verifyPassword, hashPassword } = require("../utils/password");

const router = express.Router();


// router.get("/user/:userId/chats", getAllChatsForUser);


// router.get("/user/:userId/chats", getAllChatsForUser);


router.get("/account/sessions", allSessions)
router.delete("/account/logout", logout)
router.delete("/account/sessions/:sessionId", logoutSession)
router.delete("/account/sessions/:sessionId", logoutSession)

router.post('/account/change-password', changePassword);
// router.post('/account/preferences', preferences);

// router.delete("")

async function logout(req, res) {
  const token = req.cookies.token
  prisma.session.delete({
    where: {
      userId: req.user.id,
      token: token
    }
  }).then(result => {
    res.status(API_RESPONSE_CODES.SUCCESS).json({ code: "OK" })
  }).catch(error => {
    console.log({ error })
    res.status(API_RESPONSE_CODES.BAD_REQUEST).send()
  })
}

async function allSessions(req, res) {
  let sessions = await prisma.session.findMany({
    where: {
      userId: req.user.id
    }
  })
  res.status(API_RESPONSE_CODES.SUCCESS).json({ data: sessions })
}

async function logoutSession(req, res) {
  prisma.session.delete({
    where: {
      userId: req.user.id,
      id: +req.params.sessionId
    }
  }).then(result => {
    res.status(API_RESPONSE_CODES.SUCCESS).json({ data: sessions })
  }).catch(error => {
    console.log({ error })
    res.status(API_RESPONSE_CODES.BAD_REQUEST).send()
  })
}

async function changePassword(req, res) {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const isValidPassword = await verifyPassword(oldPassword, user.password)
    // res.json({ "asdads"})
    console.log({ isValidPassword })

    if (!isValidPassword) {
      return res.status(400).json({ code: 'INVALID_OLD_PASSWORD' });
    }
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: await hashPassword(newPassword) },
    });

    return res.json({ message: 'Password changed successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error changing password', error });
  }
}


module.exports = router