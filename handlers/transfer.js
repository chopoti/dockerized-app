'use strict';

const Boom = require('boom');
const {db} = require('../conn');
const Wreck = require('wreck');
const rq = require('request-promise')

/**
 * Operations on /transfer
 */
module.exports = {
    /**
     * summary: Transfer fund
     * description: Transfer fund from 1 DFSP to Another
     * parameters: identifierType, transferDetails
     * produces: application/json
     * responses: 200, 400, 401, 403, 404, 409, 500
     */
    post:async function postTransacion(request, h) {
        let identifier = request.query.identifierType;
        let identifierArray = identifier.split(':')
        let {payerFsp, transferId, amount, currency } = request.payload;
  
        if(identifierArray[0]== 'msisdn'){
            console.log('Your Identified is MSISDN, then we proceed as Mobile Money Transaction')
            console.log('Lets Check if Exist into our Database (This is Payer DFSP)')

            let chechCustomer = ()=>{

               return db('dfsp1customer').select('*').where('msisdn',identifierArray[1])
            }

            let checkCustomerResult
            try {
                checkCustomerResult =await chechCustomer()
            } catch (error) {
                console.log(error)
            }
                    
            if (checkCustomerResult === undefined || checkCustomerResult.length == 0) {
                // Customer does not exist to Our DB

                const options = {
                    method: 'GET',
                    uri: "http://localhost:8000/v1/provider?msisdn=" + identifierArray[1]
                  }
                  const getProvider = function () {
                 return rq(options)
                
                };

                try {
                    let _provider = await getProvider();
                    var _providerArray = JSON.parse(_provider)
                    console.log(`This is Customer country : ${_providerArray[0].countryCode}, Customer Proviced : ${_providerArray[0].dfspName}`)
                    let transferObject = {
                        fromParty: 'DFSP1',
                        fromAcc: payerFsp,
                        transferId: transferId,
                        amount: amount,
                        currency: currency,
                        toParty: _providerArray[0].dfspName,
                        toAcc: identifierArray[1]
                        }

                        let doTransfer = ()=>{
                           return db('dfsp2transaction').insert(transferObject)
                        }

                        try {
                           await  doTransfer()
                            console.log('Transaction processed successly on DFSP2')
                            return 'Transaction processed successly on DFSP2'
                        } catch (error) {
                            console.log(error)
                        }
                 
                }
                catch (ex) {
                   console.error(ex);
                }
                return "Customer Doesnt Exist"
            }

            if (checkCustomerResult !== undefined || checkCustomerResult.length != 0) {
                // Customer does exist to our DB
                console.log("Customer Exist to Our Database")
                let transferObject = {
                    fromParty: 'DFSP1',
                    fromAcc: payerFsp,
                    transferId: transferId,
                    amount: amount,
                    currency: currency,
                    toParty: 'DFSP1',
                    toAcc: identifierArray[1]
                    
                    }
                let doTransfer = ()=>
                {
                   return db('dfsp1transaction').insert(transferObject)
                }
                try {
                    let _doTransfer = await doTransfer()
                    console.log('Transaction processed successly on DFSP1')
                    return 'Transaction processed successly on DFSP1'
                } catch (error) {
                    console.log(error)
                }

                return "Transaction Processed Successfully"
            }
            
        }
        

        return Boom.notImplemented();
    }
};
