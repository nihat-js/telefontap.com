const express = require("express")
const prisma = require("../config/db")

const router = express.Router()


router.get("/cities", getCities)
router.get("/countries", getCountries)
router.get("/phone-brands", getPhoneBrands)
router.get("/phone/:modelName", getPhoneModelsByBrand)
router.get("/phone/:modelName/spces ", getPhoneModelSpecs)


// 1 Telefonlar
  // Tablet

// 2 Aksesuarlar
  // 3 Qulaqciq
    // 4 Naqilli
    // 5 Naqilsiz
// 6
// 7 
// 8 
// 9 

phoneBrands,televisorlarin,motosikletler, qulaqciqlarin


function phoneBrands(){

}
function carBrands(){

}

function getCities() {

}

router.get("/phone-models/:modelName", function (req, res) {
  const brand = req.body
  await prisma.phoneSpec.findMany({
    select: {
      model
    },
    where: {
      brand: 
  }
  })
})

router.get("/phone-models/model", function (req, res) {

})