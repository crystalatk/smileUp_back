"use strict";

const express = require("express"),
  router = express.Router(),
  GuardianModel = require("../models/guardianModel");



  router.get("/getvolunteersforguardianId", async (req, res) => {
    const { guardian_id } = req.query; 
    console.log(guardian_id);
    const volunteersignup = await GuardianModel.getVolunteersForGuardianId(guardian_id);
    console.log(volunteersignup);
    if (volunteersignup) {
      res.send(volunteersignup);
    } else {
      console.log("error: ", volunteersignup);
      res.sendStatus(500);
    }
  });


  router.get("/getguardianforvolunteerId", async (req, res) => {
    const { volunteer_id } = req.query;
    console.log(volunteer_id);
    const guardiansignup = await GuardianModel.getGuardianIdForVolunteers(volunteer_id);
    console.log(guardiansignup);
    if(guardiansignup) {
      res.send(guardiansignup)
    } else {
      console.log("error awaitng sign up...", guardiansignup)
      res.sendStatus(500);
    }
  });

module.exports = router;
