const express = require("express");
const router = express.Router();

const { create } = require("../controller/channels/create");
const { ID } = require("../controller/channels/id");
const { all } = require("../controller/channels/all");


router.route("/create").post(create);
router.route("/all/:channelId").get(ID);
router.route("/all").get(all);

module.exports = router;
