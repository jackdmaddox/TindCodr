const db = require('./conn-model'),
    bcrypt = require('bcryptjs');

class Likes {
    constuctor(id, liker_id, liked_id) {
        this.id = id;
        this.liker_id= liker_id;
        this.liked_id = liked_id;
    }

    // static async getMatchesById(user_id) {
    //     try {
    //         const response = await db.any(`select A.liked_id from
    //         likes as A
    //         inner join 
    //         likes as B
    //         on A.liker_id = B.liked_id
    //         where A.liker_id = B.liked_id
    //         and B.liker_id = A.liked_id
    //         and a.liker_id < b.liker_id
    //         and a.liker_id = ${user_id}`)
    //         console.log('they match with these profiles', response);
    //         return response;
    //     } catch (err) {
    //         console.log('error', err.message);
    //         return err;
    //     }
    // }

    static async getMatchesById(user_id) {
        try {
            const response = await db.any(`select * from users
            inner join likes on likes.liked_id = users.id
            where likes.liker_id = ${user_id}`)
            console.log('they match with these profiles', response);
            return response;
        } catch (err) {
            console.log('error', err.message);
            return err;
        }
    }

    static async likeUser(liked_id, liker_id) {
        const query = `insert into likes (liker_id, liked_id) values ('${liker_id}', ${liked_id})`;
        console.log('liker id is: ', liker_id);
        console.log('liked id is: ', liked_id);
        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            console.log('Error', err.message);
            return err;
        }
    }

    static async dislikeUser(liked_id, liker_id) {
        const query = `insert into dislikes (liker_id, liked_id) values ('${liker_id}', ${liked_id})`;
        console.log('liker id is: ', liker_id);
        console.log('liked id is: ', liked_id);
        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            console.log('Error', err.message);
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