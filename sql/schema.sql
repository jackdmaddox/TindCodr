create table users (
  id serial primary key,
  users_first_name varchar(100), 
  users_last_name varchar(100),
  users_email varchar(100), 
  users_password varchar(500),
  users_city varchar(100)
);

ALTER TABLE users
Add COLUMN users_about_me VARCHAR (1000);

create table projects (
  id serial primary key,
  project_title varchar(100),
  project_start varchar(100),
  project_summary varchar(100),
  project_url varchar(100),
  project_open varchar(100),
  project_users_id integer references users(id)
);

create table comments (
  id serial primary key,
  comments_content varchar(500),
  comments_users_id integer references users(id),
  comments_project_id integer references projects(id)
  );

create table likes (
  id serial primary key,
  liker_users_id integer references users(id),
  liked_users_id integer (10)
);

create table dislikes (
  id serial primary key,
  disliker_users_id integer references users(id),
  disliked_users_id integer (10)
;)
