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
  let {
    categoryId,
    brandId,
    model,
    price,
    description,
    storageInGB,
    conditon,
    warrantyIncluded,
    city,
    country,
    color,
    user,
    isWhatsappActive
  } = req.body
  let category = await prisma.category.findFirst({
    where: {
      id: categoryId,
    }
  })

  let brand = await prisma.brand.findFirst({
    where: {
      id: brandId,
    }
  })

  const newItem = await prisma.item.create({
    data: {
      categoryId: category.id,
      categoryName: category.name,
      brandId: brand.id,
      brandName: brand.name,
      model: model,
      color: color,
      price: price,
      description: description,
      userId: user.id,
      storageInGB: storageInGB,
      condition: condition,
      warrantyIncluded: warrantyIncluded,
      isWhatsappActive: isWhatsappActive,
      contactPhoneNumber: contactPhoneNumber,
    },
  });
  await prisma.itemProperty.createMany({
    data: [{
      itemId: newItem.id,
      key: "storageInGB",
      value: storageInGB,
    }, {
      itemId: newItem.id,
      key: ""
    }]
  })

  let imageURLS = await prisma.userUploadedImage.findMany({ where: { ma } })



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
