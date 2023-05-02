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
    UserId INTEGER,
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

/* INSERT Software Department */
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('John', 'Smith', 'jsmith', '$2b$10$5HZTAHtgy741Z7QZ5J2Q.eLk30i7iHkITSHr0dIW3rpcENzTmw42e', 'Software Engineering Manager', 1);
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Jane', 'Doe', 'jdoe', '$2b$10$5HZTAHtgy741Z7QZ5J2Q.eLk30i7iHkITSHr0dIW3rpcENzTmw42e', 'Software Engineer', 1);
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Betty', 'Quinn', 'bquinn', '$2b$10$5HZTAHtgy741Z7QZ5J2Q.eLk30i7iHkITSHr0dIW3rpcENzTmw42e', 'Software Engineer Intern', 1);

/* INSERT IT Department (Sarah, Bill, Joe) */
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Sarah', 'Jones', 'sjones', '$2b$10$5HZTAHtgy741Z7QZ5J2Q.eLk30i7iHkITSHr0dIW3rpcENzTmw42e', 'IT Manager', 2);
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Bill', 'Smith', 'bsmith', '$2b$10$5HZTAHtgy741Z7QZ5J2Q.eLk30i7iHkITSHr0dIW3rpcENzTmw42e', 'IT Technician', 2);
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Joe', 'Johnson', 'jjohnson', '$2b$10$5HZTAHtgy741Z7QZ5J2Q.eLk30i7iHkITSHr0dIW3rpcENzTmw42e', 'IT Network Manager', 2);

/* INSERT HR Department (Sally, Bob) */
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Sally', 'Smith', 'ssmith', '$2b$10$5HZTAHtgy741Z7QZ5J2Q.eLk30i7iHkITSHr0dIW3rpcENzTmw42e', 'HR Manager', 3);
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Bob', 'Jones', 'bjones', '$2b$10$5HZTAHtgy741Z7QZ5J2Q.eLk30i7iHkITSHr0dIW3rpcENzTmw42e', 'HR Assistant', 3);

/* INSERT Marketing Department (Mary, Tom) */
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Mary', 'Smith', 'msmith', '$2b$10$5HZTAHtgy741Z7QZ5J2Q.eLk30i7iHkITSHr0dIW3rpcENzTmw42e', 'Marketing Manager', 4);
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Tom', 'Jones', 'tjones', '$2b$10$5HZTAHtgy741Z7QZ5J2Q.eLk30i7iHkITSHr0dIW3rpcENzTmw42e', 'Marketing Assistant', 4);

/* INSERT Sales Department (Sue, Mike) */
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Sue', 'Zalewski', 'szalewski', '$2b$10$5HZTAHtgy741Z7QZ5J2Q.eLk30i7iHkITSHr0dIW3rpcENzTmw42e', 'Sales Manager', 5);
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Mike', 'Smith', 'msmith0', '$2b$10$5HZTAHtgy741Z7QZ5J2Q.eLk30i7iHkITSHr0dIW3rpcENzTmw42e', 'Sales Assistant', 5);

/* INSERT A FEW PROJECTS */
INSERT INTO [Project] ([ProjectTitle], [ProjectActive], [DeptId]) VALUES ('Robot Inventory System Integration', 1, 1);
INSERT INTO [Project] ([ProjectTitle], [ProjectActive], [DeptId]) VALUES ('Taskify Application', 1, 1);
INSERT INTO [Project] ([ProjectTitle], [ProjectActive], [DeptId]) VALUES ('Network Infrastructure Upgrade', 1, 2);
INSERT INTO [Project] ([ProjectTitle], [ProjectActive], [DeptId]) VALUES ('Employee Onboarding', 1, 3);
INSERT INTO [Project] ([ProjectTitle], [ProjectActive], [DeptId]) VALUES ('Marketing Campaign', 1, 4);
INSERT INTO [Project] ([ProjectTitle], [ProjectActive], [DeptId]) VALUES ('Sales Training', 1, 5);

/* INSERT A FEW TASKS */
INSERT INTO [Task] ([TaskTitle], [TaskDescription], [TaskCompleted], [TaskDateCreated], [TaskDueDate], [ProjectId]) VALUES ('Create Database Schema', 'Create the database schema for the Robot Inventory System', 1, '2023-03-29', '2021-04-01', 1);
INSERT INTO [Task] ([TaskTitle], [TaskDescription], [TaskCompleted], [TaskDateCreated], [TaskDueDate], [ProjectId]) VALUES ('Setup MySQL Server', 'Create the database script for the Robot Inventory System', 1, '2023-03-29', '2021-04-01', 1);
INSERT INTO [Task] ([TaskTitle], [TaskDescription], [TaskCompleted], [TaskDateCreated], [TaskDueDate], [ProjectId]) VALUES ('Setup Meeting with IT Department', 'Hold design meeting with IT department about project requirements', 1, '2023-03-29', '2021-04-01', 1);
INSERT INTO [Task] ([TaskTitle], [TaskDescription], [TaskCompleted], [TaskDateCreated], [TaskDueDate], [ProjectId]) VALUES ('Decide on backend framework for Project', 'Setup backend structure for project', 0, '2023-03-29', '2023-04-20', 1);
INSERT INTO [Task] ([TaskTitle], [TaskDescription], [TaskCompleted], [TaskDateCreated], [TaskDueDate], [ProjectId]) VALUES ('Setup VLANs for new network', 'Setup VLANs for new network', 1, '2023-03-29', '2023-06-17', 3);
INSERT INTO [Task] ([TaskTitle], [TaskDescription], [TaskCompleted], [TaskDateCreated], [TaskDueDate], [ProjectId]) VALUES ('Create job listing for new software developer position', 'Post job listing', 1, '2023-04-29', '2023-05-13', 4);
INSERT INTO [Task] ([TaskTitle], [TaskDescription], [TaskCompleted], [TaskDateCreated], [TaskDueDate], [ProjectId]) VALUES ('Create job listing for new network engineer position', 'Post job listing', 0, '2023-04-29', '2023-05-15', 4);
INSERT INTO [Task] ([TaskTitle], [TaskDescription], [TaskCompleted], [TaskDateCreated], [TaskDueDate], [ProjectId]) VALUES ('Create Ad Campaign', 'Create Ad Campaign', 1, '2023-04-29', '2023-05-15', 5);
INSERT INTO [Task] ([TaskTitle], [TaskDescription], [TaskCompleted], [TaskDateCreated], [TaskDueDate], [ProjectId]) VALUES ('Create Sales Training Program', 'Create Sales Training Program', 1, '2023-04-29', '2023-05-15', 6);
INSERT INTO [Task] ([TaskTitle], [TaskDescription], [TaskCompleted], [TaskDateCreated], [TaskDueDate], [ProjectId]) VALUES ('Post New Product on LinkedIn', 'Post New Product on LinkedIn', 0, '2023-04-29', '2023-05-15', 5);
INSERT INTO [Task] ([TaskTitle], [TaskDescription], [TaskCompleted], [TaskDateCreated], [TaskDueDate], [ProjectId]) VALUES ('Install Network Switches', 'Install Network Switches in server', 0, '2023-03-29', '2023-06-17', 3);
INSERT INTO [Task] ([TaskTitle], [TaskDescription], [TaskCompleted], [TaskDateCreated], [TaskDueDate], [ProjectId]) VALUES ('Purchase Cisco Router', 'Purchase a new Cisco Router', 1, '2023-01-29', '2023-03-14', 3);
INSERT INTO [Task] ([TaskTitle], [TaskDescription], [TaskCompleted], [TaskDateCreated], [TaskDueDate], [ProjectId]) VALUES ('Fix an issue with authentication', 'Authentication is not working properly', 0, '2023-01-14', '2023-06-14', 2);

/* Assign Tasks to Users */
INSERT INTO [AssignedTo] ([DateAssigned], [UserId], [TaskId]) VALUES ('2023-01-05', 2, 1);
INSERT INTO [AssignedTo] ([DateAssigned], [UserId], [TaskId]) VALUES ('2023-01-23', 2, 2);
INSERT INTO [AssignedTo] ([DateAssigned], [UserId], [TaskId]) VALUES ('2023-01-26', 3, 3);
INSERT INTO [AssignedTo] ([DateAssigned], [UserId], [TaskId]) VALUES ('2023-03-13', 1, 4);
INSERT INTO [AssignedTo] ([DateAssigned], [UserId], [TaskId]) VALUES ('2023-03-15', 6, 5);
INSERT INTO [AssignedTo] ([DateAssigned], [UserId], [TaskId]) VALUES ('2023-02-17', 7, 6);
INSERT INTO [AssignedTo] ([DateAssigned], [UserId], [TaskId]) VALUES ('2023-04-29', null, 7);
INSERT INTO [AssignedTo] ([DateAssigned], [UserId], [TaskId]) VALUES ('2023-04-29', 9, 8);
INSERT INTO [AssignedTo] ([DateAssigned], [UserId], [TaskId]) VALUES ('2023-04-29', 11, 9);
INSERT INTO [AssignedTo] ([DateAssigned], [UserId], [TaskId]) VALUES ('2023-04-29', 10, 10);
INSERT INTO [AssignedTo] ([DateAssigned], [UserId], [TaskId]) VALUES ('2023-04-29', 5, 11);
INSERT INTO [AssignedTo] ([DateAssigned], [UserId], [TaskId]) VALUES ('2023-04-29', 6, 12);
INSERT INTO [AssignedTo] ([DateAssigned], [UserId], [TaskId]) VALUES ('2023-04-29', 3, 13);
