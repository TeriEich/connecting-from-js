const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const userInput = process.argv.slice(2);

const searchForPerson = (arg, err) => {
  return new Promise ((resolve, reject) => {
    client.query(`SELECT first_name, last_name, birthdate
    FROM famous_people
    WHERE first_name = $1::text
    OR last_name = $1::text;`, arg)
    .then((result) => {
      resolve(result)
      reject(err)
    })
  });
};

const personByName = (arg) => {
  client.connect((err) => {
    if (err) {
      return console.error('Connection Error', err);
    }
    console.log('Searching...');
    return (
      searchForPerson(arg)
      .then((result) => {
        if (err) {
          return console.error('error running query', err);
        } else if (result) {
          console.log(`Found ${result.rowCount} person(s) by the name '${userInput}':`);
          for (let row in result.rows) {
            console.log(`- ${row.valueOf()}: ${result.rows[row].first_name} ${result.rows[row].last_name}, born ${result.rows[row].birthdate}`);
          }
        }
      })
      .then(() => {
        client.end();
      })
    )
  });
};


personByName(userInput);