const host = "queenie.db.elephantsql.com",
  database = "rlhupser",
  user = "rlhupser",
  password = "Hwz5c1gapJXAikNnfdJmpPHTlsSrkccE";

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
