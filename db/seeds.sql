INSERT INTO department (name)
VALUES ('Finance'),('Engineer'), ('Legal'), ('Sales')

INSERT INTO roles (title, salary, department, role)
VALUES
('Accountant', 80000.00, 1, 1), 
('Software Engineer', 120000.00, 2, 2), 
('Lawyer', 145000.00, 3, 3), 
('Technical Sales Manager', 85000.00, 4, 4),

INSERT INTO employee (first_name, last_name, role_id, manager)
VALUES ('John', 'Smith', 'Accountant', 'n/a'), ('Martin', 'Cruz', 'Software Engineer', 'Rick'), ('Jane', 'Lovely', 'Lawyer', 'n/a'), ('Brent', 'Tyler', 'Sales', 'Bill'),