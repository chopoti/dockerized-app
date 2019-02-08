'use strict';

const Boom = require('boom');
const rq = require('request-promise')
const {db} = require('../conn');
/**
 * Operations on /consumeotherservice
 */
module.exports = {
    /**
     * summary: returns all names
     * description: Returns all names

     * parameters: searchString, skip, limit
     * produces: application/json
     * responses: 200, 400, 401, 403, 404, 409, 500
     */
    get:async function getNames(request, h) {
        const options = {
            method: 'GET',
            uri: "http://localhost:1080/name"
          }
          const getProvider = function () {
         return rq(options)
        
        };

        let nameFromDb =  ()=>{
            return db('names').select('*')
        }

        try {
            let _nameFromDab = await nameFromDb();
            let _provider = await getProvider();
            var _providerArray = JSON.parse(_provider)
            return nameFromDb;
         
        }
        catch (ex) {
           console.error(ex);
        }
    }
};
