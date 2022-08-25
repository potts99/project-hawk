const express = require("express");
const router = express.Router();

const { create } = require("../controller/channels/create");
const { ID } = require("../controller/channels/id");


router.route("/create").post(create);
router.route("/all/:channelId").get(ID);

module.exports = router;
