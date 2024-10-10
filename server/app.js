
const express = require("express");
const { PrismaClient } = require("@prisma/client")
const port = process.env.PORT || 3000
const { log } = require('console');
const { hashPassword, verifyPassword } = require("./utils/password");
const Busboy = require('busboy');
// const knex = require("knex");
const app = express()
const { useLimiter } = require("./middlewares/limiters")
const authRoute = require("./routes/authRoute");
const { API_VERSIONING, ENVIRONMENT } = require("./config/constants");
const { Server } = require("socket.io")
const http = require("http");
const { logRamUsage } = require("./utils/logRamUsage");
const logger = require('morgan');
const path = require("node:path")
const fs = require("fs")
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
// const brandRoutes = require("./routes/brandRoutes")
// const phoneRoutes = require("./routes/phoneRoutes")
// const nodemailer = require("nodemailer")
// const io = require("socket.io")(require("http").createServer())



app.use(express.json())
app.use(logger('dev'));
app.use(express.static("uploads"))
// app.use(useLimiter)
app.use(function (req, res, next) {
  res.set("X-Powered-By", "ASP.NET")
  next()
})
// app.disable("x-powered-by")


app.post('/upload', function (req, res) {
  const busboy = Busboy({ headers: req.headers });

  let fileData = {};

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const extension = path.extname(filename.toString());
    const saveTo = path.join("uploads", `${Date.now()}${extension}`);

    fileData.filename = filename;
    fileData.mimetype = mimetype;

    // Pipe the file to the save location
    file.pipe(fs.createWriteStream(saveTo));
  });

  busboy.on('finish', () => {
    res.json({
      message: 'File uploaded successfully!',
      file: fileData,
    });
  });

  req.pipe(busboy);

});


app.get("/test", function (req, res) {
  res.json({
    code: "SERVER_IS_UP"
  })
})

app.use("/api/" + API_VERSIONING.CURRENT_VERSION + "/auth/", authRoute)







app.listen(port, function (info) {
  console.log(`Server started at ${port}`)
})




if (ENVIRONMENT.CURRENT != ENVIRONMENT.PRODUCTION) {
  setInterval(logRamUsage, 10000);
}





