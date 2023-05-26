const db = require('../db/db');

const getAllProjects = async (req, res, next) => {
    const DeptId  = req.query.DeptId;

    if(DeptId == undefined || DeptId == -1) {    
        db.raw('SELECT * FROM Project JOIN Department ON Project.DeptId = Department.DeptId ORDER BY Project.ProjectActive DESC, Department.DeptName ASC')
        .then((projects) => {
            res.json(projects);
        }).catch((err) => {
            err.status = 400;
            err.message = "Failed to fetch projects";
            next(err);
        }) 
    } else {
        db.raw('SELECT * FROM Project JOIN Department ON Project.DeptId = Department.DeptId WHERE Department.DeptId = ? ORDER BY Project.ProjectActive DESC, Department.DeptName ASC', [DeptId])
        .then((projects) => {
            res.json(projects);
        }).catch((err) => {
            err.status = 400;
            err.message = "Failed to fetch projects";
            next(err);
        }) 
}
    }

const createProject = async (req, res, next) => {
    const { ProjectTitle, DeptId } = req.body;

    if(!ProjectTitle || !DeptId) {
        return next(new Error("Project name and department ID are required"));
    }

    await db.raw('INSERT INTO Project (ProjectTitle, DeptId, ProjectActive) VALUES (?, ?, ?)', [ProjectTitle, DeptId, 1])
        .then((result) => {
            res.json("Project created successfully");
        }).catch((err) => {
            err.status = 400;
            err.message = "Failed to create project";
            next(err);
        })
}

const updateProject = async (req, res, next) => {
    const { ProjectId, ProjectTitle, DeptId, ProjectActive } = req.body;

    db.raw('UPDATE Project SET ProjectTitle = ?, DeptId = ?, ProjectActive = ? WHERE ProjectId = ?', [ProjectTitle, DeptId, ProjectActive, ProjectId])
        .then((result) => {
            res.json("Project updated successfully");
        }).catch((err) => {
            err.status = 400;
            err.message = "Failed to update project";
            next(err);
        })
}

module.exports = {
    getAllProjects, createProject, updateProject
}