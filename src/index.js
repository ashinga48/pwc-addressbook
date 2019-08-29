/**
 * Goal: Take the inputs and process outputs.
 */

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())

// Endpoint to ensure server is responding
app.get('/', (req, res) => res.send('Running!'));

app.post('/add', (req, res) => {
  res.send('Hello World!')
})

app.listen(8080, () => {
  console.log('app listening on port 8080!')
})