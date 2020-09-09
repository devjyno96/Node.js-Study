const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('get엿이나 처먹어라 World!')
})

app.post('/', (req, res) => {
    res.send('post엿이나 처먹어라 World!')
})

app.delete('/', (req, res) => {
    res.send('delete엿이나 처먹어라 World!')
})

app.put('/', (req, res) => {
    res.send('put엿이나 처먹어라 World!')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})