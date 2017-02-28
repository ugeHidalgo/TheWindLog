(function (controllers){
    var homeController = require ('./homeController'),
        userController = require ('./userController'),
        sessionsController = require ('./sessionsController'),
        spotsController = require ('./spotsController'),
        boardsController = require ('./materialsControllers/boardsController');

    controllers.init = function (app) {
        homeController.init(app);
        userController.init(app);
        sessionsController.init(app);
        spotsController.init(app);
        boardsController.init(app);
    };

})(module.exports);