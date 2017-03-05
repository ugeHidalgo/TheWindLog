(function (data){

    var //mongoose = require ('mongoose'),
        UserData = require ('./userData'),
        BoardData = require ('./materials/boardData');
        SeedTools = require ('./seedTools');

    UserData.init();
    BoardData.init();
    SeedTools.seedDataBase();

})(module.exports);