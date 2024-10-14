const express = require("express");
const prisma = require("../config/db");
// const knex = require("../db/connection"); // Adjust the path to your Knex setup
// const authenticate = require("../middleware/authenticate"); // Your JWT middleware

const { body, validationResult } = require("express-validator");
const { API_RESPONSE_CODES } = require("../config/constants");


const router = express.Router();



router.post("/", createItem)
router.get("/:id", getItem)
// router.delete(":id/item", deletePhone)
// router.post(":id/promote", promote)
// router.put("/add-to-favorites", addToFavorites)
// router.get('/search', searchItems);

async function searchItems(req, res) {
  const { category, brand } = req.body
  const whereClause = {}
  if (brand) {
    whereClause.brand = {
      equals: brand
    }
  }
  if (category) {
    whereClause.category = {
      equals: category,
    };
  }



  let items = await prisma.item.findMany({
    where: where
  })

  return res.status(API_RESPONSE_CODES.SUCCESS).json(items)
}



function addToFavorites() {

}


async function createItem(req, res) {
  const { brand, user } = req.body
  const newItem = await prisma.item.create({
    data: {
      brand,
      userId: req.body.user.id,
      price: req.body.price,
      description: req.body.description,
      storageInGB: req.body.storageInGB,
      condition: req.body.condition,
      warrantyIncluded: req.body.warrantyIncluded,
    },
  });

  await prisma.itemImage.updateMany({
    where: {
      Item: {
        userId: user.id
      }
    },
    data: {
      itemId: newItem.id
    }
  })

  return res.status(201).json(newItem);
}


async function updateItem(req, res) {
  await prisma.item.update({
    where: {
      id: req.body.itemId,
      userId: req.body.user.id

    }
  })
}




async function deleteItem() {

}




function getItem() {

}


module.exports = router;
