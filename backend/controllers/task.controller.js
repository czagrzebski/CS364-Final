const db = require("../db")

const getAllTasks = async (req, res, next) => {
    const allTasks = db.raw('SELECT * FROM Task JOIN Project JOIN User ON Task.ProjectId = Project.ProjectId AND Task.UserId = User.UserId')
        .then((tasks) => {
            res.json(tasks);
        }).catch((err) => {
            err.status = 400;
            error.message = "Failed to fetch tasks";
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
    const {taskId, ProjectId, UserId, TaskTitle, TaskDescription, TaskDueDate} = req.body;
    
    if(!taskId || !ProjectId || !UserId || !TaskTitle || !TaskDescription || !TaskDueDate) {
        next(new Error("All fields are required"));
        return;
    }


    // TODO: Update the task
}


const insertTask = async (req, res, next) => {
    const {ProjectId, UserId, TaskTitle, TaskDescription, TaskDueDate} = req.body;

    if (!ProjectId || !UserId || !TaskTitle || !TaskDescription || !TaskDueDate) {
        next(new Error("All fields are required"));
        return;
    }

    // TODO: Get the current time and time 
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