INSERT INTO department (name)
VALUES ('Finance'),('Engineer'), ('Legal'), ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
('Accountant', 80000.00, 1), 
('Software Engineer', 120000.00, 2), 
('Lawyer', 145000.00, 3), 
('Technical Sales Manager', 85000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1, NULL ), ('Martin', 'Cruz', 2 , 1), ('Jane', 'Lovely', 3 , 1), ('Brent', 'Tyler', 4, 2);