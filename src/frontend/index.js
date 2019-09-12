
const csvtojson = require("csvtojson")

/**
 * Simple utility to compare two json to find intersecting items
 * @param {First Array} a 
 * @param {Second Array} b 
 * @param {comparison function} fn 
 */
const intersectionBy = (a, b, fn) => {
    const s = new Set(b.map(fn));
    return a.filter(x => !s.has(fn(x)));
};

const frontendHandler = (app, db) => {

    /** 
     * default route '/' send response
     */
    app.get('/', async (req, res) => {

        const allContacts = await db.getAll();
        res.render('home', {
            layout: 'default',
            template: 'home',
            contacts : allContacts,
            query : req.query
        });
    });


    /** 
     * Compare has both GET and POST '/compare'
     * 
     * GET - Simply renders compare form ( for users to select 2 csv files to compare)
     * POST - Takes submission from GET and compares files
     */
    app.get('/compare', async (req, res) => {
        res.render('compare', {
            layout: 'default',
            template: 'compare'
        });
    });

    app.post('/compare', async (req, res) => {
        // res.render('compare', {
        //     layout: 'compare', 
        // });

        // Read Address Book 1
        const addressbook1_csvData = req.files.addressbook1.data.toString('utf8');
        const addressbook1_json = await csvtojson().fromString(addressbook1_csvData);

        // Read Address Book 2
        const addressbook2_csvData = req.files.addressbook2.data.toString('utf8');
        const addressbook2_json = await csvtojson().fromString(addressbook2_csvData);

        // Comparing two json objects using lodash
        // Replace x.phone with x.name to compare using name instead of phone numbers
        const result1 = intersectionBy(addressbook1_json, addressbook2_json, x => x.phone);
        const result2 = intersectionBy(addressbook2_json, addressbook1_json, x => x.phone);
        const result = result1.concat(result2);

        // render results
        res.render('results', {
            layout: 'default',
            template: 'results',
            contacts : result,
            noHeader : true
        });
    });

};

module.exports = frontendHandler;