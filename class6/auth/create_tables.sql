CREATE TABLE users 
  ( 
     id       SERIAL PRIMARY KEY, 
     username TEXT NOT NULL UNIQUE, 
     password TEXT NOT NULL 
  ); 

CREATE TABLE sessions 
  ( 
     sessionid TEXT PRIMARY KEY, 
     user_id   INTEGER REFERENCES users(id) 
  ); 