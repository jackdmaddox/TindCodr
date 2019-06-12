insert into users
    (users_first_name, users_last_name, users_email, users_password, users_city)
VALUES 
    ('jack', 'maddox', 'jack@email.com', 'password', 'Atlanta');

insert into project
    (project_title, project_start, project_summary, project_url, project_open)
VALUES
    ('tindcodr', 'friday', 'group project 2 to take over the world!', 'bigurl here', 'Open');

insert into comments
    (comments_content, comments_users_id, comments_project_id)
VALUES
    ('this project is the best', 1, 1);