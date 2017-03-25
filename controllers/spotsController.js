(function (spotsController) {

    var spotData = require('../data/spotData'),
        auth = require('../auth');

    spotsController.init = function (app) {

        app.get ('/spots', auth.ensureAuthenticated, function (req, res) {

            res.render ('spots', { title: '', user: req.user });
        });

        app.get('/api/spots/:userName', auth.ensureApiAuthenticated, function(request, response){

            var userName = request.params.userName;

            spotData.getSpots ( userName, function(error, spots){
                if (error){
                    response.status(400).send(error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(spots);
                 }
            });
        });

        app.get ('/api/spots/:userName/:spotId', auth.ensureAuthenticated, function (request, response) {

            var userName = request.params.userName,
                spotId = request.params.spotId;
            
            spotData.getSpotById ( userName, spotId, function(error, spot){
                if (error){
                    response.status(400).send(error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(spot);
                }
            });
        });

        app.post('/api/spots', auth.ensureApiAuthenticated, function(request, response){

            var spotToUpdate =  request.body;

            spotData.updateSpot ( spotToUpdate, function(error, updatedSpot){
                 if (error){
                    response.status(400).send('Failed to save spot: ' + spotToUpdate.name);
                } else {
                    response.set('Content-Type','application/json');
                    response.status(201).send(updatedSpot);
                 }
            });
        });

    };

})(module.exports);