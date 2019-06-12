const pgp = require('pg-promise')({
    query: e => {
    }
});

const options = {
    host: 'localhost',
    database: 'restaurantapp',
    password: 'Fiddle123'
};
const db = pgp(options);
module.exports = db;