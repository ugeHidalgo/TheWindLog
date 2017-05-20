(function (sessionsController) {

    var //userData = require('../data/userData'),
        sessionData = require('../data/sessionData'),
        auth = require('../auth');

    sessionsController.init = function (app) {

        app.get ('/sessions', auth.ensureAuthenticated, function (req, res) {

            res.render ('sessions', { title: '', user: req.user });
        });

        app.get('/api/sessions/:userName', auth.ensureApiAuthenticated, function(request, response){

            var userName = request.params.userName;

            sessionData.getSessions ( userName, function(error, sessions) {
                if (error){
                    response.status(400).send(error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(sessions);
                 }
            });
        });

        app.get('/api/sessionstotals/:userName', auth.ensureApiAuthenticated, function(request, response){

            var userName = request.params.userName;

            sessionData.getSessionsTotals ( userName, function(error, sessionsTotals) {
                if (error){
                    response.status(400).send(error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(sessionsTotals);
                 }
            });
        });

        app.get('/api/sessionstotalsbyspot/:userName', auth.ensureApiAuthenticated, function(request, response){

            var userName = request.params.userName;

            sessionData.getSessionsTotalsBySpot ( userName, function(error, sessionsTotalsBySpot) {
                if (error){
                    response.status(400).send(error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(sessionsTotalsBySpot);
                 }
            });
        });

        app.get ('/api/sessions/:userName/:sessionId', auth.ensureAuthenticated, function (request, response) {

            var userName = request.params.userName,
                sessionId = request.params.sessionId;
            
            sessionData.getSessionById ( userName, sessionId, function(error, session){
                if (error){
                    response.status(400).send(error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(session);
                }
            });
        });

        app.post('/api/sessions', auth.ensureApiAuthenticated, function(request, response){

            var sessionToUpdate =  request.body;

            sessionData.updateSession ( sessionToUpdate, function(error, updatedSession){
                 if (error){
                    response.status(400).send('Failed to save session: ' + sessionToUpdate.name);
                } else {
                    response.set('Content-Type','application/json');
                    response.status(201).send(updatedSession);
                 }
            });
        });

    };

})(module.exports);