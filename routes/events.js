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

// Get the Event Details by event_id
router.get("/details", async (req, res) => {
  const { id } = req.query;
  const eventDetailsData = await EventsModel.getEventDetails(id);
  if (eventDetailsData.id) {
    res.send(eventDetailsData);
  } else {
    res.sendStatus(500);
  }
});

// Get the count of all events done by SmileUp
router.get("/counttotalevents", async (req, res) => {
  const countTotalEvents = await EventsModel.countTotalEvents();
  res.send(countTotalEvents);
  console.log(countTotalEvents);
});

// POSTS

module.exports = router;
