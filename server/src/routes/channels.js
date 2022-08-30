const express = require("express");
const router = express.Router();

const { create } = require("../controller/channels/create");
const { ID } = require("../controller/channels/id");
const { all } = require("../controller/channels/all");
const { channelFeed } = require("../controller/Events/channel-feed");

router.route("/create").post(create);
router.route("/all/:id").get(ID);
router.route("/event-feed/:id").get(channelFeed);

module.exports = router;
