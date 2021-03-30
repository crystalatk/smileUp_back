"use strict";

const express = require("express"),
  router = express.Router(),
  EventsModel = require("../models/eventsModel");

//   GET
router.get("/list", async (req, res) => {
  const eventListData = await EventsModel.getUpcomingEvents();
  console.log(eventListData);
  if (eventListData.length > 0) {
    res.send(eventListData);
  } else {
    res.sendStatus(500);
  }
});

router.get("/details", async (req, res) => {
  const { id } = req.query;
  const eventDetailsData = await EventsModel.getEventDetails(id);
  if (eventDetailsData.id) {
    res.send(eventDetailsData);
  } else {
    res.sendStatus(500);
  }
});

// POSTS

module.exports = router;
