"use strict";

const express = require("express"),
  router = express.Router(),
  GuardianModel = require("../models/guardianModel");

// GETS

router.get("/getvolunteersforguardianId", async (req, res) => {
  const { guardian_id } = req.query;
  console.log(guardian_id);
  const volunteersignup = await GuardianModel.getVolunteersForGuardianId(
    guardian_id
  );
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
  const guardiansignup = await GuardianModel.getGuardianIdForVolunteers(
    volunteer_id
  );
  console.log(guardiansignup);
  if (guardiansignup) {
    res.send(guardiansignup);
  } else {
    console.log("error awaitng sign up...", guardiansignup);
    res.sendStatus(500);
  }
});

// POSTS

// Insert true into guardian denied on volunteer activities
router.post("/insertguardiandeniedbyactiviesID", async (req, res) => {
  const { id } = req.body;
  console.log("THIS IS THE ID: ", id);
  const insertIntoGuardDeny = await GuardianModel.insertTrueForGuardianDenied(
    id
  );
  res.send(insertIntoGuardDeny);
});

// INSERTS TRUE WHEN GUARDIAN APPROVES AND ACTIVITY
router.post("/insertguardianapprovedbyactiviesID", async (req, res) => {
  const { id } = req.body;
  console.log("THIS IS THE ID: ", id);
  const insertIntoGuardApprove = await GuardianModel.insertTrueForGuardianApproved(
    id
  );
  res.send(insertIntoGuardApprove);
});

module.exports = router;
