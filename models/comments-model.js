const db = require('./conn-model');

class Comments {
    constructor(id, comments_content, comments_project_id, comments_user_id){
        this.id = id;
        this.comments_content = comments_content;
        this.comments_project_id = comments_project_id;
        this.comments_user_id = comments_user_id;
    }

    static async getById(id) {
        try {
            const response = await db.any(`select * from comments where comments_project_id=${id}`);
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

<<<<<<< HEAD
    static async addComment(comments_content, project_id, user_id) {
        const query = `insert into comments (comments_content, project_id, user_id) values ('${comments_content}', ${comments_project_id}, ${user_id})`;
=======
    static async addComment(comments_content, comments_project_id, comments_user_id) {
        const query = `insert into comments (comments_content, comments_project_id, comments_user_id) values ('${comments_content}', ${comments_project_id}, ${comments_user_id})`;
>>>>>>> jackdmaddox-staging-area
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