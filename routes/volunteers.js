"use strict";

const express = require("express"),
  router = express.Router(),
  VolunteerModel = require('../models/volunteerModel');


  //Get all Volunteers
router.get('/totalVolunteers', async (req, res) => {
  const totalVolunteers = await VolunteerModel.getTotalVolunteersId();
  console.log(totalVolunteers.length)
  if (totalVolunteers.length) {
    res.send(totalVolunteers)
  } else {
    console.log("error: ", totalVolunteers)
    res.sendStatus(500)
  }
})


router.get('/volunteerHours', async (req, res) => {
  const volunteerHours = await VolunteerModel.getVolunteerHours(0);
  // console.log(volunteerHours)
  if (volunteerHours) {
    res.send(volunteerHours)
  } else {
    console.log("error: ", volunteerHours)
    res.sendStatus(500)
  }
})


router.get('/volunteerHoursId', async (req, res) => {
  const volunteerHoursId = await VolunteerModel.getVolunteerHoursId();

  console.log(volunteerHoursId)
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
    res.send(smiles)
  } else {
    console.log("error: ", smiles)
    res.sendStatus(500)
  }
})

//posts go here






module.exports = router;
