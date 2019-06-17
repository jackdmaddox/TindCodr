insert into users
    (users_first_name, users_last_name, users_email, users_password, users_city, users_about_me)
VALUES 
    ('angela', 'Smith', 'angela@email.com', 'password', 'Atlanta', 'this is my about me section');

insert into users
    (users_first_name, users_last_name, users_email, users_password, users_city, users_about_me)
VALUES 
    ('steve', 'Smith', 'steve@email.com', 'password', 'Atlanta', 'this is my about me section');

insert into users
    (users_first_name, users_last_name, users_email, users_password, users_city, users_about_me)
VALUES 
    ('Harold', 'Smith', 'Harold@email.com', 'password', 'Atlanta', 'this is my about me section');

insert into users
    (users_first_name, users_last_name, users_email, users_password, users_city, users_about_me)
VALUES 
    ('BillyBob', 'Smith', 'BillyBob@email.com', 'password', 'Atlanta', 'this is my about me section');

insert into users
    (users_first_name, users_last_name, users_email, users_password, users_city, users_about_me)
VALUES 
    ('Terry', 'Smith', 'Terry@email.com', 'password', 'Atlanta', 'this is my about me section');

insert into users
    (users_first_name, users_last_name, users_email, users_password, users_city, users_about_me)
VALUES 
    ('Arthur', 'Smith', 'Arthur@email.com', 'password', 'Atlanta', 'this is my about me section');

insert into users
    (users_first_name, users_last_name, users_email, users_password, users_city, users_about_me)
VALUES 
    ('Tony', 'Smith', 'Tony@email.com', 'password', 'Atlanta', 'this is my about me section');

insert into users
    (users_first_name, users_last_name, users_email, users_password, users_city, users_about_me)
VALUES 
    ('Bam', 'Smith', 'Bam@email.com', 'password', 'Atlanta', 'this is my about me section');

insert into users
    (users_first_name, users_last_name, users_email, users_password, users_city, users_about_me)
VALUES 
    ('Slash', 'Smith', 'Slash@email.com', 'password', 'Atlanta', 'this is my about me section');

insert into users
    (users_first_name, users_last_name, users_email, users_password, users_city, users_about_me)
VALUES 
    ('Thor', 'Smith', 'Thor@email.com', 'password', 'Atlanta', 'this is my about me section');

insert into projects
    (project_title, project_start, project_summary, project_url, project_open, project_users_id)
VALUES
    ('tindcodr', 'friday', 'group project 2 to take over the world!', 'bigurl here', 'Open', 1);

insert into comments
    (comments_content, comments_users_id, comments_project_id)
    VALUES
    ('this project is the best', 1, 1);


INSERT INTO likes (liker_id, liked_id) VALUES (1,2);
INSERT INTO likes (liker_id, liked_id) VALUES (2,1);
INSERT INTO likes (liker_id, liked_id) VALUES (3,5);
INSERT INTO likes (liker_id, liked_id) VALUES (4,1);
INSERT INTO likes (liker_id, liked_id) VALUES (1,4);
INSERT INTO likes (liker_id, liked_id) VALUES (5,3);
INSERT INTO likes (liker_id, liked_id) VALUES (5,4);
INSERT INTO likes (liker_id, liked_id) VALUES (4,5);
INSERT INTO likes (liker_id, liked_id) VALUES (1,3);
INSERT INTO likes (liker_id, liked_id) VALUES (1,5);
INSERT INTO likes (liker_id, liked_id) VALUES (6,1);
INSERT INTO likes (liker_id, liked_id) VALUES (6,2);
INSERT INTO likes (liker_id, liked_id) VALUES (6,3);
INSERT INTO likes (liker_id, liked_id) VALUES (6,4);
INSERT INTO likes (liker_id, liked_id) VALUES (3,1);
INSERT INTO likes (liker_id, liked_id) VALUES (3,2);
INSERT INTO likes (liker_id, liked_id) VALUES (3,6);
INSERT INTO likes (liker_id, liked_id) VALUES (4,3);
INSERT INTO likes (liker_id, liked_id) VALUES (2,3);
INSERT INTO likes (liker_id, liked_id) VALUES (6,3);
INSERT INTO likes (liker_id, liked_id) VALUES (3,4);
INSERT INTO likes (liker_id, liked_id) VALUES (3,5);

select * from users
inner join likes on likes.liked_id = users.id
where likes.liker_id = 3;