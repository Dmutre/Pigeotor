"use strict";
var router = require("express").Router();
var usersController = require("../../controllers/users/usersController.js");
router.post("/", usersController.createUser);
module.exports = router;
