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
            SELECT id, title, to_char(date_start, 'MM-DD-YYYY') as date, to_char(date_start, 'HH:MM') as start_time, to_char(date_stop, 'HH:MM') as stop_time, location, to_char(signup_deadline, 'MM-DD-YYYY') as deadline, age_min FROM events
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

  //   Get Total Number of Events Smile Up has completed
  static async countTotalEvents() {
    try {
      const query = `
      SELECT COUNT(id) FROM events WHERE date_stop < NOW();`;
      const response = await db.any(query);
      console.log("this is the", response)
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}

module.exports = Events;
