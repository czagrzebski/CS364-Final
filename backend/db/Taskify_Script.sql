
/* DROP TABLES */
DROP TABLE IF EXISTS [Department];
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Project];
DROP TABLE IF EXISTS [Task];
DROP TABLE IF EXISTS [AssignedTo];

/* CREATE TABLES */
CREATE TABLE [Department] (
    [DeptId] INT NOT NULL PRIMARY KEY AUTOINCREMENT,
    [DeptName] NVARCHAR(50) NOT NULL
)

CREATE TABLE [User] (
    [Id] INT NOT NULL PRIMARY KEY AUTOINCREMENT, 
    [FirstName] NVARCHAR(50) NOT NULL,
    [LastName] NVARCHAR(50) NOT NULL,
    [Username] NVARCHAR(50) NOT NULL, 
    [Password] NVARCHAR(50) NOT NULL, 
    [Role] NVARCHAR(50) NOT NULL 
    CONSTRAINT fk_departments_user FOREIGN KEY ([DeptId]) REFERENCES [Department] ([DeptId])
)  

CREATE TABLE [Project] (
    [ProjectId] INT NOT NULL PRIMARY KEY AUTOINCREMENT,
    [ProjectTitle] NVARCHAR(50) NOT NULL,
    [ProjectActive] BOOLEAN NOT NULL
    CONSTRAINT fk_departments_project FOREIGN KEY ([DeptId]) REFERENCES [Department] ([DeptId])
)

CREATE TABLE [Task] (
    [TaskId] INT NOT NULL PRIMARY KEY AUTOINCREMENT,
    [TaskTitle] NVARCHAR(50) NOT NULL,
    [TaskDescription] NVARCHAR(50) NOT NULL,
    [TaskCompleted] BOOLEAN NOT NULL,
    [DateCreated] DATE NOT NULL,
    [TaskDueDate] DATE,
    CONSTRAINT fk_projects FOREIGN KEY ([ProjectId]) REFERENCES [Project] ([ProjectId])
)

CREATE TABLE [AssignedTo] (
    CONSTRAINT fk_users FOREIGN KEY ([UserId]) REFERENCES [User] ([UserId]),
    CONSTRAINT fk_tasks FOREIGN KEY ([TaskId]) REFERENCES [Task] ([TaskId])
    [DateAssigned] DATE NOT NULL
)

/* INSERT Departments */
INSERT INTO [Department] ([DeptName]) VALUES ('Software Development');
INSERT INTO [Department] ([DeptName]) VALUES ('IT');
INSERT INTO [Department] ([DeptName]) VALUES ('HR');
INSERT INTO [Department] ([DeptName]) VALUES ('Marketing');
INSERT INTO [Department] ([DeptName]) VALUES ('Sales');
INSERT INTO [Department] ([DeptName]) VALUES ('Accounting');
INSERT INTO [Department] ([DeptName]) VALUES ('Operations');

/* INSERT Several Users */
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('John', 'Smith', 'jsmith', 'password', 'Software Engineering Manager', 1);
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Jane', 'Doe', 'jdoe', 'password', 'Software Engineer', 1);
INSERT INTO [User] ([FirstName], [LastName], [Username], [Password], [Role], [DeptId]) VALUES ('Betty', 'Quinn', 'bquinn', 'password', 'Software Engineer Intern', 1);
