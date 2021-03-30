"use strict";

const express = require("express"),
  router = express.Router(),
  AdminModel = require("../models/adminModel");

// GETS
router.get("/counttotalvolbyevent", async (req, res) => {
  const { event_id } = req.query;
  const response = await AdminModel.countTotalVolByEvent(event_id);
  console.log(response);
  res.send(response);
});

// POSTS
// Add an Event
router.post("/addevent", (req, res) => {
  const {
    title,
    date_start,
    date_stop,
    location,
    description,
    headcount_served_potential,
    signup_deadline,
    age_min,
    min_participants,
    max_participants,
    adults_needed,
    num_adults,
    alerts,
  } = req.body;
  const response = AdminModel.addEvent(
    title,
    date_start,
    date_stop,
    location,
    description,
    headcount_served_potential,
    signup_deadline,
    age_min,
    min_participants,
    max_participants,
    adults_needed,
    num_adults,
    alerts
  );
  if (response.id) {
    res.send(response);
  } else {
    res.send("Error").status(500);
  }
});

// Edit an Event
router.post("/editevent", (req, res) => {
  const {
    event_id,
    title,
    date_start,
    date_stop,
    location,
    description,
    headcount_served_potential,
    signup_deadline,
    age_min,
    min_participants,
    max_participants,
    adults_needed,
    num_adults,
    alerts,
  } = req.body;
  const response = AdminModel.updateEvent(
    event_id,
    title,
    date_start,
    date_stop,
    location,
    description,
    headcount_served_potential,
    signup_deadline,
    age_min,
    min_participants,
    max_participants,
    adults_needed,
    num_adults,
    alerts
  );
  if (response.id) {
    res.send(response);
  } else {
    res.send("Error").status(500);
  }
});

module.exports = router;
