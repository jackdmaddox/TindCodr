const db = require('./conn-model'),
    bcrypt = require('bcryptjs');

class User {
    constructor(id, users_first_name, users_last_name, users_email, users_password, users_city) {
        this.id = id;
        this.users_first_name = users_first_name;
        this.users_last_name = users_last_name;
        this.users_email = users_email;
        this.users_password = users_password;
        this.users_city = users_city;
    }

    async checkPassword(hashedPassword) {
        //syntact: bcrypt.comapresynce(part one, part two)
        //first argument is what user puts in form, second is hashed password. Returns true or false
        return bcrypt.compareSync(this.users_password, hashedPassword);
    }

    async getUserByEmail() {
        try {
            const userData = await db.one(`
            select id, users_first_name, users_last_name, users_password, users_city
                from users
            where users_email = $1`, 
            [this.users_email]);
            return userData;
        } catch (err) {
            return err.message;
        }
    }

    async save() {
        try {
            const response = await db.one(
                `insert into users
                    (users_first_name, users_last_name, users_email, users_password, users_city)
                values
                    ($1, $2, $3, $4, $5)
                returning id
                `, [this.users_first_name, this.users_last_name, this.users_email, this.users_password, this.users_city]);
            console.log('user was created with id:', response.id);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getAll() {
        try {
            let response = await db.any(`select * from users`);
            return response;
        } catch(err) {
            return err.message
        }
    }


    async checkIfCreated() {
        try {
            const response = await db.one(`SELECT users_email FROM users WHERE users_email =$1`, [this.users_email]);
            return response;
        } catch(err) {
            return err.message
        }
    }
}
module.exports = User;