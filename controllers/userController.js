(function (userController) {

    var data = require('../data'),
        auth = require('../auth');

    userController.init = function (app) {

        app.get ('/login/userProfile/:userName', auth.ensureAuthenticated, function (req, res) {

            var userName = req.params.userName;

            data.getUser ( userName, function(error, user){
                if (error){
                    response.send(400, error);
                } else {
                    res.render ('login/userProfile', { title: userName, user: user });
                 }
            });
        });

         app.post('/login/userProfile/:userName', auth.ensureAuthenticated, function (req, res) {

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


        app.post('/api/user/:userName', auth.ensureApiAuthenticated, function(request, response){

            var userName = request.params.userName,
                userToUpdate =  request.body;

            data.updateUser ( userToUpdate, function(error){
                 if (error){
                    response.status(400).send('Failed to update user: ' + userName);
                } else {
                    response.set('Content-Type','application/json');
                    response.status(201).send(userToUpdate);
                 }
            });
        });
    };

})(module.exports);