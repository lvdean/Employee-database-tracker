INSERT INTO departments (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Account Manager', 160000, 3),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, manager_id, role_id, department_id)
VALUES ('John', 'Doe', NULL, 1, 1),
       ('Mike', 'Chan', 1, 2, 1),
       ('Ashley', 'Rodriguez', NULL, 3, 2),
       ('Kevin', 'Tupik', 3, 4, 2),
       ('Kunal', 'Singh', NULL, 5, 3),
       ('Malia', 'Brown', 5, 6, 3),
       ('Sarah', 'Lourd', NULL, 7, 4),
       ('Tom', 'Allen', 7, 8, 4);
        