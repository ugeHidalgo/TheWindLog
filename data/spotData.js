(function (spotData){
    spotData.init = function (app) {

        var mongoose = require ('mongoose'),
            Spot = require ('../models/spot');

        spotData.getSpots = function (username, callbackFn) {
             Spot.find({username:username}, callbackFn);
        };

        spotData.getSpotById = function (username, spotId, callbackFn) {
             Spot.findOne({username:username, _id: spotId}, callbackFn);
        };

        spotData.updateSpot = function (spot, callbackFn) {
            var updatedValues = {};

            if (spot._id) {
                //Update existing spot.
                updatedValues = {
                    name: spot.name,
                    city: spot.city,
                    province: spot.province,
                    country: spot.country,
                    lat: spot.lat,
                    long: spot.long,
                    active: spot.active,
                    updated: spot.updated,
                    comment: spot.comment
                };

                Spot.findOneAndUpdate(
                {_id: spot._id}, 
                { $set: updatedValues },
                function (error){
                    if (error){
                        callbackFn(error, null);
                    } else {
                        console.log ('Spot data updated -->username = ' + spot.username + ' /id = ' + spot._id);                        
                        callbackFn(null, spot)
                    }
                });
            } else {
                //Create new spot.
                var newSpot = new Spot(spot);

                newSpot.save(function (error) {
                    if (error) {
                        callbackFn(error, null);
                    } else {
                        console.log ('New spot saved ----->username = ' + newSpot.username + ' /id = ' + newSpot._id);
                        callbackFn(null, newSpot);
                    }
                });
            }
        };
    };

})(module.exports);