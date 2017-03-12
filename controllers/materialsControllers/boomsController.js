(function (boomsController) {

    var userData = require('../../data/userData'),
        auth = require('../../auth');

    boomsController.init = function (app) {

        app.get ('/materials/booms/:userName', auth.ensureAuthenticated, function (req, res) {

            res.render ('materials/booms', { title: '', user: req.user });
        });

    };

})(module.exports);