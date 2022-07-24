CREATE DATABASE todo_database;

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  completed INTEGER,
  description VARCHAR(255),
  created_at DATE,
  updated_at DATE
);