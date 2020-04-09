DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

DELETE FROM employee WHERE firstName = 'Jim' AND lastName = 'Halpert';

SELECT * FROM employee; 



CREATE TABLE department (
  departmentID INT NOT NULL AUTO_INCREMENT,
  departmentName VARCHAR(30) NOT NULL,
  PRIMARY KEY (departmentID)
);

CREATE TABLE role (
  roleID INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DEC NOT NULL,
  departmentID INT,
  PRIMARY KEY(roleID),
  CONSTRAINT FK_department
    FOREIGN KEY (departmentID) REFERENCES department(departmentID) 
);

CREATE TABLE employee (
    employeeID INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    employeeRole INT,
    PRIMARY KEY(employeeID),
    CONSTRAINT FK_role FOREIGN KEY (employeeRole)
    REFERENCES role(roleID),
    managerID INT,
    CONSTRAINT FK_manager
    FOREIGN KEY (managerID)
    REFERENCES employee(employeeID)
    
);