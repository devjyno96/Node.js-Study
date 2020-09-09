const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('get response')
})

app.get('/test', (req, res) => {
    res.send('get test response')
})

app.get('/json', (req, res) => {
    test_json = JSON.stringify({"test":"Test Data"})
    res.send(test_json)
})

app.post('/', (req, res) => {
    res.send('post response')
})

app.delete('/', (req, res) => {
    res.send('delete response')
})

app.put('/', (req, res) => {
    res.send('put response')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})