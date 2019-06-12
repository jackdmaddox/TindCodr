const pgp = require('pg-promise') ({
    query:e => {
        console.log('QUERY: ', e.query);
    }
})

const options = {
    host: 'localhost',
    database: "tindcodr",
    user: 'jack'
}

const db=pgp(options);

module.exports =db;