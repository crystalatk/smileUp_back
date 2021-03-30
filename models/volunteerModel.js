"use strict";

const db = require("./conn"),
  bcrypt = require("bcryptjs");

class Volunteer {
  constructor(id) {
    this.id = id;
  }
  // Get All Upcoming events
  static async getUpcomingEvents(current_date) {
    try {
      const query = `
        SELECT * FROM events
        WHERE date_start > ${current_date}
      `;
      const response = await db.any(query);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  // All Volunteer Activities

  static async getAllVolunteerActivities(volunteer_id) {
    try {
      const query = `
      SELECT va.event_id, va.guardian_approval, va.check_in_time, va.check_out_time, e.title, e.date_start, e.location, e.description
      FROM volunteer_activities va 
      INNER JOIN events e
        ON e.id = va.event_id
      WHERE va.volunteer_id = ${volunteer_id}`;
    } catch(error) {
      return error.message;
    }
  }

  static async getTotalVolunteersId() {
      try {
      const query = `SELECT id FROM volunteers 
      WHERE is_guardian = false AND is_admin = false AND is_ambassador = false;
      `;
      const response = await db.any(query);
      return response;
    } catch (error) {
      return error.message
    }
  }

  static async getVolunteerHours(id) {
    try {
    const query = `SELECT total_minutes FROM volunteer_activities
    WHERE id = ${id}
    ;
    `;
    const response = await db.any(query);
    console.log("this is a response:", response)
    return response;
  } catch (error) {
    return error.message
  }
}

  // Volunteer Check-in
  // Volunteer Check-out
}

module.exports = Volunteer;
