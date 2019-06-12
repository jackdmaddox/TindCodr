const db = require('./conn-model'),
    bcrypt = require('bcryptjs');

class User {
    constructor(id, users_first_name, users_last_name, users_email, users_password, users_city, password) {
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

    async login() {
        try {
            const response = await db.one(`
                    select id, users_first_name, users_last_name, users_password
                        from users
                    where users_email = $1`, [this.users_email]);
            console.log('hash is', response.users_password);
            const isValid = await this.checkPassword(response.users_password);
            console.log('is it valid?', isValid);
            if (!!isValid) { /// if isvalid === absolutely true
                // then we destructure values we want from the response
                const { users_first_name, users_last_name, users_city, id } = response;
                //this lines will return the isValid, first name, last name and user id
                return { isValid, users_first_name, users_last_name, users_city, user_id: id }
            } else {
                // otherwise just return the false isvalid
                return { isValid }
            };
        } catch (err) {
            return err.message;
        }
    }

}

module.exports = User