const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.routes')

app.use(bodyParser.json());

const port = 5000
const options = {
    cors: {
      origin: "*",
    },
  };

app.use(cors());

app.use('/user', userRoutes);

//--Error Handlers--//
app.use((req, res) => res.status(404).send("404 NOT FOUND"));

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})



