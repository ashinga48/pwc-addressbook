/**
 * Goal: Take the inputs and process outputs.
 */

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())

/** Database */
const db = require('./db');
(async () => {
    db.load();
})();


/** 
 * default route '/' will return all contacts
 */
app.get('/', async (req, res) => {
    const data = await db.get();
    res.send((data))
});


/**
 * Handle GET or POST to /insert route
 * @param {
 *  phone : string,
 *  name  : string
 * } 
 */
const addContact = async (req, res) => {
    /**
     * Get params from either GET or POST request
     */
    const params = Object.keys(req.body).length > 0 ? req.body : req.query;

    /** 
     * check if params is empty 
     */
    if(Object.keys(params).length <= 0){
        return "No params sent";
    }
    
    const result = await db.add( params.name, params.phone );
    res.send(result);
};
app.post('/insert', addContact);
app.get('/insert', addContact);

app.listen(8080, () => {
  console.log('app listening on port 8080!')
})