const frontendHandler = (app, db) => {

    /** 
     * default route '/' send response
     */
    app.get('/', async (req, res) => {

        const allContacts = await db.getAll();
        res.render('home', {
            layout: 'home', 
            contacts : allContacts
        });
    });

};

module.exports = frontendHandler;