const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//temporary solution for storing refresh tokens which
//only saves tokens for current runtime
//will use database/redis in the future
let refreshTokens = [];

/**
 * Generates Access Token and Refresh Token upon
 * successful authorization.
 */
async function login(req, res) {
    let { username, password } = req.body;

    //Remove unnecessary spacing
    username = username.trim();

    //Fetch User
    const user = await db.raw('SELECT * FROM User WHERE User.Username = ?', [username])
        .then((users) => {
            return users[0] 
        }).catch((err) => {
            console.log(err);
            res.status(500).send("An unknown error has occurred");
        });

    //User Does Not Exist in Database
    if (!user) {
        res.status(401).send("Invalid Credentials");
        return;
    }

    //Compare password to one stored in DB. If correct, issue a JWT.
    bcrypt.compare(password, user.Password, function (err, result) {
        if (err) {
          res.status(500).send("An unknown error has occurred");
        }
        if (result) {
          const accessToken = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);

          refreshTokens[refreshToken] = user; 

          res.cookie("rft", refreshToken, { httpOnly: true, path: "/auth", secure: false });

          const response = {
              user: user.Username,
              accessToken: accessToken,
              fullName: user.FirstName + " " + user.LastName
          };

          res.status(200).json(response);
        } else {
          res.status(401).send("Invalid Credentials");
        }
    });
}

/**
 * Generates Access Token given Access Token Secret
 * and username
 */
function generateAccessToken(user) {
  return jwt.sign(
    { username: user.Username, id: user.UserId },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_LIFE || "30m",
    }
  );
}

/**
 * Generates Refresh Token given Access Token Secret
 * and username
 */
function generateRefreshToken(user) {
  return jwt.sign(
    { username: user.Username, id: user.UserId },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_LIFE || "7d",
    }
  );
}

/**
 * Deletes Refresh Token from Memory (eventually a DB)
 */
async function logout(req, res) {
  refreshTokens = refreshTokens.filter((token) => token !== req.cookies.rft);
  res.sendStatus(204);
}

/**
 * Issues a new Access Token given a valid refresh token
 */
async function getNewToken(req, res) {

  if(req.cookies == null) return res.sendStatus(401);

  const refreshToken = req.cookies.rft;

  if (refreshToken == null) return res.sendStatus(401);

  if (refreshTokens[refreshToken] == null) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(401).send("Invalid Token");
      return;
    }

    //Fetch User Info
   db.raw('SELECT * FROM User WHERE User.UserId = ?', [user.id])
      .then((user_db) => {
          const accessToken = generateAccessToken(user_db[0]);
          const response = {
            user: user.Username,
            accessToken: accessToken,
            fullName: user_db[0].FirstName + " " + user_db[0].LastName
          };
    
        res.json(response)
      }).catch((err) => {
          console.log(err);
          res.status(500).send("An unknown error has occurred");
      });

 
  });
}

/**
 * Middleware for Access Token Validation
 */
async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //check if auth header exists

  //check if token exists in request
  if (token == null) return res.status(401).send("Invalid Token");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).send("Invalid Token");
    req.user = user;
    next();
  });
}

module.exports = {
  login,
  logout,
  getNewToken,
  verifyToken,
};