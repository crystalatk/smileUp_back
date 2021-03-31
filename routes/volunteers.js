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


router.get('/volunteerHoursId', async (req, res) => {
  const { volunteer_id } = req.query;
  const volunteerHoursId = await VolunteerModel.getVolunteerHoursId(volunteer_id);
  console.log(volunteerHoursId);
  if (volunteerHoursId) {
    res.send(volunteerHoursId)
  } else {
    console.log("error: ", volunteerHoursId)
    res.sendStatus(500)
  }
})




router.get('/totalSmiles', async (req, res) => {
  const smiles = await VolunteerModel.getTotalSmiles();
  console.log(smiles)
  if (smiles) {
    res.send(smiles);
  } else {
    console.log("error: ", smiles);
    res.sendStatus(500);
  }
});

//posts go here

module.exports = router;
