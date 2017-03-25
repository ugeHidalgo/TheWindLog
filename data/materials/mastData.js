(function (mastData){
    mastData.init = function (app) {

        var mongoose = require ('mongoose'),
            Mast = require ('../../models/mast');

        mastData.getMasts = function (username, callbackFn) {
             Mast.find({username:username}, callbackFn);
        };

        mastData.getMastById = function (username, mastId, callbackFn) {
             Mast.findOne({username:username, _id: mastId}, callbackFn);
        };

        mastData.updateMast = function (mast, callbackFn) {
            var updatedValues = {};

            if (mast._id) {
                //Update existing mast.
                updatedValues = {
                    name: mast.name,
                    model: mast.model,
                    brand: mast.brand,
                    carbon: mast.carbon,
                    length: mast.length,
                    imcs: mast.imcs,
                    type: mast.type,
                    year: mast.year,
                    purchase: mast.purchase,
                    price: mast.price,
                    secondHand: mast.secondHand,
                    active: mast.active,
                    updated: mast.updated,
                    comment: mast.comment
                };

                Mast.findOneAndUpdate(
                {_id: mast._id}, 
                { $set: updatedValues },
                function (error){
                    if (error){
                        callbackFn(error, null);
                    } else {
                        console.log ('Mast data updated -->username = ' + mast.username + ' /id = ' + mast._id);
                        callbackFn(null, mast)
                    }
                });
            } else {
                //Create new mast.
                var newMast = new Mast(mast);

                newMast.save(function (error) {
                    if (error) {
                        callbackFn(error, null);
                    } else {
                        console.log ('New mast saved ----->username = ' + newMast.username + ' /id = ' + newMast._id);
                        callbackFn(null, newMast)
                    }
                });
            }
        };
    };

})(module.exports);