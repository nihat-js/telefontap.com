const express = require("express");
const knex = require("../db/connection"); // Adjust the path to your Knex setup
const authenticate = require("../middleware/authenticate"); // Your JWT middleware
const prisma = require("../config/db");

const { body, validationResult } = require("express-validator")


const router = express.Router();

router.post("/", [
  // body("category").isString().notEmpty(),
  // body('phoneSpecsId').isInt(),
  // body('userId').isInt(),
  // body('price').isFloat({ gt: 0 }),
  // body('description').optional().isString(),
  // body('storageInGB').optional().isInt({ min: 0 }),
  // body('condition').optional().isString(),
  // body('warrantyIncluded').optional().isBoolean()
], createItem)


router.post("/upload-image", [

],
  uploadImage)
router.delete(":id/item", deletePhone)
router.post(":id/promote", promote)


async function createItem() {
  const newItem = await prisma.item.create({
    data: {
      category: req.body.category,
      phoneSpecsId: req.body.phoneSpecsId,
      userId: req.body.userId,
      price: req.body.price,
      description: req.body.description,
      storageInGB: req.body.storageInGB,
      condition: req.body.condition,
      warrantyIncluded: req.body.warrantyIncluded,
    },
  });

  const images = await prisma.

  return res.status(201).json(newItem);


}


async function promote(req, body) {
  await prisma.phone.findFirst(id)

}


async function deletePhone() {

}


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
