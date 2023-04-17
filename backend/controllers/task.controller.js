const db = require("../db/db")

const getAllTasks = async (req, res, next) => {
    db.raw('SELECT Task.TaskId, Task.TaskTitle, Task.TaskDescription, Task.TaskCompleted, Task.TaskDueDate, Project.ProjectTitle, User.FirstName, User.LastName FROM Task LEFT JOIN AssignedTo ON Task.TaskId = AssignedTo.TaskId JOIN Project ON  Task.ProjectId = Project.ProjectId LEFT JOIN User ON AssignedTo.UserId = User.UserId ORDER BY Task.TaskDueDate ASC')
        .then((tasks) => {
            res.json(tasks);
        }).catch((err) => {
            console.log(err)
            err.status = 400;
            err.message = "Failed to fetch tasks";
            next(err);
        });
    }

const getTaskById = async (req, res, next) => {
    const {taskId} = req.body;

    if (!taskId) {
        next(new Error("Task ID is required"));
    }

    const task = await db.raw('SELECT * FROM Task JOIN Project JOIN User ON Task.ProjectId = Project.ProjectId AND Task.UserId = User.UserId WHERE TaskId = ?', [taskId])
        .then((task => {
            return task[0];
        }))
        .catch((err) => {
            err.status = 400;
            error.message = "Invalid Task ID";
            next(err);
        });

    if (!task) {
        next(new Error("Task not found"));
        return;
    }
        
    res.json(task);
}

const getTaskAssignedToUser = async (req, res, next) => {
    const {userId} = req.body;

    if (!userId) {
        next(new Error("User ID is required"));
        return;
    }

    const tasks = await db.raw('SELECT * FROM Task JOIN Project JOIN User ON Task.ProjectId = Project.ProjectId AND Task.UserId = User.UserId WHERE User.UserId = ?', [userId])
        .catch((err) => {
            err.status = 400;
            error.message = "Failed to fetch tasks";
            next(err);
        });

    res.json(tasks);
}

const updateTaskById = async (req, res, next) => {
    const {TaskId, TaskTitle, TaskDescription, TaskCompleted, TaskDueDate} = req.body;

    if(typeof TaskCompleted != 'boolean') {
        next(new Error("ALl fields are required"));
        return;
    }

    if(!TaskId || !TaskTitle || !TaskDescription || !TaskDueDate) {
        next(new Error("All fields are required"));
        return;
    }

    // TODO: Update the task
    const update = await db.raw('UPDATE Task SET TaskTitle = ?, TaskDescription = ?, TaskCompleted = ?, TaskDueDate = ? WHERE TaskId = ?', [TaskTitle, TaskDescription, TaskCompleted, TaskDueDate, TaskId])
        .then((task => {
            res.json('Task updated successfully');
        }))
        .catch((err) => {
            err.status = 400;
            console.log(err)
            err.message = "Invalid Task ID";
            next(err);
        })
}


const insertTask = async (req, res, next) => {
    const {ProjectId, UserId, TaskTitle, TaskDescription, TaskDueDate} = req.body;

    if (!ProjectId || !UserId || !TaskTitle || !TaskDescription || !TaskDueDate) {
        next(new Error("All fields are required"));
        return;
    }

    const currentTime = new Date().toISOString().slice(0, 10).replace('T', ' ');

    const taskId = await db.raw('INSERT INTO Task (TaskTitle, TaskDescription, TaskCompleted, TaskDateCreated, TaskDueDate, ProjectId) VALUES (?, ?, ?, ?, ?, ?) RETURNING TaskId', [TaskTitle, TaskDescription, 0, currentTime, TaskDueDate, ProjectId])
        .then((task => {
            return task[0].TaskId;
        }
        ))
        .catch((err) => {
            err.status = 400;
            console.log(err)
            err.message = "Failed to create task";
            next(err);
        })

    if (!taskId) {
        next(new Error("Failed to create task"));
        return;
    }
    
    if(UserId != -1) {
        await db.raw('INSERT INTO AssignedTo (TaskId, UserId, DateAssigned) VALUES (?, ?, ?)', [taskId, UserId, currentTime])
        .catch((err) => {
            err.status = 400;
            err.message = "Failed to assign task to user";
            next(err);
        })
    }

    res.json("Task Created Successfully");
}

const deleteTaskById = async (req, res, next) => {
    const {taskId} = req.body;

    if (!taskId) {
        next(new Error("Task ID is required"));
    }

    const task = await db.raw('SELECT * FROM Task WHERE TaskId = ?', [taskId])
        .then((task => {
            return task[0];
        }))
        .catch((err) => {
            err.status = 400;
            error.message = "Invalid Task ID";
            next(err);
        });

    if (!task) {
        next(new Error("Task not found"));
        return;
    }

    await db.raw('DELETE FROM Task WHERE TaskId = ?', [taskId])
        .then(() => {
            res.json("Task Deleted Successfully");
        }).catch((err) => {
            err.status = 400;
            error.message = "Failed to delete task";
            next(err);
        });
}

module.exports = {
    getAllTasks, updateTaskById, insertTask
}