(function (boardsController) {

    var boardData = require('../../data/materials/boardData'),
        auth = require('../../auth');

    boardsController.init = function (app) {

        app.get ('/materials/boards', auth.ensureAuthenticated, function (req, res) {

            res.render ('materials/boards', { title: '', user: req.user });
        });

        app.get('/api/boards/:userName', auth.ensureApiAuthenticated, function(request, response){

            var userName = request.params.userName;

            boardData.getBoards ( userName, function(error, boards){
                if (error){
                    response.status(400).send(error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(boards);
                 }
            });
        });

        app.get ('/api/boards/:userName/:boardId', auth.ensureAuthenticated, function (request, response) {

            var userName = request.params.userName,
                boardId = request.params.boardId;
            
            boardData.getBoardById ( userName, boardId, function(error, board){
                if (error){
                    response.status(400).send(error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(board);
                }
            });
        });

        app.post('/api/boards', auth.ensureApiAuthenticated, function(request, response){

            var boardToUpdate =  request.body;

            boardData.updateBoard ( boardToUpdate, function(error, updatedBoard){
                 if (error){
                    response.status(400).send('Failed to save board: ' + boardToUpdate.name);
                } else {
                    response.set('Content-Type','application/json');
                    response.status(201).send(updatedBoard);
                 }
            });
        });
    };

})(module.exports);