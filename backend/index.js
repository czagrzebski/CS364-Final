const app = require('express')()
const cors = require('cors')

const port = 3500
const options = {
    cors: {
      origin: "*",
    },
  };

app.use(cors());

app.get("/", (req, res) => {
    res.send(`<h1>Hello!</h1> <button onClick="alert('Why do we exist')">Does not do anything</button>`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



