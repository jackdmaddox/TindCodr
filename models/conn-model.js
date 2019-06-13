const pgp = require('pg-promise')({
    query: e => {
    }
});

const options = {
    host: 'localhost',
    database: 'tindcodr',
<<<<<<< HEAD
    password: 'Fiddle123'
=======
    user: 'nguyent'
>>>>>>> 895b15608a38f48e3992d3b593d3c7b46bd6d290
};
const db = pgp(options);
module.exports = db;