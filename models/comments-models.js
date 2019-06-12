const db = require('./conn-model');

class Review {
    constructor(id, score, content, book_id, user_id){
        this.id = id;
        this.score = score;
        this.content = content;
        this.bookId = book_id;
        this.userId = user_id;
    }

    static async getById(id) {
        try {
            const response = await db.any(`select * from reviews where book_id=${id}`);
            console.log(response);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async getAll() {
        try {
            const response = await db.any(`select * from reviews`);
            console.log(response);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async addReview(score, content, book_id, user_id) {
        const query = `insert into reviews (score, content, book_id, user_id) values (${score}, '${content}', ${book_id}, ${user_id})`;
        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            console.log('Error', err.message);
            return err;
        }
    }
}

module.exports = Review;