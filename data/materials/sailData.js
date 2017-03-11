(function (sailData){
    sailData.init = function (app) {

        var mongoose = require ('mongoose'),
            Sail = require ('../../models/sail');

        sailData.getBoards = function (username, callbackFn) {
             Sail.find({username:username}, callbackFn);
        };

        sailData.getSailById = function (username, sailId, callbackFn) {
             Sail.findOne({username:username, _id: sailId}, callbackFn);
        };
    };

})(module.exports);