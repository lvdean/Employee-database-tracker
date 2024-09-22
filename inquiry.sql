-- view all departments
SELECT * FROM departments

-- view all roles
SELECT name,
FROM departments(name)
INNER JOIN roles ON departments.department_id = roles.department_id 

-- VIEW ALL EMPLOYEE
SELECT id, title, salary, department_id
FROM roles,
INNER JOIN employees ON roles.role_id = employees.roles_id

-- Add Department
INSERT INTO department
VALUES {answer}

-- Add Role
INSERT INTO roles (title, salary)
VALUES {ANSWERA, ANSERB}

-- Add employee
INSERT INTO employees (first_name, last_name,)

-- update employee role
UPDATE employee
SET id {anser}
WHERE {anser}



