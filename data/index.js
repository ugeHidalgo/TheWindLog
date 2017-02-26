(function (data){
    var seedData = require ('./seedData'),
        mongoose = require ('mongoose'),
        Board = require ('../models/board'),
        User = require ('../models/user'),
        Sail = require ('../models/sail'),
        hasher = require ('../auth/hasher');

    data.addUser = function (user, callbackFn) {
        var newUser = new User(user);

        newUser.save(function (error) {
            if (error) {
                callbackFn(error);
            } else {
                callbackFn(null)
            }
        });
    };

    data.updateUser = function (user, callbackFn) {
        var updatedValues = {};

        if (user.password.length>0) {
            updatedValues = {
                name: user.name,
                email: user.email,
                passwordHash: hasher.computeHash(user.password, user.salt),
                salt: user.salt
            };
        } else {
            updatedValues = {
                name: user.name,
                email: user.email
            };
        }
        User.findOneAndUpdate(
            {username: user.username}, 
            { $set: updatedValues },
            function (error){
                if (error){
                    callbackFn(error);
                } else {
                    callbackFn(null)
                }
            });
    };

    data.getUser = function (username, callbackFn) {
        User.findOne({username:username}, callbackFn);
    };

    data.usedUsername = function (username, callbackFn) {
        User.findOne({username:username}, callbackFn );
    };

    function seedDataBase () {

        User.find ({username: 'ugeHidalgo'}, function(error, users) {
            if (error){
                console.log ('Failed to count users in database: ' + error);
            } else {
                seedUsersData(users);
            }
        });

        Board.find ({username: 'ugeHidalgo'}, function(error, boards) {
            if (error){
                console.log ('Failed to count boards in database: ' + error);
            } else {
                seedBoardsData(boards);
            }
        });

        Sail.find ({username: 'ugeHidalgo'}, function(error, sails) {
            if (error){
                console.log ('Failed to count sails in database: ' + error);
            } else {
                seedSailsData(sails);
            }
        });
    };

    function seedUsersData (users) {
        var newUser;

        if (users.length === 0) {
                    console.log ('Seeding users data into database.');
                    seedData.initialUsers.forEach (function (user) {
                        newUser = new User(user);
                        newUser.save(function (error){
                            if (error){
                                console.log ('Failed to insert user in database: ' + error);
                            }
                        });
                    });
                } else {
                    console.log ('Users database already seeded.');
                }
    };

    function seedBoardsData (boards) {
        var newBoard;

        if (boards.length===0) {
                    console.log ('Seeding boards data into database.');
                    seedData.initialBoards.forEach (function (board) {
                        newBoard = new Board(board);
                        newBoard.save(function (error){
                            if (error){
                                console.log ('Failed to insert board in database: ' + error);
                            }
                        });
                    });
                } else {
                    console.log ('Boards database already seeded.');
                }
    };

    function seedSailsData (sails) {
        var newSail;

        if (sails.length===0) {
                    console.log ('Seeding sails data into database.');
                    seedData.initialSails.forEach (function (sail) {
                        newSail = new Sail(sail);
                        newSail.save(function (error){
                            if (error){
                                console.log ('Failed to insert sail in database: ' + error);
                            }
                        });
                    });
                } else {
                    console.log ('Sails database already seeded.');
                }
    };

    seedDataBase();

})(module.exports);