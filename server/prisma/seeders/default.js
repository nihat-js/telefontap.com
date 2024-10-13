const prisma = require("../../config/db")

const categories = require("../../../data/categories.json")
const countries = require("../../../data/countries.json")
const phoneBrands = require("../../../data/phoneBrands.json")
const azerbaijanCities = require("../../../data/azerbaijanCities.json")
const sampleUsers = require("../../../data/sampleUsers.json")
const sampleAdmins = require("../../../data/sampleAdmins.json")
let phoneSpecs = require("../../../data/gsmarena/phoneSpecs.json")

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
  // await seedSampleItemsPhone()
  // await seedSampleUserProfileImages()

  // await seedFavorites()
  // await seedConversations()
  // await seedChats()

  // await seedBiddingHistory()


  // await seedNotification()
  // await seedAdBanners()
  // await seedRecentSearches()
  // await seedFAQs
  // await seedDiscountCoupons()
  // await seedAdminActions()
  // await seedBannedUsers()
  // await seedItemTags
  // await seedContentModerators()
  // seedUserLoginAttempts()
  // await seedUserInterests()
  // seedSellerProfiles()







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




async function seedPhoneSpecs() {
  let brands = await prisma.brand.findMany()

  let phoneSpecsFormatted = phoneSpecs.map(item => {
    return {
      brandName: item.brand,
      brandId: brands.find(item2 => item2.name == item.brand).id,
      model: item.model,
      releaseDate: item.released,
      dimensions: item.dimension,
      weight: item.weight,

      displayType: item.display.type,
      displaySize: item.display.size,
      displayResolution: item.display.resolution,

      operatingSystem: item.platform.os,
      chipset: item.platform.chipset,
      CPU: item.platform.cpu,
      GPU: item.platform.gpu,

      batteryType: item.battery.type,

      rearCameras: item.mainCamera,
      frontCameras: item.selfieCamera,

      internalMemoryOptions: item.memoryInternalOptions.join(","),
      colorOptions: item.colorOptions.join(","),
      description: "",
      benchmarks: item.benchmarks,
      sensors: "",

    }

  })

  let result = await prisma.phoneSpec.createMany({
    data: phoneSpecsFormatted,
    skipDuplicates: true
  })
  console.log(`Seeded  phone specs. Result count: ${result.count}`)
}

async function seedSampleItemsPhone() {

}
async function seedSampleUserProfileImages() {

}
