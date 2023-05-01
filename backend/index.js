const app = require('express')()
const cors = require('cors')
const dotenv = require("dotenv");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes')
const taskRoutes = require('./routes/task.routes')
const projectRoutes = require('./routes/project.routes')
const departmentRoutes = require('./routes/department.routes')
const authRoutes = require('./routes/auth.routes')

//Loads environmental variables from .env file
dotenv.config();


const port = 5000
const options = { cors: { origin: "*" } };

app.use(cors(options));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/task', taskRoutes);
app.use('/project', projectRoutes);
app.use('/department', departmentRoutes);
app.use('/auth', authRoutes);

//--Error Handlers--//
app.use((req, res) => res.status(404).send("404 NOT FOUND"));

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
    console.log(`Taskify backend server listening on port ${port}`);
})



