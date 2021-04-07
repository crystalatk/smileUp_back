"use strict";

const express = require("express"),
  router = express.Router(),
  EventsModel = require("../models/eventsModel");

//   GET
router.get("/list", async (req, res) => {
  const eventListData = await EventsModel.getUpcomingEvents();
  console.log(eventListData);
  if (eventListData.length > 0) {
    res.send(eventListData);
  } else {
    res.sendStatus(500);
  }
});

router.get("/pastlist", async (req, res) => {
  const eventListData = await EventsModel.getPastEvents();
  console.log(eventListData);
  if (eventListData.length > 0) {
    res.send(eventListData);
  } else {
    res.sendStatus(500);
  }
});

// Get the Event Details by event_id
router.get("/details", async (req, res) => {
  const { id } = req.query;
  const eventDetailsData = await EventsModel.getEventDetails(id);
  if (eventDetailsData.id) {
    res.send(eventDetailsData);
  } else {
    res.sendStatus(500);
  }
});

// Get Total Events a Volunteer has Completed by VolunteerID
router.get("/totalEventsId", async (req, res) => {
  const { volunteer_id } = req.query;
  const totalEventsId = await EventsModel.getTotalEventsById(volunteer_id);
  console.log(totalEventsId);
  if (totalEventsId) {
    res.send(totalEventsId);
  } else {
    console.log("error: ", totalEventsId);
    res.sendStatus(500);
  }
});

// Get the count of all events done by SmileUp
router.get("/counttotalevents", async (req, res) => {
  const countTotalEvents = await EventsModel.countTotalEvents();
  res.send(countTotalEvents);
  console.log(countTotalEvents);
});

// Get the all events approved by not checked in by guardian_id
router.get("/approvedeventsbyguardianid", async (req, res) => {
  const { guardian_id } = req.query;
  const approvedEvents = await EventsModel.getAllApprovedMinorEventsByGuardianID(
    guardian_id
  );
  res.send(approvedEvents);
  console.log(approvedEvents);
});

// Get the all events needing approval by not checked in by guardian_id
router.get("/needsapprovaleventsbyguardianid", async (req, res) => {
  const { guardian_id } = req.query;
  const approvedEvents = await EventsModel.getAllNeedsApprovalMinorEventsByGuardianID(
    guardian_id
  );
  res.send(approvedEvents);
  console.log(approvedEvents);
});

// Get the all events approved by not checked in by volunteer_id
router.get("/approvedeventsbyvolunteerid", async (req, res) => {
  const { volunteer_id } = req.query;
  const approvedEvents = await EventsModel.getAllApprovedMinorEventsByVolunteerID(
    volunteer_id
  );
  res.send(approvedEvents);
  console.log(approvedEvents);
});

// Get the all events needing approval by not checked in by volunteer_id
router.get("/needsapprovaleventsbyvolunteerid", async (req, res) => {
  const { volunteer_id } = req.query;
  const approvedEvents = await EventsModel.getAllNeedsApprovedMinorEventsByVolunteerID(
    volunteer_id
  );
  res.send(approvedEvents);
  console.log(approvedEvents);
});

// POSTS

module.exports = router;
