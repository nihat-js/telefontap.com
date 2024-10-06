const express = require("express");
const { PrismaClient } = require("@prisma/client")
// const knex = require("knex");
// const authRoutes = require("./routes/authRoute")
// const brandRoutes = require("./routes/brandRoutes")
// const phoneRoutes = require("./routes/phoneRoutes")
// const nodemailer = require("nodemailer")



const app = express()
const prisma = new PrismaClient()

let x= {
  name : "nihat"
}


// console.log(process.env.NODE_ENV)
// console.log(proc)
// console.log("off")

