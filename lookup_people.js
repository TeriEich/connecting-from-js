const pg = require('pg');
const settings = require('./settings');
const lookup = require('./lookup_people');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const userInput = process.argv.slice(2);
// const db = require('./db');
const personByName = (arg) => {
  client.connect((err) => {
    if (err) {
      return console.error('Connection Error', err);
    }
    console.log('Searching...');
    client.query(`SELECT first_name, last_name, birthdate
      FROM famous_people
      WHERE first_name = $1::text
      OR last_name = $1::text;`, arg, (err, result) => {
      if (err) {
        return console.error('error running query', err);
      }
      console.log(`Found ${result.rowCount} person(s) by the name '${userInput}':`);
      for (let row in result.rows) {
        console.log(`- ${row.valueOf()}: ${result.rows[row].first_name} ${result.rows[row].last_name}, born ${result.rows[row].birthdate}`);

      }
      client.end();
    });
  });
}

// const personByName = (arg) => {
//   return client.query(
//     `SELECT first_name, last_name
//     FROM famous_people
//     WHERE first_name = $1::text
//     OR last_name = $1::text;`,
//     arg)
// };

personByName(userInput);

// const personByName = (userInput) => {
//   return client.query(
//     `SELECT first_name, last_name
//     FROM famous_people
//     WHERE first_name = $1::text;`,
//     [userInput]);
// };

// module.exports = {
//   personByName,
//   close: () => { client.end(); }
// };