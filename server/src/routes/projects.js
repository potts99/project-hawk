const express = require("express");
const router = express.Router();

const { create } = require("../controller/projects/create");
const { eventsAll } = require("../controller/projects/events-all");
const { all } = require("../controller/projects/all");
const { feed } = require("../controller/projects/feed");

router.route("/create").post(create);
router.route("/events/all/:id").get(eventsAll);
router.route("/all").get(all);
router.route("/feed/:id").get(feed);

module.exports = router;
