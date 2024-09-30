DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;
-- Department table
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
   
);

-- roles table
CREATE TABLE roles (
  id SERIAL  PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE SET NULL
);
-- employees
CREATE TABLE employees (
id SERIAL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
manager_id INTEGER,
role_id INTEGER NOT NULL,
department_id INTEGER NOT NULL,
FOREIGN KEY (role_id) REFERENCES roles(id),
FOREIGN KEY (department_id) REFERENCES departments(id)

);

