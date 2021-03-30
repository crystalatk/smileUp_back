"use strict";

const db = require("./conn"),
  bcrypt = require("bcryptjs");

class Admin {
  constructor(id) {
    this.id = id;
  }

  // Create a New Event
  static async addEvent(
    title,
    date_start,
    date_stop,
    location,
    description,
    headcount_served_potential,
    signup_deadline,
    age_min,
    min_participants,
    max_participants,
    adults_needed,
    num_adults,
    alerts
  ) {
    try {
      const response = db.result(
        `INSERT INTO events (title, date_start, date_stop, location, description, headcount_served_potential, signup_deadline, age_min, min_participants, max_participants, adults_needed, num_adults, alerts) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`,
        [
          title,
          date_start,
          date_stop,
          location,
          description,
          headcount_served_potential,
          signup_deadline,
          age_min,
          min_participants,
          max_participants,
          adults_needed,
          num_adults,
          alerts,
        ]
      );
      return response;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }

  // Edit an Event
  static async updateEvent(
    event_id,
    title,
    date_start,
    date_stop,
    location,
    description,
    headcount_several_potential,
    signup_deadline,
    age_min,
    min_participants,
    max_participants,
    adults_needed,
    num_adults,
    alerts
  ) {
    try {
      const response = db.result(
        `UPDATE events SET title = $1, date_start = $2, date_stop = $3, location = $4, description = $5, headcount_served_potential = $6, signup_deadline = $7, age_min = $8, min_participants = $9, max_participants = $10, adults_needed = $11, num_adults = $12, alerts = $13 WHERE id = ${event_id};`,
        [
          title,
          date_start,
          date_stop,
          location,
          description,
          headcount_several_potential,
          signup_deadline,
          age_min,
          min_participants,
          max_participants,
          adults_needed,
          num_adults,
          alerts,
        ]
      );
      return response;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }

  // Count the total Volunteers at a certain (future) SmileUp Event
  static async countTotalVolByEvent(event_id) {
    const query = `SELECT COUNT(id) FROM volunteer_activities WHERE event_id = '${event_id}';`;
    try {
      const response = await db.result(query);
      return response;
    } catch (err) {
      console.log("DB ERROR: ", err.message);
      return err.message;
    }
  }
}

module.exports = Admin;
