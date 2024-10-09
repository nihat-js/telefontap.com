const express = require("express");
const knex = require("../db/connection"); // Adjust the path to your Knex setup
const authenticate = require("../middleware/authenticate"); // Your JWT middleware
const prisma = require("../config/db");

const router = express.Router();


router.post("/upload-image", uploadImage)
router.post("/item", createPhone)
router.delete("/item", deletePhone)


async function createPhone(req, res) {
  const { brand, model, condition, description, user } = req.body

  const images = await prisma.itemImage.find({
    where: {
      userId: user.id
    }
  })

  await prisma.phone.updateMany({
    where: {
      userId: user.id
    }
  })






  await prisma.item.create({
    data: {
      brand,
      description,
      model,

    }
  })

}

async function deleteItem() {

}



async function uploadImage() {
  const images = await prisma.itemImage.find({
    where: {
      userId: user.id
    }
  })
}



module.exports = router;
