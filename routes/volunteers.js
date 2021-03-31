"use strict";

const express = require("express"),
  router = express.Router(),
  VolunteersModel = require("../models/volunteerModel");

// get all Info on a volunteer for their profile page
router.get("/profile", async (req, res) => {
  const { id } = req.query;
  const response = await VolunteersModel.getAllProfileInfo(id);
  console.log("THIS IS THE RESPONSE", response);
  res.send(response);
});

// Get Gaurdian ID for minor Profile Page
router.get("/guardianid", async (req, res) => {
  const { volunteer_id } = req.query;
  const response = await VolunteersModel.getGuardianID(volunteer_id);
  console.log("THIS IS THE RESPONSE", response);
  res.send(response);
});

module.exports = router;
