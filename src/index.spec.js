const request = require('request')
const assert = require('assert')

const endpoint = 'http://localhost:8080/';

describe('Route Tests', () => {

  describe('Home Route', (done) => {
    it('should return an string Running!', (done) => {

      request.get({
        uri: endpoint
      }, (e, resp, body) => {
        assert.equal(resp.statusCode, 200)

        assert.equal(body, 'Running!');

        done();
      });

    })
  })


  describe('Add Address book route', (done) => {

    /**
     * Sample input data of address book
     */
    const inputData = {
        records: [
            { number: "+61434242334", name: 'Phil' },
            { number: "+61467345756", name: 'Amei' },
        ]
    };

    it('should return same data posted to /add', (done) => {
      request.post({
        uri: endpoint+'add',
        json: inputData
      }, (e, resp, body) => {
        assert.equal(resp.statusCode, 200)
        
        // compare response with the posted values.
        assert.equal(body.records[0].number, inputData.records[0].number)
        assert.equal(body.records[1].number, inputData.records[1].number)

        done();
      });
    });

  })

})