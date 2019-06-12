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

    async save() {
        try {
            const response = await db.one(
                `insert into users
                    (users_first_name, users_last_name, users_email, users_password, users_city)
                values
                    ($1, $2, $3, $4, $5, $6)
                returning id
                `, [this.users_first_name, this.users_last_name, this.users_email, this.users_password, this.users_city]);
            console.log('user was created with id:', response.id);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    
}

module.exports = User