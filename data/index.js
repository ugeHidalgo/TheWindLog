(function (data){

    var //mongoose = require ('mongoose'),
        UserData = require ('./userData'),
        BoardData = require ('./materials/boardData');
        SailData = require ('./materials/sailData');
        SeedTools = require ('./seedTools');

    UserData.init();
    BoardData.init();
    SailData.init();
    SeedTools.seedDataBase();

})(module.exports);