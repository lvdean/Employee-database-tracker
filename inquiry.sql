-- view all departments
SELECT * FROM departments

-- view all roles
SELECT id, title, salary, roles.department_id AS department_name
FROM roles
INNER JOIN departments ON departments.department_id = roles.department_id 

-- VIEW ALL EMPLOYEEs
SELECT id, first_name, last_name, manager_id, employees.department_id AS department_name, employees.role_id AS roles
FROM employees,
INNER JOIN departments ON employee.department_id = departments.department_name
INNER JOIN roles ON employee.role_id = roles.role_id


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



