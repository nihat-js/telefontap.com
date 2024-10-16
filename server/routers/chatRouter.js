const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
// const knex = require("../db/connection"); // Adjust the path to your Knex setup
const { hashPassword, verifyPassword } = require("../utils/password")
const { generateSessionToken, generateResetPasswordByEmailCode } = require("../utils");
const { DEFAULT_TOKEN_LIFESPAN_MS, RESET_PASSWORD_CODE_LIFESPAN, API_RESPONSE_CODES } = require("../config/constants");
const prisma = require("../config/db");
const parseUserAgent = require("../utils/parseUserAgent");
const { VerificationType } = require("@prisma/client");
const EmailService = require("../services/EmailService");
const admin = require("firebase-admin")


const router = express.Router();


router.get("/chats/", getAll)

router.get("/chat/:chatId/messages", getAllMessages)
router.get("/chat/:chatId/sendMessage", sendMessage)
router.get("/chat/:chatId/markLastRead", markLastRead)
router.delete("/chat/:chatId", deleteChat)

async function getAll(req, res) {
  let chats = await prisma.userChat.findMany({
    where: {
      userId: req.user.id
    }
  })
  res.json(API_RESPONSE_CODES.SUCCESS).json({ data: chats })
}

async function sendMessage(req, res) {
  const { text } = req.body
  let chat = await prisma.chat.find
  let chats = await prisma.message.create({
    data: {
      senderId: req.usser.id,
      text: text,

    }
  })
  res.json(API_RESPONSE_CODES.SUCCESS).json({ data: chats })
} s

async function getMessages(req, res) {
  const { skip, limit } = req.params

  let hasAccessToChat = await prisma.userChat.findFirst({
    where: {
      chatId: req.params.chatId
    }
  })
  if (!hasAccessToChat) {
    return res.status(API_RESPONSE_CODES.BAD_REQUEST).send()
  }
  let messages = await prisma.message.findMany({
    where: {
      chatId: req.params.chatId
    }
  })
  // let lastOtherUserMessageId = messages.filter(item => item.senderId != req.user.id)
  // lastOtherUserMessageId = lastOtherUserMessageId.find()
  // for (let message of messages) {
  //   if (message.senderId != req.user.id && message.id > lastOtherUserMessageId) {
  //     return
  //   }
  // }


  res.json(API_RESPONSE_CODES.SUCCESS).json({ data: messages })

}




// router.post("/chat/:chatId/participants", addParticipant)
// router.delete("/chat/:chatId/participants/:userId", removeParticipant)
// router.patch("/chat/:chatId/title", updateChatTitle);
// router.get("/chat/:chatId/participants", getChatParticipants);
// 





