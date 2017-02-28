(function (controllers){
    var homeController = require ('./homeController'),
        userController = require ('./userController'),
        sessionsController = require ('./sessionsController'),
        spotsController = require ('./spotsController'),
        boardsController = require ('./materialsControllers/boardsController'),
        sailsController = require ('./materialsControllers/sailsController'),
        mastsController = require ('./materialsControllers/mastsController'),
        boomsController = require ('./materialsControllers/boomsController');

    controllers.init = function (app) {
        homeController.init(app);
        userController.init(app);
        sessionsController.init(app);
        spotsController.init(app);
        boardsController.init(app);
        sailsController.init(app);
        mastsController.init(app);
        boomsController.init(app);
    };

})(module.exports);