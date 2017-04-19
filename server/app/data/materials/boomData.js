(function (boomData){
    boomData.init = function (app) {

        var mongoose = require ('mongoose'),
            Boom = require ('../../models/boom');

        boomData.getBooms = function (username, callbackFn) {
             Boom.find({username:username}, callbackFn);
        };

        boomData.getBoomById = function (username, boomId, callbackFn) {
             Boom.findOne({username:username, _id: boomId}, callbackFn);
        };

        boomData.updateBoom = function (boom, callbackFn) {
            var updatedValues = {};

            if (boom._id) {
                //Update existing boom.
                updatedValues = {
                    name: boom.name,
                    model: boom.model,
                    brand: boom.brand,
                    type: boom.type,
                    maxLength: boom.maxLength,
                    minLength: boom.minLength,
                    year: boom.year,
                    purchase: boom.purchase,
                    price: boom.price,
                    secondHand: boom.secondHand,
                    active: boom.active,
                    updated: boom.updated,
                    comment: boom.comment
                };

                Boom.findOneAndUpdate(
                {_id: boom._id}, 
                { $set: updatedValues },
                function (error){
                    if (error){
                        callbackFn(error, null);
                    } else {
                        console.log ('Boom data updated -->username = ' + boom.username + ' /id = ' + boom._id);                        
                        callbackFn(null, boom)
                    }
                });
            } else {
                //Create new boom.
                var newBoom = new Boom(boom);

                newBoom.save(function (error) {
                    if (error) {
                        callbackFn(error, null);
                    } else {
                        console.log ('New boom saved ----->username = ' + newBoom.username + ' /id = ' + newBoom._id);
                        callbackFn(null, newBoom);
                    }
                });
            }
        };
    };

})(module.exports);