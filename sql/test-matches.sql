create table test_likes (
    id serial primary key,
    liker_id int,
    liked_id int
);

INSERT INTO test_likes (liker_id, liked_id) VALUES (1,2);
INSERT INTO test_likes (liker_id, liked_id) VALUES (2,1);
INSERT INTO test_likes (liker_id, liked_id) VALUES (3,5);
INSERT INTO test_likes (liker_id, liked_id) VALUES (4,1);
INSERT INTO test_likes (liker_id, liked_id) VALUES (1,4);
INSERT INTO test_likes (liker_id, liked_id) VALUES (5,3);
INSERT INTO test_likes (liker_id, liked_id) VALUES (5,4);
INSERT INTO test_likes (liker_id, liked_id) VALUES (4,5);
INSERT INTO test_likes (liker_id, liked_id) VALUES (1,3);
INSERT INTO test_likes (liker_id, liked_id) VALUES (1,5);
INSERT INTO test_likes (liker_id, liked_id) VALUES (6,1);
INSERT INTO test_likes (liker_id, liked_id) VALUES (6,2);
INSERT INTO test_likes (liker_id, liked_id) VALUES (6,3);
INSERT INTO test_likes (liker_id, liked_id) VALUES (6,4);
INSERT INTO test_likes (liker_id, liked_id) VALUES (6,5);
INSERT INTO test_likes (liker_id, liked_id) VALUES (6,6);

select * from test_likes where liker_id = 1 AND liked_id =1;

select * from
test_likes as A
inner join 
test_likes as B
on A.liker_id = B.liked_id
where A.liker_id = B.liked_id
and B.liker_id = A.liked_id
and a.liker_id < b.liker_id

select A.liked_id from
likes as A
inner join 
likes as B
on A.liker_id = B.liked_id
where A.liker_id = B.liked_id
and B.liker_id = A.liked_id
and a.liker_id < b.liker_id
and a.liker_id = ${user_id}

select A.liked_id from
test_likes as A
inner join 
test_likes as B
on A.liker_id = B.liked_id
where A.liker_id = B.liked_id
and B.liker_id = A.liked_id
and a.liker_id < b.liker_id
and a.liker_id = 4
