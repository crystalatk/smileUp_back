"use strict";

const db = require("./conn");

class Events {
  constructor(id) {
    this.id = id;
  }

  // Get All Upcoming events
  static async getUpcomingEvents() {
    try {
      const query = `
            SELECT id, title, date_start, date_stop, location, signup_deadline, age_min FROM events
            WHERE signup_deadline > NOW();`;
      const response = await db.any(query);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  //   Get all Event Details by Event_id
  static async getEventDetails(id) {
    try {
      const query = `
            SELECT * FROM events
            WHERE id = '${id}';`;
      const response = await db.one(query);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // Get Total Events a Volunteer has Completed by VolunteerID
  static async getTotalEventsById(volunteer_id) {
    try {
      const query = `SELECT COUNT(event_id) FROM volunteer_activities WHERE volunteer_id = ${volunteer_id}
    ;
    `;
      const response = await db.any(query);
      console.log("this is a response Id:", response);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  //   Get Total Number of Events Smile Up has completed
  static async countTotalEvents() {
    try {
      const query = `
      SELECT COUNT(id) FROM events WHERE date_stop < NOW() ;`;
      const response = await db.any(query);
      console.log("this is the", response);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  //   Get the all events approved by not checked in by guardian_id
  static async getAllApprovedMinorEventsByGuardianID(guardian_id) {
    try {
      const query = `
      SELECT va.id AS id, va.volunteer_id, e.title, e.date_start, e.date_stop, e.location, va.event_id, v.first_name, v.last_name 
        FROM volunteer_activities va 
          INNER JOIN volunteers v ON va.volunteer_id = v.id 
          INNER JOIN guardian_child_link gcl ON gcl.volunteer_id = va.volunteer_id 
          INNER JOIN events e ON va.event_id = e.id 
            WHERE va.check_in_time IS null AND va.guardian_denied = false AND va.guardian_approval = true AND gcl.guardian_id = ${guardian_id};`;
      const response = await db.any(query);
      console.log("this is the", response);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // Get the all events needing approval by not checked in by guardian_id
  static async getAllNeedsApprovalMinorEventsByGuardianID(guardian_id) {
    try {
      const query = `
      SELECT va.id AS id, va.volunteer_id, e.title, e.date_start, e.date_stop, e.location, va.event_id, v.first_name, v.last_name 
        FROM volunteer_activities va 
          INNER JOIN volunteers v ON va.volunteer_id = v.id 
          INNER JOIN guardian_child_link gcl ON gcl.volunteer_id = va.volunteer_id 
          INNER JOIN events e ON va.event_id = e.id 
            WHERE va.check_in_time IS null AND va.guardian_denied = false AND va.guardian_approval = false AND gcl.guardian_id = ${guardian_id};`;
      const response = await db.any(query);
      console.log("this is the", response);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // Get the all events approved by not checked in by volunteer_id
  static async getAllApprovedMinorEventsByVolunteerID(volunteer_id) {
    try {
      const query = `
      SELECT va.id AS id, va.volunteer_id, e.title, e.date_start, e.date_stop, e.location, va.event_id, v.first_name, v.last_name 
        FROM volunteer_activities va 
          INNER JOIN volunteers v ON va.volunteer_id = v.id 
          INNER JOIN events e ON va.event_id = e.id 
            WHERE va.check_in_time IS null AND va.guardian_denied = false AND  va.guardian_approval = true AND and va.volunteer_id = ${volunteer_id};`;
      const response = await db.any(query);
      console.log("this is the", response);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // Get the all events needing approval by not checked in by volunteer_id
  static async getAllNeedsApprovedMinorEventsByVolunteerID(volunteer_id) {
    try {
      const query = `
      SELECT va.id AS id, va.volunteer_id, e.title, e.date_start, e.date_stop, e.location, va.event_id, v.first_name, v.last_name 
        FROM volunteer_activities va 
          INNER JOIN volunteers v ON va.volunteer_id = v.id 
          INNER JOIN events e ON va.event_id = e.id 
            WHERE va.check_in_time IS null AND va.guardian_approval = false AND va.guardian_denied = false AND va.volunteer_id = ${volunteer_id};`;
      const response = await db.any(query);
      console.log("this is the", response);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}

module.exports = Events;
