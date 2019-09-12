
const csvdb = require('csv-database');
const fs = require('fs');

const DATABASE_NAME = "contacts.csv";
/** 
 * Database class
 * 
 * Operations
 *  load - load 'contacts.csv' as default database
 *  get         - return all contacts
 *  add         - add a contact
 *  delete      - delete a contact
 */
class database {

    constructor() {
        this.db = null;
    }

    /**
     * init db with fields phone and name
     */
    async load() {
        this.db = await csvdb(DATABASE_NAME, ["phone","name"], ",");
        return true;
    }

    /**
     * 
     */
    async precheck(){
        if(!this.db){
            await this.load();
        }
        return true;
    }

    /**
     * getAll function to return all contacts
     */
    async getAll(){
        await this.precheck();
        return this.db.get();
    }

    /**
     * get a contact based on param or return all contacts
     * @param 
     * param - default {} = returns all contacts
     */
    async get(param = {}){
        await this.precheck();
        return this.db.get(param);
    }

    /**
     * add - add contact to database
     * @param {string} name
     * @param {string} phone 
     */
    async add(name, phone){
        await this.precheck();
        // check if contact already exists with that phone number
        const params = { phone };
        const exist = await this.get(params);
        if(exist.length > 0){
            // when already exists return empty array
            return [];
        }

        // else insert contact to database 
        const response = await this.db.add({phone, name});
        return response;
    }

    /**
     * remove - delete contact from database
     * @param {string} phone 
     */
    async remove(phone){
        await this.precheck();
        const params = { phone };
        const response = await this.db.delete(params);
        return response;
    }

    /**
     * Remove database
     */
    async removeDatabase(){
        await fs.unlinkSync(DATABASE_NAME);
        return fs.closeSync(fs.openSync(DATABASE_NAME, 'w'))

    }

}

module.exports = new database();