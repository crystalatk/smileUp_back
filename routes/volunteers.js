"use strict";

const express = require("express"),
  router = express.Router(),
  VolunteersModel = require("../models/volunteerModel"),
  GuardianModel = require('../models/guardianModel');

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

//Get all Volunteers
router.get("/totalVolunteers", async (req, res) => {
  const totalVolunteers = await VolunteersModel.getTotalVolunteersId();
  console.log(totalVolunteers.length);
  if (totalVolunteers.length) {
    res.send(totalVolunteers);
  } else {
    console.log("error: ", totalVolunteers);
    res.sendStatus(500);
  }
});

router.get("/volunteerHours", async (req, res) => {
  const volunteerHours = await VolunteersModel.getVolunteerHours(0);
  // console.log(volunteerHours)
  if (volunteerHours) {
    res.send(volunteerHours);
  } else {
    console.log("error: ", volunteerHours);
    res.sendStatus(500);
  }
});

router.get("/volunteerHoursId", async (req, res) => {
  const { volunteer_id } = req.query;
  const volunteerHoursId = await VolunteersModel.getVolunteerHoursId(volunteer_id);
  console.log(volunteerHoursId);
  if (volunteerHoursId) {
    res.send(volunteerHoursId);
  } else {
    console.log("error: ", volunteerHoursId);
    res.sendStatus(500);
  }
});

router.get("/totalSmiles", async (req, res) => {
  const smiles = await VolunteersModel.getTotalSmiles();
  console.log(smiles);
  if (smiles) {
    res.send(smiles);
  } else {
    console.log("error: ", smiles);
    res.sendStatus(500);
  }
});

//POSTS
// Update Volunteer Info
router.post("/editProfile", async (req, res) => {
  console.log("IN THE VOLUNTEER SIGN UP!");
  const {
    id,
    first_name,
    last_name,
    date_of_birth,
    phone,
    email,
    zip_code,
    emergency_name,
    emergency_phone,
  } = req.body;
  const response = await VolunteersModel.updateVolunteer(
    id,
    first_name,
    last_name,
    date_of_birth,
    phone,
    email,
    zip_code,
    emergency_name,
    emergency_phone
  );
  if (response) {
    res.send(response);
  } else {
    res.send("Error: please try again").status(500);
  }
});


router.post("/insertvolunteeractivity", async (req, res) => {
  console.log("i am signed up")
  const { event_id, volunteer_id, guardian_approval } = req.body
  const response = await VolunteersModel.insertVolunteerActivity(volunteer_id, event_id, guardian_approval)
  if (response) {
    res.send(response);
  } else {
    res.send("Error: please try again").status(500);
  }
})


router.post('/linkminor', async (req, res) => {
  const {
    minor_id,
    guardian_id
  } = req.body;
  const response = await GuardianModel.linkGuardianAndMinor(
    minor_id, guardian_id
  );
  if (response) {
    res.send(response);
  } else {
    res.send("Error: please try again").status(500);
  }
})




module.exports = router;
