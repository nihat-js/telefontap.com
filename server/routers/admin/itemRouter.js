const express = require("express")
const prisma = require("../../config/db")
const router = express.Router()


router.post("/items", listItems)
router.post("/change-status", changeStatus)
router.post("/publish-it", publishIt)


router.post("/items/:itemId/reports", reportItem);
router.post("/items/bulk-change-status", bulkChangeStatus);
router.post("/items/bulk-publish", bulkPublishItems);



async function listItems(req, re) {
  let { userId, message, metaLink } = req.query

  await prisma.notification.create({
    data: {
      userId: req.query.userId,
      message: message,
      type: "AD",
    }
  })
}

async function changeStatus(req, re) {
  let { userId, message, metaLink } = req.query

  await prisma.notification.create({
    data: {
      userId: req.query.userId,
      message: message,
      type: "AD",
    }
  })
}
