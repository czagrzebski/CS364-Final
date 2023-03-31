const app = require('express')()
const cors = require('cors')

const port = 5000
const options = {
    cors: {
      origin: "*",
    },
  };

app.use(cors());

app.get("/", (req, res) => {
    res.send(`Hello World!`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



