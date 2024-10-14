
const express = require("express");
const { PrismaClient } = require("@prisma/client")
const port = process.env.PORT || 3000
const { log } = require('console');
const { hashPassword, verifyPassword } = require("./utils/password");
const Busboy = require('busboy');
// const knex = require("knex");
const app = express()
const { useLimiter } = require("./middlewares/limiters")
const { API_VERSIONING, ENVIRONMENT } = require("./config/constants");
const { Server } = require("socket.io")
const http = require("http");
const { logRamUsage } = require("./utils/logRamUsage");
const logger = require('morgan');
const path = require("node:path")
const fs = require("fs")
const APIT_ROUTE_PATH = "/api/" + API_VERSIONING.CURRENT_VERSION
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
// const brandRoutes = require("./routes/brandRoutes")
// const phoneRoutes = require("./routes/phoneRoutes")
// const nodemailer = require("nodemailer")
// const io = require("socket.io")(require("http").createServer())
const authRouter = require("./routers/authRouter")
const properyRouter = require("./routers/properyRouter");
const itemRouter = require("./routers/itemRouter")
const uploadRouter = require("./routers/uploadRouter")



if (ENVIRONMENT.CURRENT == ENVIRONMENT.DEVELOPMENT) {
  app.use(logger('dev'));
}
if (ENVIRONMENT.CURRENT != ENVIRONMENT.PRODUCTION) {
  setInterval(logRamUsage, 10000);
}

app.use(express.json())
app.use(express.static("uploads"))
app.use(useLimiter)
app.use(function (req, res, next) {
  res.set("X-Powered-By", "ASP.NET")
  next()
})

app.get("/test", function (req, res) {
  res.json({
    code: "SERVER_IS_UP"
  })
})


app.use(APIT_ROUTE_PATH + "/auth/", authRouter)
app.use(APIT_ROUTE_PATH + "/properties/", properyRouter)
app.use(APIT_ROUTE_PATH + "/items/", properyRouter)
app.use(APIT_ROUTE_PATH + "/upload/", uploadRouter)

app.listen(port, function (info) {
  console.log(`Server started at ${port}`)
})









