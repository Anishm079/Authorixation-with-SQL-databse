Client side 
-----------
skills used :- REACT (vite version)
libraries used:-axios randomcolor react-router-dom react-toastify styled-components
to install libraries:-npm i
to start server:- npm run dev cmd

Server side
-----------
skills used :- Express SQL Nodejs
libraries used:-express cors moment mysql body-parser bcrypt
to install libraries:-npm i
to start server:- npm start

DATABASE settings
------------------
database name :- auth
database tables:- user blockeduser

for user table=CREATE TABLE user(id INT AUTO_INCREMENT NOT NULL PRIMARY KEY , email VARCHAR(255) NOT NULL UNIQUE , password VARCHAR(255) NOT NULL ,inc_password_attempts INT DEFAULT 0)

for blockeduser=CREATE TABLE user(id INT AUTO_INCREMENT NOT NULL PRIMARY KEY , email VARCHAR(255) NOT NULL UNIQUE , unblock_date DATE NOT NULL )

//READY TO GO 