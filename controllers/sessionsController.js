(function (sessionsController) {

    var userData = require('../data/userData'),
        auth = require('../auth');

    sessionsController.init = function (app) {

        app.get ('/sessions/:userName', auth.ensureAuthenticated, function (req, res) {

            res.render ('sessions/sessions', { title: '', user: req.user });
        });

    };

})(module.exports);