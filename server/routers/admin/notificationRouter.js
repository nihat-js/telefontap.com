const express = require("express")
const prisma = require("../../config/db")
const router = express.Router()


router.post("/send-notification", sendNotification)

async function sendNotification(req, re) {
  let { userId, message, metaLink } = req.query

  await prisma.notification.create({
    data : {
      userId : req.query.userId,
      message : message,
      type : "AD",
    }
  })

}