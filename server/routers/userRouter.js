const express = require("express");

const router = express.Router();


router.get("/user/:userId/chats", getAllChatsForUser);


module.exports = router