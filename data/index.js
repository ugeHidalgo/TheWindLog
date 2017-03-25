(function (data){

    var UserData = require ('./userData'),
        BoardData = require ('./materials/boardData');
        SailData = require ('./materials/sailData');
        MastData = require ('./materials/mastData');
        BoomData = require ('./materials/boomData');
        SeedTools = require ('./seedTools');

    UserData.init();
    BoardData.init();
    SailData.init();
    MastData.init();
    BoomData.init();    
    SeedTools.seedDataBase();

})(module.exports);