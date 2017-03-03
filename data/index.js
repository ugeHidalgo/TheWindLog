(function (data){
    var seedData = require ('./seedData'),
        mongoose = require ('mongoose'),
        Board = require ('../models/board'),
        User = require ('../models/user'),
        Sail = require ('../models/sail'),
        Mast = require ('../models/mast'),
        Boom = require ('../models/boom'),
        Spot = require ('../models/spot'),
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

        Mast.find ({username: 'ugeHidalgo'}, function(error, masts) {
            if (error){
                console.log ('Failed to count masts in database: ' + error);
            } else {
                seedMastsData(masts);
            }
        });

        Boom.find ({username: 'ugeHidalgo'}, function(error, booms) {
            if (error){
                console.log ('Failed to count booms in database: ' + error);
            } else {
                seedBoomsData(booms);
            }
        });

        Spot.find ({username: 'ugeHidalgo'}, function(error, spots) {
            if (error){
                console.log ('Failed to count spots in database: ' + error);
            } else {
                seedSpotsData(spots);
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

    function seedMastsData (masts) {
        var newMast;

        if (masts.length===0) {
                    console.log ('Seeding masts data into database.');
                    seedData.initialMasts.forEach (function (mast) {
                        newMast = new Mast(mast);
                        newMast.save(function (error){
                            if (error){
                                console.log ('Failed to insert mast in database: ' + error);
                            }
                        });
                    });
                } else {
                    console.log ('Masts database already seeded.');
                }
    };

    function seedBoomsData (booms) {
        var newBoom;

        if (booms.length===0) {
                    console.log ('Seeding booms data into database.');
                    seedData.initialBooms.forEach (function (boom) {
                        newBoom = new Boom(boom);
                        newBoom.save(function (error){
                            if (error){
                                console.log ('Failed to insert boom in database: ' + error);
                            }
                        });
                    });
                } else {
                    console.log ('Booms database already seeded.');
                }
    };

    function seedSpotsData (spots) {
        var newSpot;

        if (spots.length===0) {
                    console.log ('Seeding spots data into database.');
                    seedData.initialSpots.forEach (function (spot) {
                        newSpot = new Spot(spot);
                        newSpot.save(function (error){
                            if (error){
                                console.log ('Failed to insert spot in database: ' + error);
                            }
                        });
                    });
                } else {
                    console.log ('Spots database already seeded.');
                }
    };

    seedDataBase();

})(module.exports);