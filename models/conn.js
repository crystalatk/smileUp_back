const host = process.env.EXPRESS_APP_HOST,
  database = process.env.EXPRESS_APP_DATABASE,
  user = process.env.EXPRESS_APP_USER,
  password = process.env.EXPRESS_APP_PASSWORD;

const pgp = require("pg-promise")({
  query: function (event) {
    console.log("QUERY:", event.query);
  },
});

const options = {
  host,
  database,
  user,
  password,
};

const db = pgp(options);

module.exports = db;
