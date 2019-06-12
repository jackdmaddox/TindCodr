insert into users
    (users_first_name, users_last_name, users_email, users_password, users_city)
VALUES 
    ('jack', 'maddox', 'jack@email.com', 'password', 'Atlanta'),
    ('thomas', 'nguyen', 'thomas@email.com', 'drowssap', 'Atlanta');

insert into projects
    (project_title, project_start, project_summary, project_url, project_open, project_users_id)
VALUES
    ('tindcodr', 'friday', 'group project 2 to take over the world!', 'bigurl here', 'Open', 1),
    ('tindcodr', 'saturday', 'backend project in the making!', 'match me', 'Open', 2);

insert into comments
    (comments_content, comments_users_id, comments_project_id)
VALUES
    ('this project is the best', 1, 1),
    ('found my soulmate on here', 2, 1);