// const pg = require('knex');
const settings = require('./settings');

const knex = require('knex')({
  client     : 'pg',
  connection : {
    host     : settings.hostname,
    port     : settings.port,
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    ssl      : settings.ssl
  }
});


console.log('knex-lookup-people.js is attempting to run...');

var query = knex.select(['first_name', 'last_name', 'birthdate']).from('famous_people');

const userInput = process.argv[2];
if(userInput) {
  query = query.where({'first_name': userInput});
}
query.then(function(rows) {
  console.log(rows)
  return
});
// })


// `SELECT first_name, last_name, birthdate
//     FROM famous_people
//     WHERE first_name = $1::text
//     OR last_name = $1::text;`, userInput