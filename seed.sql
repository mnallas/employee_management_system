DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM roles;


SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, employee.manager_id, department.department_name
	FROM employee 
	INNER JOIN roles
		ON employee.role_id = roles.id
	INNER JOIN department
		ON roles.department_id = department.id;

UPDATE employee
SET role_id = 2
WHERE id = 4;

DELETE FROM employee WHERE id = 1;
DELETE FROM employee WHERE id = 2;
DELETE FROM employee WHERE id = 6;

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Myhkas", "Nallas", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Shanesia", "Mae", 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Vince", "Clarence", 3, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 80000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Senior Engineer", 90000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 85000, 3);

INSERT INTO department (department_name)
VALUES ("Sales");

INSERT INTO department (department_name)
VALUES ("Engineering");

INSERT INTO department (department_name)
VALUES ("Finance");