(function (boardsController) {

    var userData = require('../../data/userData'),
        boardData = require('../../data/materials/boardData'),
        auth = require('../../auth');

    boardsController.init = function (app) {

        app.get ('/materials/boards', auth.ensureAuthenticated, function (req, res) {

            res.render ('materials/boards/boards', { title: '' });
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

        app.get ('/api/boards/:userName/:boardId', auth.ensureAuthenticated, function (request, response) {

            var userName = request.params.userName,
                boardId = request.params.boardId;


            userData.getUser ( userName, function(error, user){
                if (error){
                    response.send(400, error);
                } else {
                    //Todo load board data
                    boardData.getBoardById ( userName, boardId, function(error, board){
                        if (error){
                            response.send(400, error);
                        } else {
                            response.set('Content-Type','application/json');
                            response.send(board);
                        }
                    });
                 }
            });
        });

    };

})(module.exports);