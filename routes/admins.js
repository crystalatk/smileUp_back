"use strict";

const express = require("express"),
  router = express.Router(),
  AdminModel = require("../models/adminModel");

// GETS

// POSTS
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

module.exports = router;
