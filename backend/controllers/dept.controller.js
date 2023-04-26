const db = require('../db/db');

const getAllDepts = async (req, res, next) => {
    db.raw('SELECT * FROM Department')
        .then((depts) => {
            res.json(depts);
        }).catch((err) => {
            err.status = 400;
            err.message = "Failed to fetch departments";
            next(err);
        }) 
}

module.exports = {
    getAllDepts
}