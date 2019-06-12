const pgp = require('pg-promise')({
    query: e => {
    }
});

const options = {
    host: 'localhost',
    database: 'tindcodr',
    user: 'jack'
};
const db = pgp(options);
module.exports = db;