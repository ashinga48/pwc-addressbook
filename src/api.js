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
            return "No params sent";
        }
        
        const result = await db.add( params.name, params.phone );
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
            res.send('File deleted');
        }catch(e){
            res.send('File does not exist')
        }
    });

};

module.exports = apiHandler;