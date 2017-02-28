(function (boomsController) {

    var data = require('../../data'),
        auth = require('../../auth');

    boomsController.init = function (app) {

        app.get ('/materials/booms/:userName', auth.ensureAuthenticated, function (req, res) {

            var userName = req.params.userName;

            data.getUser ( userName, function(error, user){
                if (error){
                    response.send(400, error);
                } else {
                    res.render ('materials/booms/booms', { title: '', user: user });
                 }
            });
        });

    };

})(module.exports);