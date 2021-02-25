DROP DATABASE IF EXISTS employeetracker;
CREATE DATABASE employeetracker;

USE employeetracker;

CREATE TABLE department(
id INT PRIMARY KEY NOT NULL,
deptname VARCHAR(30) NULL
);

CREATE TABLE roles(
id INT PRIMARY KEY NOT NULL,
title VARCHAR(30) NULL,
salary DECIMAL NULL,
department_id INT NULL
);

CREATE TABLE employee(
id INT PRIMARY KEY NOT NULL,
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL,
role_id INT NULL,
manager_id INT NULL
);