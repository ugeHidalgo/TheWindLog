(function (homeController){
    homeController.init = function (app) {

        var data = require ('../data'),
            auth = require ('../auth');

        app.get ('/', function (request, response){

            response.render ('index', {
                    user: request.user
            });
        });
    };
})(module.exports);