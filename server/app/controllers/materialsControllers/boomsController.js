(function (boomsController) {

    var boomData = require('../../data/materials/boomData'),
        auth = require('../../auth');

    boomsController.init = function (app) {

        app.get ('/materials/booms', auth.ensureAuthenticated, function (req, res) {

            res.render ('materials/booms', { title: '', user: req.user });
        });

        app.get ('/materials/booms/:userName', auth.ensureAuthenticated, function (req, res) {

            res.render ('materials/booms', { title: '', user: req.user });
        });

        app.get('/api/booms/:userName', auth.ensureApiAuthenticated, function(request, response){

            var userName = request.params.userName;

            boomData.getBooms ( userName, function(error, booms){
                if (error){
                    response.status(400).send(error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(booms);
                 }
            });
        });

        app.get ('/api/booms/:userName/:boomId', auth.ensureAuthenticated, function (request, response) {

            var userName = request.params.userName,
                boomId = request.params.boomId;
            
            boomData.getBoomById ( userName, boomId, function(error, boom){
                if (error){
                    response.status(400).send(error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(boom);
                }
            });
        });

        app.post('/api/booms', auth.ensureApiAuthenticated, function(request, response){

            var boomToUpdate =  request.body;

            boomData.updateBoom ( boomToUpdate, function(error, updatedBoom){
                 if (error){
                    response.status(400).send('Failed to save boom: ' + boomToUpdate.name);
                } else {
                    response.set('Content-Type','application/json');
                    response.status(201).send(updatedBoom);
                 }
            });
        });

    };

})(module.exports);