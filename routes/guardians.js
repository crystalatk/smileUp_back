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

module.exports = router;
