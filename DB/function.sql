-- SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.salary,
-- departments.name AS department_name, 
-- roles.title AS role_name
-- FROM employees
-- JOIN departments ON employees.department_id = departments.id
-- JOIN roles ON employees.role_id = roles.id

SELECT 
    employees.id, 
    employees.first_name, 
    employees.last_name, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name, 
    roles.salary,
    departments.name AS department_name, 
    roles.title AS role_name
FROM 
    employees
JOIN 
    departments ON employees.department_id = departments.id
JOIN 
    roles ON employees.role_id = roles.id
LEFT JOIN 
    employees AS manager ON employees.manager_id = manager.id;


-- SELECT 
--     roles.id, 
--     roles.title, 
--     roles.salary, 
--     departments.name AS department_name
-- FROM roles
-- INNER JOIN departments ON departments.id = roles.department_id;


-- SELECT * FROM departments