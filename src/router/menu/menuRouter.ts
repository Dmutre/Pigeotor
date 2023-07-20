"use strict";

const router = require("express").Router();
const menuController = require("../../controllers/menu/menuController.js");
const { getUserProfile, updateUserProfile } = require("../../controllers/users/usersController.js");

router.get("/", menuController.lobby);
router.get("/profile", getUserProfile);


module.exports = router;