(function (sailsController) {

    var userData = require('../../data/userData'),
        sailData = require('../../data/materials/sailData'),  
        auth = require('../../auth');

    sailsController.init = function (app) {

        app.get ('/materials/sails/:userName', auth.ensureAuthenticated, function (req, res) {

            var userName = req.params.userName;

            userData.getUser ( userName, function(error, user){
                if (error){
                    response.send(400, error);
                } else {
                    res.render ('materials/sails/sails', { title: '', user: user });
                 }
            });
        });

        app.get('/api/sails/:userName', auth.ensureApiAuthenticated, function(request, response){

            var userName = request.params.userName;

            sailData.getSails ( userName, function(error, sails){
                if (error){
                    response.send(400, error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(sails);
                 }
            });
        });

    };

})(module.exports);