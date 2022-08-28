const express = require("express");
const router = express.Router();

const { create } = require("../controller/projects/create");
const { eventsAll } = require("../controller/projects/events-all");
const { all } = require("../controller/projects/all");

router.route("/create").post(create);
router.route("/events/all/:id").get(eventsAll);
router.route("/all").get(all);

module.exports = router;
