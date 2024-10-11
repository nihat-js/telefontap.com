const prisma = require("../../config/db")

const phoneBrands = require("../../../data/phoneBrands.json")
const countries = require("../../../data/countries.json")
const cities = require("../../../data/cities.json")
const phoneModels = require("../../../data/phoneModels.json")


async function seedBrands() {
  prisma.country.createMany({
    data: [

    ]
  })
}

async function seedCountries() {

}

async function seedCities() {

}