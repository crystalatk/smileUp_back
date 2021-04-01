"use strict";

const db = require("./conn"),
  bcrypt = require("bcryptjs");

class Guardian {
  constructor(id) {
    this.id = id;
  }

  //view list of all upcoming events
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

  //view list of children
  static async getChildren(guardian_id) {
    try {
      const query = `
        SELECT * FROM volunteers 
        INNER JOIN guardian_child_link gl
          ON gl.volunteer_id = v.id
        WHERE gl.guardian_id = ${guardian_id};
      `;
      const response = await db.any(query);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  //view unapproved requests for each child belonging to guardian
  static async getUnapprovedEvents(guardian_id) {
    try {
      const query = `
        SELECT * FROM volunteer_activities va
        INNER JOIN guardian_child_link gl
          ON gl.volunteer_id = va.volunteer_id
        INNER JOIN events e
          ON e.id = va.event_id
        WHERE gl.guardian_id = ${guardian_id} AND va.guardian_approval = false
        ORDER BY e.date_start ASC;
      `;
      const response = await db.any(query);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  //view approved requests for each child belonging to guardian
  static async getApprovedEvents(guardian_id) {
    try {
      const query = `
        SELECT * FROM volunteer_activities va
        INNER JOIN guardian_child_link gl
          ON gl.volunteer_id = va.volunteer_id
        INNER JOIN events e
          ON e.id = va.event_id
        WHERE gl.guardian_id = ${guardian_id} AND va.guardian_approval = true
        ORDER BY e.date_start ASC;
      `;
      const response = await db.any(query);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  //approve a request
  static async approveVolunteerActivity(volunteer_id, event_id) {
    try {
      const query = `
        UPDATE volunteer_activities 
        SET guardian_approval = true
        WHERE volunteer_id = ${volunteer_id} AND event_id = ${event_id};
      `;
      const response = await db.one(query);
      return response;
    } catch (error) {
      return error.message;
    }
  }


  static async getVolunteersForGuardianId(guardian_id) {
    try {
      const query = ` SELECT v.id, v.first_name, v.last_name FROM guardian_child_link gcl INNER JOIN volunteers v ON gcl.volunteer_id = v.id WHERE gcl.guardian_id = ${guardian_id};`;
      const response = await db.any(query);
      console.log("This is a ", response)
      return response;
    }catch (error) {
      return error.message;
    }
  }


  static async linkGuardianAndMinor(minor_id, guardian_id) {
    try {
      const query = `
        INSERT INTO guardian_child_link (volunteer_id, guardian_id) VALUES (${minor_id}, ${guardian_id})
      `;
      const response = await db.one(query);
      return response;
    } catch (error) {
      return error.message;
    }
  }

}

module.exports = Guardian;
