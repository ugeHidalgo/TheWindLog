(function (data){

    var UserData = require ('./userData'),
        BoardData = require ('./materials/boardData');
        SailData = require ('./materials/sailData');
        MastData = require ('./materials/mastData');
        BoomData = require ('./materials/boomData');
        SpotData = require ('./spotData');   
        SessionData = require ('./sessionData');     
        SeedTools = require ('./seedTools');

    UserData.init();
    BoardData.init();
    SailData.init();
    MastData.init();
    BoomData.init();    
    SpotData.init();  
    SessionData.init();  
    SeedTools.seedDataBase();

})(module.exports);