/******************************************************
* Taskify Database Script
* Version: 1.0
* Description: This script creates the database and tables
*              for the Taskify application.
* Author: Creed Zagrzebski
* Date: 3/29/2023
******************************************************/

/* DROP TABLES */
DROP TABLE IF EXISTS [Department];
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Project];
DROP TABLE IF EXISTS [Task];
DROP TABLE IF EXISTS [AssignedTo];

CREATE TABLE Department (
    DeptId INTEGER PRIMARY KEY AUTOINCREMENT,
    DeptName NVARCHAR(50) NOT NULL
);

CREATE TABLE User (
    UserId INTEGER PRIMARY KEY AUTOINCREMENT, 
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Username NVARCHAR(50) NOT NULL UNIQUE, 
    Password NVARCHAR(50) NOT NULL, 
    Role NVARCHAR(50) NOT NULL,
    DeptId INTEGER NOT NULL,
    CONSTRAINT fk_department_user FOREIGN KEY (DeptId) REFERENCES Department(DeptId)
);

CREATE TABLE Project (
    ProjectId INTEGER PRIMARY KEY AUTOINCREMENT,
    ProjectTitle NVARCHAR(50) NOT NULL,
    ProjectActive BOOLEAN NOT NULL,
    DeptId INTEGER NOT NULL,
    CONSTRAINT fk_department_project FOREIGN KEY (DeptId) REFERENCES Department(DeptId)
);

CREATE TABLE Task (
    TaskId INTEGER PRIMARY KEY AUTOINCREMENT,
    TaskTitle NVARCHAR(50) NOT NULL,
    TaskDescription NVARCHAR(50) NOT NULL,
    TaskCompleted BOOLEAN NOT NULL,
    TaskDateCreated DATE NOT NULL,
    TaskDueDate DATE,
    ProjectId INTEGER NOT NULL,
    CONSTRAINT fk_project_task FOREIGN KEY (ProjectId) REFERENCES Project(ProjectId)
);

CREATE TABLE AssignedTo (
    DateAssigned DATE NOT NULL,
    UserId INTEGER NOT NULL,
    TaskId INTEGER NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (UserId) REFERENCES User(UserId),
    CONSTRAINT fk_task FOREIGN KEY (TaskId) REFERENCES Task(TaskId)
);

/* INSERT Example Data for Departments */
INSERT INTO [Department] ([DeptName]) VALUES ('Software Development');
INSERT INTO [Department] ([DeptName]) VALUES ('IT');
INSERT INTO [Department] ([DeptName]) VALUES ('HR');
INSERT INTO [Department] ([DeptName]) VALUES ('Marketing');
INSERT INTO [Department] ([DeptName]) VALUES ('Sales');
INSERT INTO [Department] ([DeptName]) VALUES ('Accounting');

/* INSERT Software Department */
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('John', 'Smith', 'jsmith', 'password', 'Software Engineering Manager', 1);
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Jane', 'Doe', 'jdoe', 'password', 'Software Engineer', 1);
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Betty', 'Quinn', 'bquinn', 'password', 'Software Engineer Intern', 1);

/* INSERT IT Department (Sarah, Bill, Joe) */
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Sarah', 'Jones', 'sjones', 'password', 'IT Manager', 2);
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Bill', 'Smith', 'bsmith', 'password', 'IT Technician', 2);
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Joe', 'Johnson', 'jjohnson', 'password', 'IT Network Manager', 2);

/* INSERT A FEW PROJECTS */
INSERT INTO [Project] ([ProjectTitle], [ProjectActive], [DeptId]) VALUES ('Robot Inventory System Integration', 1, 1);