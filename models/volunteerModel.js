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
          SELECT id, first_name, last_name, date_of_birth, AGE(date_of_birth) as age, phone, email, zip_code, emergency_name, emergency_phone, date_joined, is_guardian, is_minor, is_ambassador, is_admin, is_deleted, avatar_link FROM volunteers
          WHERE id = '${id}';`;
      const response = await db.one(query);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // Get all events that a volunteer has signed up for
  static async getAllEventsByVolunteerID(volunteer_id) {
    try {
      const query = `
      SELECT va.id AS id, va.volunteer_id, e.title, e.date_start, e.date_stop, e.location, va.event_id, va.check_in_time, va.check_out_time, va.guardian_approval, va.created_at AS date_signed_up,  (DATE_PART('hour', va.check_out_time::timestamp - va.check_in_time::timestamp)) * 60 +
               DATE_PART('minute', va.check_out_time::timestamp - va.check_in_time::timestamp) AS minutes
        FROM volunteer_activities va 
          INNER JOIN events e ON va.event_id = e.id 
            WHERE va.volunteer_id = ${volunteer_id}
            ORDER BY e.date_start DESC;`;
      const response = await db.any(query);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // Get Volunteer Info based off the va_id from volunteer_activities table
  static async getAllVolunteerInfoBasedOnVAID(va_id) {
    try {
      const query = `
          SELECT v.first_name, v.last_name, v.id AS volunteer_id, va.guardian_approval FROM volunteer_activities va INNER JOIN volunteers v ON va.volunteer_id = v.id
          WHERE va.id = '${va_id}';`;
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
      const response = await db.any(query);
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

  static async getTotalEventsById(volunteer_id) {
    try {
      const query = `SELECT COUNT(event_id) FROM volunteer_activities 
    WHERE volunteer_id = ${volunteer_id};
    `;
      const response = await db.any(query);
      console.log("this is a response Id:", response);
      return response;
    } catch (error) {
      return error.message;
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
  // inserts volunteers and event ids into volunteer activity table
  static async insertVolunteerActivity(
    volunteer_id,
    event_id,
    guardian_approval
  ) {
    try {
      const query = `INSERT INTO volunteer_activities (volunteer_id, event_id, guardian_approval) VALUES ('${volunteer_id}', '${event_id}', '${guardian_approval}');`;
      const response = await db.result(query);
      return response;
    } catch (error) {
      console.log("error message is", error);
      return error.message;
    }
  }

  // Update Volunteer Avatar Picture
  static async updateAvatar(id, avatar_link) {
    try {
      const query = `UPDATE volunteers SET avatar_link = '${avatar_link}' WHERE id = ${id};`;
      const response = await db.result(query);
      console.log("Update Avatar response is ", response);
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
