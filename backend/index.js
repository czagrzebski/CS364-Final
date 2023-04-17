const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.routes')
const taskRoutes = require('./routes/task.routes')
const projectRoutes = require('./routes/project.routes')

app.use(bodyParser.json());

const port = 5000
const options = {
    cors: {
      origin: "*",
    },
  };

app.use(cors());

app.use('/user', userRoutes);
app.use('/task', taskRoutes);
app.use('/project', projectRoutes);

//--Error Handlers--//
app.use((req, res) => res.status(404).send("404 NOT FOUND"));

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
    console.log(`Taskify backend server listening on port ${port}`);
})



