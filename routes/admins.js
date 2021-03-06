"use strict";

const express = require("express"),
  router = express.Router(),
  AdminModel = require("../models/adminModel");

// GETS
// Count Total Volunteers based on event ID
router.get("/counttotalvolbyevent", async (req, res) => {
  const { event_id } = req.query;
  const response = await AdminModel.countTotalVolByEvent(event_id);
  console.log(response.rows);
  res.send(response.rows);
});

// Get a List of Volunteers and their info based on event_id
router.get("/volunteersattending", async (req, res) => {
  const { event_id } = req.query;
  const response = await AdminModel.getVolunteersAttendingEvent(event_id);
  console.log("THIS IS THE RESPONSE", response.rows);
  res.send(response.rows);
});

// List of all Volunteers and All volunteer Info
router.get("/volunteerslist", async (req, res) => {
  const response = await AdminModel.getAllVolunteersAndInfo();
  console.log("THIS IS THE RESPONSE", response.rows);
  res.send(response.rows);
});

// POSTS

// Add an Event
router.post("/addevent", async (req, res) => {
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
  const response = await AdminModel.addEvent(
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
  if (response.rowCount) {
    console.log("I am not caught");
    res.send(response);
  } else {
    console.log("You got the error");
    res.sendStatus(500);
  }
});

// Edit an Event
router.post("/editevent", async (req, res) => {
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
  const response = await AdminModel.updateEvent(
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
  if (response.rowCount) {
    res.send(response);
  } else {
    res.sendStatus(500);
  }
});

// INSERT CHECK-IN OR CHECK-OUT TIME INTO VA
router.post("/insertcheckinouttime", async (req, res) => {
  const { va_id, event } = req.body;
  console.log("IM IN THE BACK AND THE VA_ID IS: ", va_id);
  const response = await AdminModel.updateActivity(va_id, event);
  if (response.id) {
    res.send(response);
  } else {
    res.sendStatus(500);
  }
});

// Add a Document
router.post("/addDocument", async (req, res) => {
  const {
    is_general,
    event_id,
    document_title,
    document_url,
    admin_id,
  } = req.body;
  const response = await AdminModel.addDocument(
    is_general,
    event_id,
    document_title,
    document_url,
    admin_id
  );
  if (response.id) {
    res.send(response);
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;
