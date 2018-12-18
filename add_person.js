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


console.log('add_person.js is attempting to run...');

const userInput = process.argv.slice(2);
console.log(userInput);

knex('famous_people').insert({first_name: userInput[0]}, {last_name: userInput[1]}, {birthdate: userInput[2]});

