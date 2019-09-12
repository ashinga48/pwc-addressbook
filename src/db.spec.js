const assert = require('assert')
var expect = require('expect.js');

describe('CSV Database Test Suite', () => {
  /** Load Database */
  const db = require('./db');
  (async () => {
      db.load();
  })();

  /** 
   * Test Suite testing DB CRUD operations
   */
  describe('CRUD operations ', () => {

    // Add sample record
    it ('Adding Sample Record name-John, phone-0455667788', function() {
      return new Promise(function (resolve) {
        db.add('John', '0455667788')
           .then(function(result) {
              assert.ok(result);
              expect(result).to.be.an(Array);
              resolve();
           });
      });
    })

    // Get all contacts
    it ('Get all contacts', function() {
      return new Promise(function (resolve) {
        db.getAll()
           .then(function(result) {
              assert.ok(result);
              expect(result).to.be.an(Array);
              resolve();
           });
      });
    })

    // Get contact with phone-0455667788 
    it ('Get contact with phone-0455667788 ', function() {
      return new Promise(function (resolve) {
        db.get({ phone : '0455667788'})
           .then(function(result) {
              assert.ok(result);
              expect(result).to.be.an(Array);
              expect(result).to.not.have.length(0);
              resolve();
           });
      });
    })

    // Delete contact with phone-0455667788 
    it ('Delete contact with phone-0455667788 ', function() {
      return new Promise(function (resolve) {
        db.remove('0455667788')
           .then(function(result) {
              assert.ok(result);
              expect(result).to.be.an(Array);
              expect(result).to.not.have.length(0);
              resolve();
           });
      });
    })

  })


});