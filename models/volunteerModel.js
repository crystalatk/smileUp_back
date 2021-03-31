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

  // Get Info for Profile by volunteer id
  static async getAllProfileInfo(id) {
    try {
      const query = `
          SELECT * FROM volunteers
          WHERE id = '${id}';`;
      const response = await db.one(query);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // Get Gaurdian ID for minor Profile Page
  static async getGuardianID(volunteer_id) {
    try {
      const query = `
          SELECT guardian_id FROM guardian_child_link
          WHERE volunteer_id = '${volunteer_id}';`;
      const response = await db.one(query);
      return response;
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      return error.message;
    }
  }

  static async getTotalVolunteersId() {
    try {
      const query = `SELECT id FROM volunteers 
      WHERE is_guardian = false AND is_admin = false AND is_deleted = false;
      `;
      const response = await db.any(query);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  static async getVolunteerHours() {
    try {
      const query = `SELECT SUM(total_minutes) FROM volunteer_activities;
    `;
      const response = await db.any(query);
      console.log("this is a response:", response);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  static async getTotalSmiles(volunteer_id) {
    try {
      const query = `SELECT SUM(headcount_served_potential) FROM events;
    `;
      const response = await db.any(query);
      console.log("this is a response:", response);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  static async getVolunteerHoursId(volunteer_id) {
    try {
      const query = `SELECT SUM(total_minutes) FROM volunteer_activities
    WHERE volunteer_id = ${volunteer_id}
    ;
    `;
      const response = await db.any(query);
      console.log("this is a response Id:", response);
      return response;
    } catch (error) {
      return error.message;
    }
  }
}

  static async getTotalEventsById(volunteer_id) {
    try {
    const query = `SELECT COUNT(event_id) FROM volunteer_activities 
    WHERE volunteer_id = 26;
    `;
    const response = await db.any(query);
    console.log("this is a response Id:", response)
    return response;
  } catch (error) {
    return error.message
  }
}



  // Update Volunteer Info
  static async updateVolunteer(
    id,
    first_name,
    last_name,
    date_of_birth,
    phone,
    email,
    zip_code,
    emergency_name,
    emergency_phone
  ) {
    try {
      const query = `UPDATE volunteers SET first_name = '${first_name}', last_name = '${last_name}', date_of_birth = '${date_of_birth}', phone = '${phone}', email = '${email}', zip_code = '${zip_code}', emergency_name = '${emergency_name}', emergency_phone = '${emergency_phone}' WHERE id = ${id};`;
      const response = await db.result(query);
      console.log("Edit Profile response is ", response);
      return response;
    } catch (error) {
      console.log("error message is ", error);
      return error.message;
    }
  }
  // Volunteer Check-in
  // Volunteer Check-out
}

module.exports = Volunteer;
