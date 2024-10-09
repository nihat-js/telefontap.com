
const express = require("express");
const { PrismaClient } = require("@prisma/client")
const port = process.env.PORT || 3000
const { log } = require('console');
const { hashPassword, verifyPassword } = require("./utils/password");
const busboy = require("busboy")
// const knex = require("knex");
const app = express()
const { useLimiter } = require("./middlewares/limiters")
const authRoute = require("./routes/authRoute");
// const brandRoutes = require("./routes/brandRoutes")
// const phoneRoutes = require("./routes/phoneRoutes")
// const nodemailer = require("nodemailer")

app.use(express.json())
app.use(function (req, res, next) {
  res.set("X-Powered-By", "ASP.NET")
  next()
})
app.use(useLimiter)
// app.disable("x-powered-by")


app.post('/me', function (req, res) {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    var saveTo = path.join('.', filename);
    console.log('Uploading: ' + saveTo);
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on('finish', function () {
    console.log('Upload complete');
    res.writeHead(200, { 'Connection': 'close' });
    res.end("That's all folks!");
  });
  return req.pipe(busboy);

});






app.get("/test", function (req, res) {
  res.json({
    code: "SERVER_IS_UP"
  })
})

app.use("/api/v1/auth/", authRoute)



app.post("/api/v1/profile/changeProfilePicture", function (req, res) {

})


app.listen(port, function (info) {
  console.log(`Server started at ${port}`)
})










// app.listen(process.env.PORT ||)



// console.log(process.env.NODE_ENV)
// console.log(proc)
// console.log("off")

