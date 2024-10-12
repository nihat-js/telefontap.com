const prisma = require("../../config/db")

const categories = require("../../../data/categories.json")
const phoneBrands = require("../../../data/phoneBrands.json")

// const countries = require("../../../data/countries.json")
// const cities = require("../../../data/cities.json")
// const phoneModels = require("../../../data/phoneModels.json")


async function run() {
  await seedCategories()
  await seedPhoneBrands()
  await seedCountries() // empty
  await seedCities()

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
  let categoryPhoneId = await prisma.category.findFirst({ where: { name: "phone" } })
  // console.log({ brandsWithIds, phoneBrands })

  let phoneBrandsWithCategoryIds = formattedPhoneBrands.map((item) => {
    // let brandId
    return {
      brandId: brandsWithIds.find(item2 => item.name == item2.name).id,
      categoryId: categoryPhoneId.id,
    }
  })

  let result2 = await prisma.brandCategories.createMany({
    data: phoneBrandsWithCategoryIds,
    skipDuplicates: true,
  })
  console.log(`Seeded brand categories. Result count: ${result2.count}`)


}




async function seedCountries() {

}

async function seedCities() {

}


