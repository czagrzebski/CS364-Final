const db = require("../db/db")

const getAllTasks = async (req, res, next) => {
    const showAllTasks = (req.query.showAllTasks === 'true');
    const UserId = req.query.UserId;

    if(showAllTasks === false) {
        db.raw('SELECT Task.TaskId, Task.TaskTitle, Task.TaskDescription, Task.TaskCompleted, Task.TaskDueDate, Project.ProjectTitle, Project.ProjectId, User.UserId, User.FirstName, User.LastName, AssignedTo.DateAssigned FROM Task LEFT JOIN AssignedTo ON Task.TaskId = AssignedTo.TaskId JOIN Project ON  Task.ProjectId = Project.ProjectId LEFT JOIN User ON AssignedTo.UserId = User.UserId WHERE User.UserId = ? ORDER BY Task.TaskDueDate ASC', [UserId])
        .then((tasks) => {
            res.json(tasks);
        }).catch((err) => {
            console.log(err)
            err.status = 400;
            err.message = "Failed to fetch tasks";
            next(err);
        });
    } else {
        db.raw('SELECT Task.TaskId, Task.TaskTitle, Task.TaskDescription, Task.TaskCompleted, Task.TaskDueDate, Project.ProjectTitle, Project.ProjectId, User.UserId, User.FirstName, User.LastName, AssignedTo.DateAssigned FROM Task LEFT JOIN AssignedTo ON Task.TaskId = AssignedTo.TaskId JOIN Project ON  Task.ProjectId = Project.ProjectId LEFT JOIN User ON AssignedTo.UserId = User.UserId ORDER BY Task.TaskDueDate ASC')
        .then((tasks) => {
            res.json(tasks);
        }).catch((err) => {
            console.log(err)
            err.status = 400;
            err.message = "Failed to fetch tasks";
            next(err);
        });
    }  
}

const getTaskById = async (req, res, next) => {
    const {TaskId} = req.body;

    if (!TaskId || TaskId == -1) {
        next(new Error("Task ID is required"));
        return;
    }

    const task = db.raw('SELECT Task.TaskId, Task.TaskTitle, Task.TaskDescription, Task.TaskCompleted, Task.TaskDueDate, Project.ProjectTitle, User.FirstName, User.LastName FROM Task LEFT JOIN AssignedTo ON Task.TaskId = AssignedTo.TaskId JOIN Project ON  Task.ProjectId = Project.ProjectId LEFT JOIN User ON AssignedTo.UserId = User.UserId WHERE Task.TaskId = ?', [TaskId])
        .then((task => {
            return task[0];
        }))
        .catch((err) => {
            err.status = 400;
            err.message = "Invalid Task ID";
            console.log(err)
            next(err);
        });

    if (!task) {
        next(new Error("Task not found"));
        return;
    }
    res.json(task);
}

const updateTaskById = async (req, res, next) => {
    const {TaskId, TaskTitle, TaskDescription, TaskCompleted, TaskDueDate, ProjectId, UserId} = req.body;

    if(!TaskId || !TaskTitle || !TaskDescription || !TaskDueDate) {
        next(new Error("All fields are required"));
        return;
    }

    await db.raw('UPDATE Task SET TaskTitle = ?, TaskDescription = ?, TaskCompleted = ?, TaskDueDate = ?, ProjectId = ? WHERE TaskId = ?', [TaskTitle, TaskDescription, TaskCompleted, TaskDueDate, ProjectId, TaskId])
        .catch((err) => {
            err.status = 400;
            err.message = "Invalid Task ID";
            next(err);
        })

    /* Update AssignedTo Table. Check if assigned user is different than last assigned user */
    const lastAssignedUser = await db.raw('SELECT UserId FROM AssignedTo WHERE TaskId = ?', [TaskId])
        .then((user => {
            return user[0].UserId;
        }))

    if(lastAssignedUser != UserId) {
        const currentTime = new Date().toISOString().slice(0, 10).replace('T', ' ');
        await db.raw('UPDATE AssignedTo SET UserId = ?, DateAssigned = ? WHERE TaskId = ?', [UserId, currentTime, TaskId])
            .then((task => {
                res.json("Task Updated Successfully");
            }))
            .catch((err) => {
                err.status = 400;
                err.message = "Failed to update task";
                next(err);
            })
    } else {
        res.json("Task Updated Successfully");
    } 
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
        }))
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
    
    if(UserId == -1) {
        await db.raw('INSERT INTO AssignedTo (TaskId, UserId, DateAssigned) VALUES (?, ?, ?)', [taskId, null, currentTime])
            .then((task => {
                res.json("Task Created Successfully");
            }))
            .catch((err) => {
                err.status = 400;
                err.message = "Failed to assign task to user";
                next(err);
            })
    } else {
        await db.raw('INSERT INTO AssignedTo (TaskId, UserId, DateAssigned) VALUES (?, ?, ?)', [taskId, UserId, currentTime])
            .then((task => {
                res.json("Task Created Successfully");
            }))
            .catch((err) => {
                err.status = 400;
                err.message = "Failed to assign task to user";
                next(err);
            })
    } 
}

const deleteTaskById = async (req, res, next) => {
    const {TaskId} = req.body;

    if (!TaskId) {
        next(new Error("Task ID is required"));
    }

    const task = await db.raw('SELECT * FROM Task WHERE TaskId = ?', [TaskId])
        .then((task => {
            return task[0];
        }))
        .catch((err) => {
            err.status = 400;
            err.message = "Invalid Task ID";
            next(err);
        });

    if (!task) {
        next(new Error("Task not found"));
        return;
    }

    await db.raw('DELETE FROM Task WHERE TaskId = ?', [TaskId])
         .catch((err) => {
            err.status = 400;
            err.message = "Failed to delete task";
            next(err);
        });

    await db.raw('DELETE FROM AssignedTo WHERE TaskId = ?', [TaskId])
        .then(() => {
            res.json("Task Deleted Successfully");
        }
        ).catch((err) => {
            err.status = 400;
            err.message = "Failed to delete task";
            next(err);
        });
}

const mostProductiveThanAverageEmployee = async (req, res, next) => {

    let query = `SELECT User.FirstName, User.LastName, count(*) numTasksCompleted
                   FROM User JOIN AssignedTo JOIN Task
                     ON User.UserId = AssignedTo.UserId 
                        AND Task.TaskId = AssignedTo.TaskId
                    WHERE Task.TaskCompleted = 1
                    GROUP BY User.UserId
                    HAVING count(*) >=  (SELECT avg(NumCompletedTasks) as AverageCompletedTasks FROM   
                                            (SELECT User.FirstName, User.LastName, count(*) as NumCompletedTasks 
                                               FROM User JOIN AssignedTo JOIN Task
                                                 ON User.UserId = AssignedTo.UserId 
                                                    AND Task.TaskId = AssignedTo.TaskId
                                               WHERE Task.TaskCompleted = 1
                                               GROUP BY User.UserId) as CompletedTasks)
                    ORDER BY numTasksCompleted DESC;`
                                    
    
    db.raw(query).then((result) => { 
        res.json(result);
    }).catch((err) => {
        err.status = 400;
        err.message = "Failed to get most productive employees";
        next(err);
    });
}
                         
module.exports = {
    getAllTasks, updateTaskById, insertTask, getTaskById, deleteTaskById, mostProductiveThanAverageEmployee
}