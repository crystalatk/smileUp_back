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
      const response = db.one(
        `UPDATE events (title, date_start, date_stop, location, description, headcount_several_potential, signup_deadline, age_min, min_participants, max_participants, adults_needed, num_adults, alerts) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) WHERE event_id = ${event_id};`,
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
}

module.exports = Admin;
