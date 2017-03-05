(function (boardData){
    boardData.init = function (app) {

        var mongoose = require ('mongoose'),
            Board = require ('../../models/board');
            //hasher = require ('../../auth/hasher');

        boardData.getBoards = function (username, callbackFn) {
             Board.find({username:username}, callbackFn);
        };

    };

})(module.exports);