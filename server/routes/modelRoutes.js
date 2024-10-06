const express = require("express")
const knex = require("../db/connection") // Adjust the path to your Knex setup



const router = express.Router()


router.get("/",(req,res)=>{
  const {brand} = req.body

    

})