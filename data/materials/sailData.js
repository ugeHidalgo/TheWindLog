(function (sailData){
    'use strict;'

    sailData.init = function (app) {

        var mongoose = require ('mongoose'),
            Sail = require ('../../models/sail');

        sailData.getSails = function (username, callbackFn) {
             Sail.find({username:username}, callbackFn);
        };

        sailData.getSailById = function (username, sailId, callbackFn) {
             Sail.findOne({username:username, _id: sailId}, callbackFn);
        };

        sailData.updateSail = function (sail, callbackFn) {
            var updatedValues = {};

            if (sail._id) {
                updatedValues = {
                    name: sail.name,
                    model: sail.model,
                    brand: sail.brand,
                    size: sail.size,
                    length: sail.length,
                    mast: sail.mast,
                    boom: sail.boom,
                    adapter: sail.adapter,
                    imcs: sail.imcs,
                    year: sail.year,
                    purchase: sail.purchase,
                    price: sail.price,
                    secondHand: sail.secondHand,
                    active: sail.active,
                    updated: sail.updated,
                    comment: sail.comment
                };

                //Update existing sail.
                Sail.findOneAndUpdate(
                {_id: sail._id}, 
                { $set: updatedValues },
                function (error){
                    if (error){
                        callbackFn(error);
                    } else {
                        callbackFn(null)
                    }
                });
            } else {
                //Create new sail.
                var newSail = new Sail(sail);

                newSail.save(function (error) {
                if (error) {
                    callbackFn(error);
                } else {
                    callbackFn(null)
                }
            });
            }
            console.log ('Sail saved ----->username = ' + sail.username + ' /id = ' + sail._id);
        }

    };

})(module.exports);