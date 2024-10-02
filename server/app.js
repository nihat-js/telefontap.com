const express = require("express");

const app = express();

const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "password",
    database: "my_database",
  },
});

// Creating a table
knex.schema
  .createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("email").unique();
  })
  .then(() => console.log("Table created"));

// Inserting data
knex("users")
  .insert({ name: "John Doe", email: "john@example.com" })
  .then(() => console.log("Data inserted"));

// Querying data
knex("users")
  .select("*")
  .then((users) => console.log(users));

// Executing a raw SQL query
knex
  .raw("SELECT * FROM users WHERE email = ?", ["john@example.com"])
  .then((result) => console.log(result[0]));

app.listen();
