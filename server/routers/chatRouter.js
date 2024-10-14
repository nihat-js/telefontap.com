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
const EmailService = require("../services/EmailService");
const admin = require("firebase-admin")


const router = express.Router();


router.get("/chat/start", startChat)

router.get("/chat/:chatId/messages", getAllMessages)
router.get("/chat/:chatId/sendMessage", sendMessage)
router.get("/chat/:chatId/markLastRead", markLastRead)
router.delete("/chat/:chatId", deleteChat)

// router.post("/chat/:chatId/participants", addParticipant)
// router.delete("/chat/:chatId/participants/:userId", removeParticipant)
// router.patch("/chat/:chatId/title", updateChatTitle);
// router.get("/chat/:chatId/participants", getChatParticipants);
// 





