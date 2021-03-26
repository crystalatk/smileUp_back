"use strict";

const express = require("express"),
  router = express.Router();

router.get("/", (req, res) => {
  res.json("Smile! And have a great day!").status(200);
});

module.exports = router;
