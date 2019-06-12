const db = require('./conn-model'),
    bcrypt = require('bcryptjs');

class User {
    constructor(id, project_title, project_start, project_summary, project_url, project_open, password) {
        this.id = id;
        this.project_title = project_title;
        this.project_start = project_start;
        this.project_summary = project_summary;
        this.project_url = project_url;
        this.project_open = project_open;
        this.password = password;
    }

    async checkPassword(hashedPassword) {
        //syntact: bcrypt.comapresynce(part one, part two)
        //first argument is what user puts in form, second is hashed password. Returns true or false
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async save() {
        try {
            const response = await db.one(
                `insert into users
                    (project_title, project_start, project_summary, project_url, project_open, password)
                values
                    ($1, $2, $3, $4, $5, $6)
                returning id
                `, [this.project_title, this.project_start, this.project_summary, this.project_url, this.project_open, this.password]);
            console.log('user was created with id:', response.id);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    async login() {
        try {
            const response = await db.one(`
                    select id, project_title, project_start, password
                        from users
                    where project_summary = $1`, [this.project_summary]);
            console.log('hash is', response.password);
            const isValid = await this.checkPassword(response.password);
            console.log('is it valid?', isValid);
            if (!!isValid) { /// if isvalid === absolutely true
                // then we destructure values we want from the response
                const { project_title, project_start, id } = response;
                //this lines will return the isValid, first name, last name and user id
                return { isValid, project_title, project_start, user_id: id }
            } else {
                // otherwise just return the false isvalid
                return { isValid }
            };
        } catch (err) {
            return err.message;
        }
    }

//add get all users function

}
module.exports = User;