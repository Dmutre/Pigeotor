"use strict";
const router = require("express").Router();
const menuController = require("../../controllers/menu/menuController.js");
router.get("/", menuController.lobby);
module.exports = router;
