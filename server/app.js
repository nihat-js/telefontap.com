
const express = require("express");
const { PrismaClient } = require("@prisma/client")
const port = process.env.PORT || 3000
const { log } = require('console');
const { hashPassword, verifyPassword } = require("./utils/password");
const app = express()
const prisma = new PrismaClient()

app.use(express.json())



// const knex = require("knex");
// const authRoutes = require("./routes/authRoute")
// const brandRoutes = require("./routes/brandRoutes")
// const phoneRoutes = require("./routes/phoneRoutes")
// const nodemailer = require("nodemailer")




app.get("/test", function (req, res) {
  res.json({
    "message": "Server is up"
  })
})



app.post("/api/v1/profile/changeProfilePicture", function (req, res) {

})


app.listen(port, function (info) {
  console.log(`Server started at ${port}`)
})










// app.listen(process.env.PORT ||)



// console.log(process.env.NODE_ENV)
// console.log(proc)
// console.log("off")

