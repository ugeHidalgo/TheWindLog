(function (controllers){
    var homeController = require ('./homeController'),
        userController = require ('./userController'),
        sessionsController = require ('./sessionsController');

    controllers.init = function (app) {
        homeController.init(app);
        userController.init(app);
        sessionsController.init(app);
    };

})(module.exports);