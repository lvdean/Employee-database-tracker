DROP DATABASE IF EXISTS employee_db
CREATE DATABASE employee_db;

\c employee_db;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department),
  REFERENCES department(id),
  ON DELETE SET NULL
);

CREATE TABLE employees (
id SERIAL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
manager_id INTEGER,
FOREIGN KEY (role),
REFERENCES role(id)

)

