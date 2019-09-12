/**
 * Goal: Take the inputs and process outputs.
 */

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

var exbars = require('exbars')
app.engine('hbs', exbars({defaultLayout: 'main' , viewsPath: 'src/frontend/views'}));
app.set('views', 'src/frontend/views');
app.set('view engine', 'hbs');

const upload = require("express-fileupload")
app.use(upload());

/** Expose public folder static files */
// var path = require('path');
// app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())

/** Database */
const db = require('./db');
(async () => {
    db.load();
})();

/** REST API */
require('./api')(app, db);

/** Initialise Frontend */
require('./frontend')(app, db);

/** Listen at port 8080 */
app.listen(8080, () => {
  console.log('app listening on port 8080!')
})