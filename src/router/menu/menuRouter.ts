"use strict";

const router = require("express").Router();
const menuController = require("../../controllers/menu/menuController");
const { getUserProfile, updateUserProfile, getEditProfile } = require("../../controllers/users/usersController");

router.get("/", menuController.lobby);
router.get("/profile", getUserProfile);
router.get("/profile/edit", getEditProfile)

router.put("/editProfile", updateUserProfile)


module.exports = router;