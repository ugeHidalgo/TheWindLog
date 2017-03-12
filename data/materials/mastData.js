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
    };

})(module.exports);