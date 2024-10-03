// process.env.NODE_ENV = 'development'; // development | staging | test | production
const express = require("express");
const knex = require("knex");
const authRoutes = require("./routes/authRoute")
const brandRoutes = require("./routes/brandRoutes")
const phoneRoutes = require("./routes/phoneRoutes")
const app = express();

const db = knex(require("./knexfile").development); // local_sqlite | local_mysql | aws_mysql | aws_mysql_prod


app.use(authRoute)


app.get("/login", function (req, res) {});


// Creating a table

async function d() {
  let users = await db.raw("SELECT * FROM users");
  console.log(users);
}
d();



app.get("/api/v1/phones",function(){
  
})