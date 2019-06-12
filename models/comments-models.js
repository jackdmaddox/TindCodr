const db = require('./conn-model');

class Comment {
    constructor(id, comments_content, book_id, user_id){
        this.id = id;
        this.comments_content = comments_content;
        this.projectId = project_id;
        this.userId = user_id;
    }

    static async getById(id) {
        try {
            const response = await db.any(`select * from comments where project_id=${id}`);
            console.log(response);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async getAll() {
        try {
            const response = await db.any(`select * from comments`);
            console.log(response);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async addComment(comments_content, project_id, user_id) {
        const query = `insert into comments (comments_content, project_id, user_id) values ('${comments_content}', ${project_id}, ${user_id})`;
        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            console.log('Error', err.message);
            return err;
        }
    }
}

module.exports = Comments;