(function (sessionsController) {

    var userData = require('../data/userData'),
        auth = require('../auth');

    sessionsController.init = function (app) {

        app.get ('/sessions/:userName', auth.ensureAuthenticated, function (req, res) {

            var userName = req.params.userName;

            userData.getUser ( userName, function(error, user){
                if (error){
                    response.send(400, error);
                } else {
                    res.render ('sessions/sessions', { title: '', user: user });
                 }
            });
        });

    };

})(module.exports);