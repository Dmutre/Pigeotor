"use strict";

const router = require("express").Router();
const menuController = require("../../controllers/menu/menuController");
const { getUserProfile, updateUserProfile } = require("../../controllers/users/usersController");

router.get("/", menuController.lobby);
router.get("/profile", getUserProfile);


module.exports = router;