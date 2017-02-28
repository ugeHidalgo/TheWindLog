(function (sailsController) {

    var data = require('../../data'),
        auth = require('../../auth');

    sailsController.init = function (app) {

        app.get ('/materials/sails/:userName', auth.ensureAuthenticated, function (req, res) {

            var userName = req.params.userName;

            data.getUser ( userName, function(error, user){
                if (error){
                    response.send(400, error);
                } else {
                    res.render ('materials/sails/sails', { title: '', user: user });
                 }
            });
        });

    };

})(module.exports);