const apiHandler = (app, db) => {

    /** 
     * default route '/' will return all contacts
     */
    app.get('/api', async (req, res) => {
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
            res.send("No params sent");
        }
        
        const result = await db.add( params.name, params.phone );

        // if submission comes from UI redirect to home else return JSON response
        if(params.isform){
            res.redirect('/?success=true');
        }
        res.send(result);
    };
    app.post('/api/insert', addContact);
    app.get('/api/insert', addContact);

    /** 
     * default route '/' will return all contacts
     */
    app.get('/api/delete', async (req, res) => {
        try{
            await db.removeDatabase();
            // res.send('File deleted');
            res.redirect('/');
        }catch(e){
            res.send('File does not exist')
        }
    });

    /** 
     * export contacts.csv to download
     */
    app.get('/api/export', async (req, res) => {
        try{
            var filePath = "contacts.csv"; // Or format the path using the `id` rest param
            var fileName = "contacts.csv"; // The default name the browser will use

            res.download(filePath, fileName);
        }catch(e){
            res.send('File does not exist')
        }
    });

};

module.exports = apiHandler;