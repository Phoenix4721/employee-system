INSERT INTO department(departmentName)
VALUES ('Engineering'), ('Sales'), ('Finance'), ('Legal');

INSERT INTO role(title, salary, departmentID)
VALUES ('Sales lead', 100000, 2), 
       ('Sales person', 80000, 2), 
       ('Lead Engineer', 150000, 1), 
       ('Software engineer', 120000, 1), 
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);

INSERT INTO employee(firstName, lastName, employeeRole, managerID)
VALUES ('Joshua', 'Boswell', 1, 1),
       ('Michael', 'Scott', 2, 1),
       ('Dwight', 'Shrute', 3, 2),
       ('Pam', 'Beasley', 3, 2),
       ('Jim', 'Halpert', 3, 2),
       ('Kevin', 'Malone', 4, 3),
       ('Angela', 'Martin', 4, 3),
       ('Ryan', 'Howard', 5, 4),
       ('Creed', 'Bratton', 6, 4);


`SELECT employee.employeeID, employee.firstName, employee.lastName, department.departmentName, role.title, role.salary
                FROM employee
                LEFT JOIN role ON employee.employeeRole = role.roleID
                LEFT JOIN department ON role.departmentId = department.departmentID
                    WHERE department.departmentName = ?
                    ORDER BY employee.employeeID ASC`