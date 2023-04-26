const db = require('../db/db');

const getAllProjects = async (req, res, next) => {
    db.raw('SELECT * FROM Project JOIN Department ON Project.DeptId = Department.DeptId')
        .then((projects) => {
            res.json(projects);
        }).catch((err) => {
            err.status = 400;
            err.message = "Failed to fetch projects";
            next(err);
        }) 
}

module.exports = {
    getAllProjects
}