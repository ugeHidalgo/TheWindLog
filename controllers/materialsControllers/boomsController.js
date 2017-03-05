(function (boomsController) {

    var userData = require('../../data/userData'),
        auth = require('../../auth');

    boomsController.init = function (app) {

        app.get ('/materials/booms/:userName', auth.ensureAuthenticated, function (req, res) {

            var userName = req.params.userName;

            userData.getUser ( userName, function(error, user){
                if (error){
                    response.send(400, error);
                } else {
                    res.render ('materials/booms/booms', { title: '', user: user });
                 }
            });
        });

    };

})(module.exports);