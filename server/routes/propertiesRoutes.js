const express = require("express")
const prisma = require("../config/db")

const { API_RESPONSE_CODES } = require("../config/constants")

const router = express.Router()



router.get("/categories", getCategories)
router.get("/brands/:brandCategory", getPhoneBrands)


router.get("/countries", getCountries)
router.get("/countries/:countryCode/cities", getCities)


// Bu ikisi qalibdi gedim data scrape eleyim
router.get("/phones/:brandName", getPhoneModelsByBrand)
router.get("/phones/:brandName/:model", getPhoneModelSpecs)



async function getCategories(req, res) {
  let result = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    }
  })
  res.status(API_RESPONSE_CODES.SUCCESS).json({ data: result })
}

async function getCountries(req, res) {
  let result = await prisma.country.findMany({
    select: {
      id: true,
      code: true,
    }
  })
  res.status(API_RESPONSE_CODES.SUCCESS).json({ data: result })
}

async function getPhoneBrands(req, res) {
  let result = await prisma.brandCategory.findMany({
    where: {
      categoryName: "phone"
    },
    select: {
      brandId: true,
      brandName: true,
    }
  })
  res.status(API_RESPONSE_CODES.SUCCESS).json({ data: result })
}

async function getPhoneModelsByBrand(req, res) {
  const brandName = req.params.brandName
  let result = await prisma.phoneSpec.findMany({
    where: {
      brandName
    },
    select: {
      id: true,
      model: true
    }
  })
  res.status(API_RESPONSE_CODES.SUCCESS).json({ data: result })
}

async function getPhoneModelSpecs(req, res) {
  const brandName = req.params.brandName
  const model = req.params.model

  let result = await prisma.phoneSpec.findMany({
    where: {
      brandName,
      model
    },
  })
  res.status(API_RESPONSE_CODES.SUCCESS).json({ data: result })
}
function phoneBrands() {

}
function carBrands() {

}

async function getCities(req, res) {
  let countryCode = "az" // instead of req.params.countryCode

  let result = await prisma.city.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      countryCode
    }
  })
  res.status(API_RESPONSE_CODES.SUCCESS).json({ data: result })

}

async function getModelName(req, res) {
  const brand = req.body
}


module.exports = router