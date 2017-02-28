(function (boardsController) {

    var data = require('../../data'),
        auth = require('../../auth');

    boardsController.init = function (app) {

        app.get ('/materials/boards/:userName', auth.ensureAuthenticated, function (req, res) {

            var userName = req.params.userName;

            data.getUser ( userName, function(error, user){
                if (error){
                    response.send(400, error);
                } else {
                    res.render ('materials/boards/boards', { title: '', user: user });
                 }
            });
        });

    };

})(module.exports);