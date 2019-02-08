'use strict';
var Mockgen = require('./mockgen.js');
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
     * operationId: getNames
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/consumeotherservice',
                operation: 'get',
                response: '200'
            }, callback);
        },
        400: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/consumeotherservice',
                operation: 'get',
                response: '400'
            }, callback);
        },
        401: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/consumeotherservice',
                operation: 'get',
                response: '401'
            }, callback);
        },
        403: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/consumeotherservice',
                operation: 'get',
                response: '403'
            }, callback);
        },
        404: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/consumeotherservice',
                operation: 'get',
                response: '404'
            }, callback);
        },
        409: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/consumeotherservice',
                operation: 'get',
                response: '409'
            }, callback);
        },
        500: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/consumeotherservice',
                operation: 'get',
                response: '500'
            }, callback);
        }
    }
};
