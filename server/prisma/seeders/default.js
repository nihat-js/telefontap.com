const prisma = require("../../config/db")

const categories = require("../../../data/categories.json")
const countries = require("../../../data/countries.json")
const phoneBrands = require("../../../data/phoneBrands.json")
const azerbaijanCities = require("../../../data/azerbaijanCities.json")
const sampleUsers = require("../../../data/sampleUsers.json")
const sampleAdmins = require("../../../data/sampleAdmins.json")

// const countries = require("../../../data/countries.json")
// const phoneModels = require("../../../data/phoneModels.json")


async function run() {
  await seedCategories()
  await seedPhoneBrands()
  await seedCountries() // only az
  await seedAzerbaijaniCities()

  await seedSampleUsers()
  await seedSampleAdmin()
  await seedPhoneSpecs()
  await seedPhoneItems()

}

run()



async function seedCategories() {
  let formattedCategories = categories.map(item => ({ name: item }))
  let result = await prisma.category.createMany({
    skipDuplicates: true,
    data: formattedCategories
  })
  console.log(`Seeded categories. Result count: ${result.count}`)
}

async function seedPhoneBrands() {
  let formattedPhoneBrands = phoneBrands.map(item => ({ name: item }))
  let result = await prisma.brand.createMany({
    skipDuplicates: true,
    data: formattedPhoneBrands
  })
  console.log(`Seeded brands. Result count: ${result.count}`)

  let brandsWithIds = await prisma.brand.findMany()
  let categoryPhone = await prisma.category.findFirst({ where: { name: "phone" } })
  // console.log({ brandsWithIds, phoneBrands })

  let phoneBrandsWithCategoryIds = formattedPhoneBrands.map((item) => {
    // let brandId
    return {
      brandId: brandsWithIds.find(item2 => item.name == item2.name).id,
      brandName: brandsWithIds.find(item2 => item.name == item2.name).name,
      categoryId: categoryPhone.id,
      categoryName: categoryPhone.name,
    }
  })

  let result2 = await prisma.brandCategory.createMany({
    data: phoneBrandsWithCategoryIds,
    skipDuplicates: true,
  })
  console.log(`Seeded brand categories. Result count: ${result2.count}`)


}




async function seedCountries() {
  let result = await prisma.country.createMany({
    skipDuplicates: true,
    data: countries
  })
  console.log(`Seeded countries. Result count: ${result.count}`)
}

async function seedAzerbaijaniCities() {
  let azerbaijan = await prisma.country.findFirst({
    where: { code: "az" }
  })
  let formattedCities = azerbaijanCities.map(item => {
    return {
      name: item,
      countryId: azerbaijan.id,
      countryCode: "az"
    }
  })

  let result = await prisma.city.createMany({
    skipDuplicates: true,
    data: formattedCities
  })
  console.log(`Seeded Azerbaijani cities. Result count: ${result.count}`)
}

async function seedSampleUsers() {
  let result = await prisma.user.createMany({
    data: sampleUsers,
    skipDuplicates: true,
  })
  console.log(`Seeded  users. Result count: ${result.count}`)
}


async function seedSampleAdmin() {
  let result = await prisma.admin.createMany({
    data: sampleUsers,
    skipDuplicates: true
  })
  console.log(`Seeded  admins. Result count: ${result.count}`)
}




function seedPhoneSpecs() {
  
}
function seedPhoneItems() {
  
}
