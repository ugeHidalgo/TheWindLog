(function (mastsController) {

    var data = require('../../data'),
        auth = require('../../auth');

    mastsController.init = function (app) {

        app.get ('/materials/masts/:userName', auth.ensureAuthenticated, function (req, res) {

            var userName = req.params.userName;

            data.getUser ( userName, function(error, user){
                if (error){
                    response.send(400, error);
                } else {
                    res.render ('materials/masts/masts', { title: '', user: user });
                 }
            });
        });

    };

})(module.exports);