const db = require('./conn-model');

class Books {
    constructor(id, users_first_name, users_last_name, users_email, users_password, users_city) {
        this.id = id;
        this.users_first_name = users_first_name;
        this.users_last_name = users_last_name;
        this.users_email = users_email;
        this.users_password = users_password;
        this.users_city = users_city;
    }

    static async getAll() {
        try {
            const response = await db.any(`select * from users`);
            return response;
        } catch (err) {
            return err.message
        }
    }

    static async getById(id) {
        try {
            const response = await db.one(`select * from users where id=${id}`);
            return response;
        } catch (err) {
            return err.message
        }
    }

    static async add(users_first_name, users_last_name, users_email, users_password, users_city) {
        const query = `insert into users
        (users_first_name, users_last_name, users_email, users_password, users_city)
    Values ('${users_first_name}', '${users_last_name}','${users_email}', '${users_password}', '${users_city}')`;
        try {
            let response = await db.result(query);
            return response;
        } catch (err) {
            console.log('Error', err.message);
            return err;
        }
    }
}

module.exports = users;