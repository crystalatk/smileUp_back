"use strict";

const db = require("./conn"),
  bcrypt = require("bcryptjs");

class Login {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  // Checks to make sure username is unique
  static async checkUserNames(username) {
    try {
      const response = await db.any(
        `SELECT username FROM volunteers WHERE username='${username}';`
      );
      return response;
    } catch (err) {
      return false;
    }
  }

  // Add Users Separated by Type
  // VOLUNTEERS
  static async addVolunteer(
    username,
    password,
    first_name,
    last_name,
    date_of_birth,
    phone,
    email,
    zip_code,
    emergency_name,
    emergency_phone,
    sign_up_message,
    is_guardian,
    is_minor,
    is_ambassador
  ) {
    try {
      const query = `INSERT INTO volunteers (username, password, first_name, last_name, date_of_birth, phone, email, zip_code, emergency_name, emergency_phone, sign_up_message, is_guardian, is_minor, is_ambassador) VALUES ('${username}',  '${password}', '${first_name}', '${last_name}', '${date_of_birth}', '${phone}', '${email}', '${zip_code}', '${emergency_name}', '${emergency_phone}', '${sign_up_message}', '${is_guardian}', '${is_minor}', '${is_ambassador}') RETURNING id;`;
      const response = await db.one(query);
      console.log("addVolunteer response is ", response);
      return response;
    } catch (error) {
      console.log("error message is ", error);
      return error.message;
    }
  }

  // ADMINS
  static async addAdmin(
    username,
    password,
    first_name,
    last_name,
    phone,
    email,
    address,
    sign_up_message
  ) {
    try {
      const query = `INSERT INTO admins (username, password, first_name, last_name, phone, email, address, sign_up_message) VALUES ('${username}',  '${password}', '${first_name}', '${last_name}', '${phone}', '${email}', '${address}', '${sign_up_message}') RETURNING id;`;
      const response = await db.one(query);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  // Checks hashed password
  checkPassword(hashedPassword) {
    return bcrypt.compareSync(this.password, hashedPassword);
  }

  // Checks login info against db (must pass table in)
  async login() {
    try {
      const query = `SELECT id, password, first_name, last_name, date_of_birth, AGE(date_of_birth) as age, phone, email, zip_code, emergency_name, emergency_phone, date_joined, is_guardian, is_minor, is_ambassador, is_admin, is_deleted, avatar_link FROM volunteers WHERE username = '${this.username}';`;
      const response = await db.one(query);
      const isValid = this.checkPassword(response.password);
      if (!!isValid) {
        return response;
      } else {
        return { isValid };
      }
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = Login;
