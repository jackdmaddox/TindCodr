<<<<<<< HEAD
const db = requrire('./conn');
=======
const db = requrire('./conn-model');
>>>>>>> 60262b63dc8f42fff7b0a0706db8c41e4ccc2ae5

class Projects {
    constructor(id, project_title, project_start, project_summary, project_url, project_open, project_users_id) {
        this.id = id;
        this.project_title = project_title;
        this.project_start = project_start;
        this.project_summary = project_summary;
        this.project_url = project_url;
        this.project_open = project_open;
        this.project_users_id = project_users_id;
        }


    static async getAll() {
        try {
            const response = await db.any(`select * from projects`);
            return response;
        } catch(err) {
            return err.message
        }
    }
    

    static async getById(id) {
        try {
            const response = await db.one(`select * from projects where id=${id}`);
            return response;
        } catch(err) {
            return err.message
        }
    }


    static async addProject(project_title, project_start, project_summary, project_url, project_open, project_users_id) {
        const query = `insert into projects
        (project_title, project_start, project_summary, project_url, project_open)
<<<<<<< HEAD
    Values ('${project_title}', '${project_start}','${project_summary}', '${project_url}', '${project_open}')`;
=======
    Values ('${project_title}', '${project_start}','${project_summary}', '${project_url}', '${project_open}', '${project_users_id})`;
>>>>>>> 60262b63dc8f42fff7b0a0706db8c41e4ccc2ae5
        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            console.log ('Error', err.message);
            return err;
        }
    }
}



module.exports = Projects;

