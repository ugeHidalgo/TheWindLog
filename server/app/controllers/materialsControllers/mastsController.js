(function (mastsController) {

    var mastData = require('../../data/materials/mastData'),
        auth = require('../../auth');

    mastsController.init = function (app) {

        app.get ('/materials/masts', auth.ensureAuthenticated, function (req, res) {

            res.render ('materials/masts', { title: '', user: req.user });
        });

        app.get ('/materials/masts/:userName', auth.ensureAuthenticated, function (req, res) {
            
            res.render ('materials/masts', { title: '', user: req.user });
        });

        app.get('/api/masts/:userName', auth.ensureApiAuthenticated, function(request, response){

            var userName = request.params.userName;

            mastData.getMasts ( userName, function(error, masts){
                if (error){
                    response.status(400).send(error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(masts);
                 }
            });
        });

        app.get ('/api/masts/:userName/:mastId', auth.ensureAuthenticated, function (request, response) {

            var userName = request.params.userName,
                mastId = request.params.mastId;
            
            mastData.getMastById ( userName, mastId, function(error, mast){
                if (error){
                    response.status(400).send(error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(mast);
                }
            });
        });

        app.post('/api/masts', auth.ensureApiAuthenticated, function(request, response){

            var mastToUpdate =  request.body;

            mastData.updateMast ( mastToUpdate, function(error, updatedMast) {
                 if (error){
                    response.status(400).send('Failed to save mast: ' + mastToUpdate.name);
                } else {
                    response.set('Content-Type','application/json');
                    response.status(201).send(updatedMast);
                 }
            });
        });

    };

})(module.exports);