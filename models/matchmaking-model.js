const db = require('./conn-model'),
    bcrypt = require('bcryptjs');

class Likes {
    constuctor(id, liker_users_id, liked_users_id) {
        this.id = id;
        this.liker_users_id = liker_users_id;
        this.liked_users_id = liked_users_id;
    }

    static async getMatchesById(user_id) {
        try {
            const response = await db.any(`select A.liked_id from
            likes as A
            inner join 
            likes as B
            on A.liker_id = B.liked_id
            where A.liker_id = B.liked_id
            and B.liker_id = A.liked_id
            and a.liker_id < b.liker_id
            and a.liker_id = ${user_id}`)
            console.log('they match with these profiles', response);
            return response;
        } catch (err) {
            console.log('error', err.message);
            return err;
        }
    }

    async randomUserIDGenerator() {
        try {
            const randomID = await db.one(`
            select 
                id
            FROM 
                users
            Order BY RANDOM()
            LIMIT 1;`);
            console.log('this is randomID called from users models', randomID);
            return randomID;
        } catch (err) {
        return err.message; 
        }    
    }

    // async getRandomUserInfo(randomID) {
    //     try {
    //         const userData = await db.one(`
    //         select id, users_first_name, users_last_name, users_password, users_city, users_about_me
    //             from users
    //         where id = ${randomID};`);
    //         return userData;
    //     } catch (err) {
    //         return err.message;
    //     }
    // }


}

module.exports = Likes;