"use strict";

const express = require("express"),
  router = express.Router(),
  LoginModel = require("../models/loginModel");

//GETS
// This checks to see if the username is taken
router.get("/username", async (req, res) => {
  const { username, table } = req.query;
  console.log("THIS IS THE USERNAME AND TABLE:", username, table);
  const isUsername = await LoginModel.checkUserNames(username, table);
  console.log("ISUSERNAME", isUsername);
  if (isUsername.length) {
    res.send(false);
  } else {
    res.send(true);
  }
});

//POSTS
// This checks password to see if it matches db
router.post("/sitelogin", async (req, res) => {
  const { username, password } = req.body;
  const user = new LoginModel(null, username, password);
  const response = await user.login();
  if (!!response.isValid) {
    res.send(response);
  } else {
    res.sendStatus(500);
  }
});

router.post("/signupVolunteer", async (req, res) => {
  console.log("IN THE VOLUNTEER SIGN UP!");
  const {
    username,
    password,
    first_name,
    last_name,
    date_of_birth,
    phone,
    address,
    emergency_name,
    emergency_phone,
    sign_up_message,
    date_joined,
    is_guardian,
    is_minor,
    is_ambassador,
  } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const response = await LoginModel.addVolunteer(
    username,
    hashPassword,
    first_name,
    last_name,
    date_of_birth,
    phone,
    address,
    emergency_name,
    emergency_phone,
    sign_up_message,
    date_joined,
    is_guardian,
    is_minor,
    is_ambassador
  );
  if (response.id) {
    res.send(response);
  } else {
    res.send("Error: please try again").status(500);
  }
});

router.post("/signupAdmin", async (req, res) => {
  console.log("IN THE ADMIN SIGN UP!");
  const {
    username,
    password,
    first_name,
    last_name,
    phone,
    email,
    address,
    sign_up_message,
  } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const response = await LoginModel.addAdmin(
    username,
    hashPassword,
    first_name,
    last_name,
    phone,
    email,
    address,
    sign_up_message
  );
  if (response.id) {
    res.send(response);
  } else {
    res.send("Error: please try again").status(500);
  }
});

module.exports = router;
