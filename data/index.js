(function (data){

    var //mongoose = require ('mongoose'),
        UserData = require ('./userData'),
        SeedTools = require ('./seedTools');

    UserData.init();
    SeedTools.seedDataBase();

})(module.exports);