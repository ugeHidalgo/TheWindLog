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
    };

})(module.exports);