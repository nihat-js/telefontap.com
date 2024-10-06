const rateLimit = require('express-rate-limit')
const express = require("express");
const { log } = require('console');
const  app = express()

const emailLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3, // limit each IP to 1 request per windowMs
  message: ["message",  "Too many"]
});

const signUpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10, // limit each IP to 1 request per windowMs
  message: ["message",  "Too many"]
});

const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10, // limit each IP to 1 request per windowMs
  message: ["message",  "Too many"]
});


app.get("/test",emailLimiter,function(req,res){
  res.json(req.rateLimit)
  // res.write("Test work22s")
  // res.end()

})


app.listen(3000,function(){
  log("server is running")
})