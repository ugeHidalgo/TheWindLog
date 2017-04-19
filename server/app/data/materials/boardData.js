(function (boardData){
    boardData.init = function (app) {

        var mongoose = require ('mongoose'),
            Board = require ('../../models/board');

        boardData.getBoards = function (username, callbackFn) {
             Board.find({username:username}, callbackFn);
        };

        boardData.getBoardById = function (username, boardId, callbackFn) {
             Board.findOne({username:username, _id: boardId}, callbackFn);
        };

        boardData.updateBoard = function (board, callbackFn) {
            var updatedValues = {};

            if (board._id) {
                //Update existing board.
                updatedValues = {
                    name: board.name,
                    model: board.model,
                    brand: board.brand,
                    volume: board.volume,
                    length: board.length,
                    width: board.width,
                    year: board.year,
                    purchase: board.purchase,
                    price: board.price,
                    secondHand: board.secondHand,
                    active: board.active,
                    updated: board.updated,
                    comment: board.comment
                };

                Board.findOneAndUpdate(
                {_id: board._id}, 
                { $set: updatedValues },
                function (error){
                    if (error){
                        callbackFn(error, null);
                    } else {
                        console.log ('Board data updated -->username = ' + board.username + ' /id = ' + board._id);                        
                        callbackFn(null, board)
                    }
                });
            } else {
                //Create new board.
                var newBoard = new Board(board);

                newBoard.save(function (error) {
                    if (error) {
                        callbackFn(error, null);
                    } else {
                        console.log ('New board saved ----->username = ' + newBoard.username + ' /id = ' + newBoard._id);
                        callbackFn(null, newBoard);
                    }
                });
            }
        };
    };

})(module.exports);