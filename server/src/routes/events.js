const express = require("express");
const router = express.Router();

const { create } = require("../controller/events/create");


router.route("/create").post(create);

module.exports = router;
