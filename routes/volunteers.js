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
  const volunteerHours = await VolunteerModel.getVolunteerHours(1);
  // console.log(volunteerHours)
  if (volunteerHours) {
    res.send(volunteerHours)
  } else {
    console.log("error: ", volunteerHours)
    res.sendStatus(500)
  }
})






module.exports = router;
