const request = require('request')
const assert = require('assert')
var expect = require('expect.js')

const endpoint = 'http://localhost:8080/';

var throwRequestError = (e) => {
  switch(e.code){
    case 'ECONNREFUSED': 
      throw 'Error : Connection Reset '+endpoint;
      break;
    default:
      throw 'Error running request on '+endpoint;
  }
}

describe('Rest API Tests', () => {

  describe('Home Route', (done) => {
    it('should return array of contacts!', (done) => {

      // make the request
      request.get({
        uri: endpoint
      }, (e, resp, body) => {

        // throw an error if e
        if(e){
          throwRequestError(e);
        }

        // check response status code == 200
        assert.equal(resp.statusCode, 200);
        try{
          // response is ideally an array of objects
          const data = JSON.parse(body);
          expect(data).to.be.an(Array);
          done();
        }
        catch(e){
          throw 'Error in response '+e.message;
        }
      });

    })
  })

  /**
   * Sample input data of address book
   */
  describe('Add Contact (/insert) route', (done) => {
    
    const inputData = { phone: "+61434242334", name: 'Phil' }

    it('should return an array of inserted data', (done) => {
      // make the request
      request.post({
        uri: endpoint+'insert',
        json: inputData
      }, (e, resp, body) => {

        // throw an error if e
        if(e){
          throwRequestError(e);
        }
        
        assert.equal(resp.statusCode, 200)
        expect(body).to.be.an(Array);
        done();
      });
    });

  })

})