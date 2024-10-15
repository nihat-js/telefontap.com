
const express = require("express");
const { PrismaClient } = require("@prisma/client")
const port = process.env.PORT || 3000
const { log } = require('console');
const http = require("http");
const { Server } = require("socket.io")
const Busboy = require('busboy');
// const knex = require("knex");
const logger = require('morgan');
const path = require("node:path")
const fs = require("fs")
const cookieParser = require('cookie-parser');

const { hashPassword, verifyPassword } = require("./utils/password");
const { useLimiter } = require("./middlewares/limiters")
const { API_VERSIONING, ENVIRONMENT, API_RESPONSE_CODES } = require("./config/constants");
const { logRamUsage } = require("./utils/logRamUsage");

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
// const nodemailer = require("nodemailer")

const authRouter = require("./routers/authRouter")
const properyRouter = require("./routers/properyRouter");
const itemRouter = require("./routers/itemRouter")
const uploadRouter = require("./routers/uploadRouter")
const accountRouter = require("./routers/accountRouter")
const userAuthMiddleware = require("./middlewares/userAuthMiddleware");
const prisma = require("./config/db");

const APIT_ROUTE_PATH = "/api/" + API_VERSIONING.CURRENT_VERSION
const app = express()



if (ENVIRONMENT.CURRENT == ENVIRONMENT.DEVELOPMENT) {
  app.use(logger('dev'));
}
if (ENVIRONMENT.CURRENT != ENVIRONMENT.PRODUCTION) {
  setInterval(logRamUsage, 10000);
}

app.use(cookieParser());
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
app.use(APIT_ROUTE_PATH + "/items/", itemRouter)
app.use(APIT_ROUTE_PATH + "/uploads/", userAuthMiddleware, uploadRouter)
app.use(APIT_ROUTE_PATH + "/", userAuthMiddleware, accountRouter)


app.listen(port, function (info) {
  console.log(`Server started at ${port}`)
})









