(function (spotsController) {

    var userData = require('../data/userData'),
        auth = require('../auth');

    spotsController.init = function (app) {

        app.get ('/spots/:userName', auth.ensureAuthenticated, function (req, res) {

            var userName = req.params.userName;

            userData.getUser ( userName, function(error, user){
                if (error){
                    response.send(400, error);
                } else {
                    res.render ('spots/spots', { title: '', user: user });
                 }
            });
        });

    };

})(module.exports);