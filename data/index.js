(function (data){

    var UserData = require ('./userData'),
        BoardData = require ('./materials/boardData');
        SailData = require ('./materials/sailData');
        MastData = require ('./materials/mastData');
        SeedTools = require ('./seedTools');

    UserData.init();
    BoardData.init();
    SailData.init();
    MastData.init();
    SeedTools.seedDataBase();

})(module.exports);