const express = require("express");
const prisma = require("../config/db");
// const knex = require("../db/connection"); // Adjust the path to your Knex setup
// const authenticate = require("../middleware/authenticate"); // Your JWT middleware

const { body, validationResult } = require("express-validator")


const router = express.Router();


router.get("/feed/recent", getFeed)


async function getFeed(req, res) {
  const { page = 1, limit = 10 } = req.body

  const items = await prisma.item.findMany({
    skip: (page - 1) * limit,
    take: limit,
    include: {
      images: {
        where: {
          itemId: {
            not: null
          }
        }
      }
    }
  })
}