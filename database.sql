CREATE DATABASE todo_database;

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  completed INTEGER,
  description VARCHAR(255),
  createdAt DATE,
  updatedAt DATE
);