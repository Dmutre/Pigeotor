"use strict";

const router = require("express").Router();
const usersController = require("../../controllers/users/usersController.js")

router.post("/", usersController.createUser);

module.exports = router;