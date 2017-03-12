(function (spotsController) {

    var userData = require('../data/userData'),
        auth = require('../auth');

    spotsController.init = function (app) {

        app.get ('/spots/:userName', auth.ensureAuthenticated, function (req, res) {

            res.render ('spots/spots', { title: '', user: req.user });
        });

    };

})(module.exports);