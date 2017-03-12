(function (mastsController) {

    var userData = require('../../data/userData'),
        auth = require('../../auth');

    mastsController.init = function (app) {

        app.get ('/materials/masts/:userName', auth.ensureAuthenticated, function (req, res) {
            
            res.render ('materials/masts', { title: '', user: req.user });
        });

    };

})(module.exports);