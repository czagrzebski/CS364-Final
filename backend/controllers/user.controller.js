const db = require("../db/db")
const bcrypt = require("bcrypt");

const saltRounds = 10;

async function getAllUsers(req, res, next) {
    const allUsers = await db.raw('SELECT UserId, FirstName, LastName FROM User')
        .catch((err) => {
            err.status = 400;
            error.message = "Failed to fetch users";
            next(err);
        });

    res.json(allUsers);  
}

async function getUserById(req, res, next) {
    const {userId} = req.body;

    if (!userId) {
        next(new Error("User ID is required"));
    }

    const user = await db.raw('SELECT UserId, FirstName, LastName FROM User WHERE UserId = ?', [userId])
        .then((user => {
            return user[0];
        }))
        .catch((err) => {
            err.status = 400;
            error.message = "Invalid User ID";
            next(err);
        });

    if (!user) {
        next(new Error("User not found"));
        return;
    }
        
    res.json(user);
}

async function createUser(req, res, next) {
    const {FirstName, LastName, Username, Password, Role, DeptId} = req.body;

    if (!FirstName || !LastName || !Username || !Password || !Role || !DeptId) {
        next(new Error("All fields are required"));
        return;
    }

    // Check if username already exists
    const user = await db.raw('SELECT UserId FROM User WHERE Username = ?', [Username])
        .then((user => {
            return user[0];
        })).catch((err) => {
            err.status = 400;
            error.message = "Failed to create user";
            next(err);
        });

    if (user) {
        next(new Error("User already exists"));
        return;
    }

    // Generate salt and hash password
    bcrypt.hash(Password, saltRounds, (err, hash) => {

        // Check if error occurred from bcrypt
        if (err) {
            err.status = 400;
            err.message = "Failed to create user: " + err.message;
            next(err);
            return;
        }

        // INSERT INTO User (FirstName, LastName, Username, Password, Role, DeptId) 
        db('User').insert({FirstName: FirstName, LastName: LastName, Username:Username, Password:hash, Role:Role, DeptId:DeptId})
            .then(() => {
                res.json({message: "User created successfully"});
            })
            .catch((err) => { 
                err.status = 400;
                err.message = "Failed to create user: " + err.message;
                next(err);
            })
        })
} 

module.exports = {
    getAllUsers, getUserById, createUser
};