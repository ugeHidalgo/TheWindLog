(function (userController) {

    var data = require('../data'),
        auth = require('../auth');

    userController.init = function (app) {

        app.get ('/login/userProfile/:userName', auth.ensureAuthenticated, function (req, res){

            var userName = req.params.userName;
            res.render ('login/userProfile', { title: userName, user: req.user });
        });


        app.get('/api/user/:userName', auth.ensureApiAuthenticated, function(request, response){

            var userName = request.params.userName;

            data.getUser ( userName, function(error, user){
                if (error){
                    response.send(400, error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(user);
                 }
            });
        });
    };

})(module.exports);