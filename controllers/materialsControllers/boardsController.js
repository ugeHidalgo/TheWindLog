(function (boardsController) {

    var userData = require('../../data/userData'),
        boardData = require('../../data/materials/boardData'),
        auth = require('../../auth');

    boardsController.init = function (app) {

        app.get ('/materials/boards/:userName', auth.ensureAuthenticated, function (req, res) {

            var userName = req.params.userName;

            userData.getUser ( userName, function(error, user){
                if (error){
                    response.send(400, error);
                } else {
                    res.render ('materials/boards/boards', { title: '', user: user });
                 }
            });
        });

        app.get ('/boardEditor/:userName/:boardId', auth.ensureAuthenticated, function (req, res) {

            var userName = req.params.userName,
                boardId = req.params.boardId;


            userData.getUser ( userName, function(error, user){
                if (error){
                    response.send(400, error);
                } else {
                    //Todo load board data
                    boardData.getBoardById ( userName, boardId, function(error, board){
                        if (error){
                            response.send(400, error);
                        } else {
                            res.render ('materials/boards/boardsEditor', { title: '', user: user, board: board });
                        }
                    });
                 }
            });
        });


        app.get('/api/boards/:userName', auth.ensureApiAuthenticated, function(request, response){

            var userName = request.params.userName;

            boardData.getBoards ( userName, function(error, boards){
                if (error){
                    response.send(400, error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(boards);
                 }
            });
        });

    };

})(module.exports);