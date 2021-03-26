"use strict";

const db = require("./conn"),
  bcrypt = require("bcryptjs");

class Admin {
  constructor(id) {
    this.id = id;
  }

  // Create a New Event
  static async addEvent(
    date_start,
    date_stop,
    location,
    description,
    headcout_several_potential,
    signup_deadline,
    age_min,
    min_participants,
    max_participants,
    adults_needed,
    num_adults,
    alerts
  ) {
    try {
      const respone = db.results(
        `INSERT INTO events (date_start, date_stop, location, description, headcout_several_potential, signup_deadline, age_min, min_participants, max_participants, adults_needed, num_adults, alerts) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,
        [
          date_start,
          date_stop,
          location,
          description,
          headcout_several_potential,
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
    date_start,
    date_stop,
    location,
    description,
    headcout_several_potential,
    signup_deadline,
    age_min,
    min_participants,
    max_participants,
    adults_needed,
    num_adults,
    alerts
  ) {
    try {
      const respone = db.one(
        `UPDATE events (date_start, date_stop, location, description, headcout_several_potential, signup_deadline, age_min, min_participants, max_participants, adults_needed, num_adults, alerts) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,
        [
          date_start,
          date_stop,
          location,
          description,
          headcout_several_potential,
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
