const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const knex = require("../db/connection"); // Adjust the path to your Knex setup

const router = express.Router();
const JWT_SECRET = "SECRET_KEY_IN_PRODUCTION_NO_ONE_KNOWS_IT"; // Change this to a secure key

// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await knex.raw(
      `
      INSERT INTO users (name, email, password, ) 
      VALUES (?, ?, ?, ?, ?) RETURNING *`,
      [username, email, hashedPassword, first_name, last_name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "User registration failed." });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await knex.raw(
      `
      SELECT * FROM users WHERE email = ?`,
      [email]
    );

    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed." });
  }
});

module.exports = router;
