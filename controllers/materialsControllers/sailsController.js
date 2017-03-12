(function (sailsController) {

    var userData = require('../../data/userData'),
        sailData = require('../../data/materials/sailData'),  
        auth = require('../../auth');

    sailsController.init = function (app) {

        app.get ('/materials/sails/:userName', auth.ensureAuthenticated, function (req, res) {

            res.render ('materials/sails', { title: '', user: req.user });            
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