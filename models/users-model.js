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
            select id, first_name, last_name, password
                from users
            where email = $1`, 
            [this.email]);
            return userData;
        } catch (err) {
            return err.message;
        }
    }

    async save() {
        try {
            const response = await db.one(
                `insert into users
                    (users_first_name, users_last_name, users_email, users_password, users_city, coding_level, about_me, picture_url)
                values
                    ($1, $2, $3, $4, $5, $6, $7, $8)
                returning id
                `, [this.users_first_name, this.users_last_name, this.users_email, this.users_password, this.users_city, this.coding_level, this.about_me, this.picture_url]);
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

static async getUserById() {
    try {
        const userData = await db.one(`select * from users where id=${id}`);
        return userData;
    } catch (err) {
        return err.message
    }
}

    async checkIfCreated() {
        try {
<<<<<<< HEAD
<<<<<<< HEAD
            const response = await db.one(`SELECT * FROM users WHERE email=${1}`);
=======
            const response = await db.one(`SELECT users_email FROM users WHERE users_email =$1`, [this.users_email]);
>>>>>>> cbdd50cb13322f35086e19f0a9f4cbbd3921576b
=======
            const response = await db.one(`SELECT email FROM users WHERE email =$1`, [this.email]);
>>>>>>> 9fdef59579628883aa456106230178242bce557b
            return response;
        } catch(err) {
            return err.message
        }
    }
}
module.exports = User;