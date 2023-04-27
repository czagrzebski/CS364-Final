const db = require('../db/db');

const getAllDepts = async (req, res, next) => {
    db.raw('SELECT Department.DeptId, Department.DeptName, count(User.DeptId) as NumMembers FROM Department LEFT JOIN User ON Department.DeptId = User.DeptId GROUP BY Department.DeptId ORDER BY Department.DeptName ASC')
        .then((depts) => {
            res.json(depts);
        }).catch((err) => {
            err.status = 400;
            err.message = "Failed to fetch departments";
            next(err);
        }) 
}

const createDept = async (req, res, next) => {
    const { DeptName } = req.body;

    db.raw('INSERT INTO Department (DeptName) VALUES (?)', [DeptName])
        .then((dept) => {
            res.json("Department created successfully");
        }).catch((err) => {
            err.status = 400;
            err.message = "Failed to create department";
            next(err);
        })
}

module.exports = {
    getAllDepts, createDept
}