(function (sailsController) {

    var //userData = require('../../data/userData'),
        sailData = require('../../data/materials/sailData'),  
        auth = require('../../auth');

    sailsController.init = function (app) {

        app.get ('/materials/sails', auth.ensureAuthenticated, function (req, res) {

            res.render ('materials/sails', { title: '', user: req.user });            
        });

        app.get('/api/sails/:userName', auth.ensureApiAuthenticated, function(request, response){

            var userName = request.params.userName;

            sailData.getSails ( userName, function(error, sails) {
                if (error){
                    response.status(400).send(error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(sails);
                 }
            });
        });

        app.get ('/api/sails/:userName/:sailId', auth.ensureAuthenticated, function (request, response) {

            var userName = request.params.userName,
                sailId = request.params.sailId;
            
            sailData.getSailById ( userName, sailId, function(error, sail) {
                if (error){
                    response.status(400).send(error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(sail);
                }
            });
        });

        app.post('/api/sails', auth.ensureApiAuthenticated, function(request, response){

            var sailToUpdate =  request.body;

            sailData.updateSail ( sailToUpdate, function(error){
                 if (error){
                    response.status(400).send('Failed to save sail: ' + sailToUpdate.name);
                } else {
                    response.set('Content-Type','application/json');
                    response.status(201).send(sailToUpdate);
                 }
            });
        });

    };

})(module.exports);