"use strict";

const router = require("express").Router();
const usersController = require("../../controllers/users/usersController");

router.get("/", usersController.signupMenu);
router.get("/login", usersController.loginMenu);
router.get("/logout", usersController.logout);

router.post("/signup", usersController.createUser);
router.post("/login", usersController.findUser);

module.exports = router;