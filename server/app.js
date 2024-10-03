const express = require("express");
const knex = require("knex");
const config = require("./knexfile");

const app = express();
const db = knex(config.development);

app.get("/login", function (req, res) {});


// Creating a table

async function d() {
  let users = await db.raw("SELECT * FROM users");
  console.log(users);
}
d();



app.get("/api/v1/phones",function(){
  
})