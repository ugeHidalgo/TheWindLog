(function (data){
    var seedData = require ('./seedData'),
        mongoose = require ('mongoose'),
        Board = require ('../models/board'),
        User = require ('../models/user'),
        Sail = require ('../models/sail'),
        Mast = require ('../models/mast'),
        Boom = require ('../models/boom'),
        Spot = require ('../models/spot'),
        Session = require ('../models/session'),
        hasher = require ('../auth/hasher'),
        defaultUser = 'ugeHidalgo';

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

    data.seedSessionData = function (username, callbackFn) {
        console.log ('Seeding session data for ' + username);
        seedSessionsData();
    };

    function seedDataBase () {
        seedUsersData().then (function (){
            seedBoardsData().then (function (){
                seedSailsData().then (function (){
                    seedMastsData().then (function (){
                        seedBoomsData().then (function (){
                            seedSpotsData().then (function (){
                                //seedSessionsData();
                                console.log ('0 - All data seeded');
                            });
                        });
                    });
                });
            });
        });
    };

    function seedUsersData () {
        return new Promise (function (resolve, reject ){
             var users, newUser, itemsLeft;
             console.log ('1 - Checking if exist users data into database.');
             User.find ({username: defaultUser}, function(error, users) {
                if (error){
                    console.log ('Failed to count users in database: ' + error);
                } else {
                    if (users.length === 0) {
                        itemsLeft = seedData.initialUsers.length;
                        console.log ('Seeding users data into database.');
                        seedData.initialUsers.forEach (function (user) {
                            itemsLeft--;
                            newUser = new User(user);
                            newUser.save(function (error){
                                if (error){
                                    console.log ('Failed to insert user in database: ' + error);
                                    reject();
                                } else {
                                    console.log ('User added to database.');
                                    if (itemsLeft === 0){
                                        resolve();
                                    }
                                }
                            });
                        });
                    } else {
                        console.log ('Users database already seeded.');
                        resolve();
                    }
                }
             })
        });
    };

    function seedBoardsData () {
        return new Promise (function (resolve, reject ){
            var boards, newBoard, itemsLeft;

            console.log ('2 - Checking if exist boards data for user: ' + defaultUser);
            Board.find ({username: defaultUser}, function(error, boards) {
                if (error){
                    console.log ('Failed to count boards in database: ' + error);
                } else {
                    if (boards.length===0) {
                        itemsLeft = seedData.initialBoards.length;
                        console.log ('Seeding boards data into database.');
                        seedData.initialBoards.forEach (function (board) {
                            itemsLeft--;
                            newBoard = new Board(board);
                            newBoard.save(function (error){
                                if (error){
                                    console.log ('Failed to insert board in database: ' + error);
                                    reject();
                                } else {
                                    console.log ('Board added to database. ' + itemsLeft);
                                    if (itemsLeft === 0){
                                        resolve();
                                    }
                                }
                            });
                        });
                } else {
                    console.log ('Boards database already seeded.');
                    resolve();
                };
              }
            });
        });
    };

    function seedSailsData () {
        return new Promise (function (resolve, reject ){
            var sails, newSail, itemsLeft;

            console.log ('3 - Checking if exist sails data for user: ' + defaultUser);
            Sail.find ({username: defaultUser}, function(error, sails) {
                if (error){
                    console.log ('Failed to count sails in database: ' + error);
                } else {
                    if (sails.length===0) {
                        itemsLeft = seedData.initialSails.length;
                        console.log ('Seeding sails data into database.');
                        seedData.initialSails.forEach (function (sail) {
                            itemsLeft--;
                            newSail = new Sail(sail);
                            newSail.save(function (error){
                                if (error){
                                    console.log ('Failed to insert sail in database: ' + error);
                                    reject();
                                } else {
                                    console.log ('Sail added to database.');
                                    if (itemsLeft === 0) {
                                        resolve();
                                    }
                                }
                            });
                        });
                    } else {
                        console.log ('Sail database already seeded.');
                        resolve();
                    }
                }
            });
        });
    };

    function seedMastsData () {
        return new Promise (function (resolve, reject ){
            var masts, newMast, itemsLeft;

            console.log ('4 - Checking if exist masts data for user: ' + defaultUser);
            Mast.find ({username: defaultUser}, function(error, masts) {
                if (error){
                    console.log ('Failed to count masts in database: ' + error);
                } else {
                    if (masts.length===0) {
                        itemsLeft = seedData.initialMasts.length;
                        console.log ('Seeding masts data into database.');
                        seedData.initialMasts.forEach (function (mast) {
                            itemsLeft--;
                            newMast = new Mast(mast);
                            newMast.save(function (error){
                                if (error){
                                    console.log ('Failed to insert mast in database: ' + error);
                                    reject();
                                } else {
                                    console.log ('Masts added to database.');
                                    if (itemsLeft === 0) {
                                        resolve();
                                    }
                                }
                            });
                        });
                    } else {
                        console.log ('Mast database already seeded.');
                        resolve();
                    }
                }
            })
        });
    };

    function seedBoomsData () {
        return new Promise (function (resolve, reject ){
            var booms, newBoom, itemsLeft;

            console.log ('5 - Checking if exist booms data for user: ' + defaultUser);
            Boom.find ({username: defaultUser}, function(error, booms) {
                if (error){
                    console.log ('Failed to count booms in database: ' + error);
                } else {
                    if (booms.length===0) {
                        itemsLeft = seedData.initialBooms.length;
                        console.log ('Seeding booms data into database.');
                        seedData.initialBooms.forEach (function (boom) {
                            itemsLeft--;
                            newBoom = new Boom(boom);
                            newBoom.save(function (error){
                                if (error){
                                    console.log ('Failed to insert boom in database: ' + error);
                                    reject();
                                } else {
                                    console.log ('Boom added to database.');
                                    if (itemsLeft === 0){
                                        resolve();
                                    }
                                }
                            });
                        });
                    } else {
                        console.log ('Booms database already seeded.');
                        resolve();
                    }
                }
            });
        });
    };

    function seedSpotsData () {
        return new Promise (function (resolve, reject ){
            var spots, newSpot, itemsLeft;

            console.log ('6 - Checking if exist spots data for user: ' + defaultUser);   
            Spot.find ({username: defaultUser}, function(error, spots) {
                if (error){
                    console.log ('Failed to count spots in database: ' + error);
                } else {
                    if (spots.length===0) {
                        itemsLeft = seedData.initialSpots.length;
                        console.log ('Seeding spots data into database.');
                        seedData.initialSpots.forEach (function (spot) {
                            itemsLeft--;
                            newSpot = new Spot(spot);
                            newSpot.save(function (error){
                                if (error){
                                    console.log ('Failed to insert spot in database: ' + error);
                                    reject();
                                } else {
                                    console.log ('Spot added to database.');
                                    if (itemsLeft === 0){
                                        resolve();
                                    }
                                }
                            });
                        });
                    } else {
                        console.log ('Spots database already seeded.');
                        resolve();
                    }
                }
            });
        });
    };

    function seedSessionsData () {
            var sessions, newSession;

            console.log ('7 - Checking if exist session data for user: ' + defaultUser);
            Session.find ({username: defaultUser}, function(error, sessions) {
                if (error){
                    console.log ('Failed to count sessions in database: ' + error);
                } else {
                    if (sessions.length===0) {
                        console.log ('Seeding sessions data into database.');
                        seedData.initialSessions.forEach (function (session) {
                            AddSpotDataFor(session, defaultUser).then(function() {
                                AddBoardDataFor (session, defaultUser).then(function() {
                                    AddSailDataFor (session, defaultUser).then(function() {
                                        AddMastDataFor (session, defaultUser).then(function() {
                                            AddBoomDataFor (session, defaultUser).then(function() {
                                                newSession = new Session(session);
                                                newSession.save(function (error){
                                                    if (error){
                                                        console.log ('Failed to insert session in database: ' + error);
                                                    } else {
                                                        console.log ('Session added to database.');
                                                    }
                                                });
                                            });
                                        });
                                    });
                                });

                            });
                        });
                    } else {
                        console.log ('Sessions database already seeded.');
                    };
                }
            
        });
    };

    function AddSpotDataFor (session, userName) {
         return new Promise(function (resolve, reject) {
             var spot, spotName = session.spot;

            console.log ('adding '+ spotName);
            Spot.findOne ({username: userName, name: spotName}, function(error, spot) {
                if (error){
                    console.log ('Failed to find spot ' + spotName + ' for session ' + session.date + ' in database: ' + error);
                    reject();
                } else {
                    session.spot = [ spot ];
                    resolve();
                }
            });
         });
    };

    function AddBoardDataFor (session, userName) {
        return new Promise(function (resolve, reject) {
            var newSession, board,
                boardName = session.board;

            console.log ('adding '+ boardName);
            Board.findOne ({username: userName, name: boardName}, function(error, board) {
                if (error){
                    console.log ('Failed to find board ' + boardName + ' for session ' + session.date + ' in database: ' + error);
                    reject();
                } else {
                    session.board = [ board ];
                    resolve();
                }
            });
        });
    };

    function AddSailDataFor (session, userName) {
        return new Promise(function (resolve, reject) {
            var newSession, sail,
                sailName = session.sail;

            console.log ('adding '+ sailName);
            Sail.findOne ({username: userName, name: sailName}, function(error, sail) {
                if (error){
                    console.log ('Failed to find sail ' + sailName + ' for session ' + session.date + ' in database: ' + error);
                    reject();
                } else {
                    session.sail = [ sail ];
                    resolve();
                }
            });
        });
    };

    function AddMastDataFor (session, userName) {
        return new Promise(function (resolve, reject) {
            var newSession, mast,
                mastName = session.mast;

            console.log ('adding '+ mastName);
            Mast.findOne ({username: userName, name: mastName}, function(error, mast) {
                if (error){
                    console.log ('Failed to find mast ' + mastName + ' for session ' + session.date + ' in database: ' + error);
                    reject();
                } else {
                    session.mast = [ mast ];
                    resolve();
                }
            });
        });
    };

    function AddBoomDataFor (session, userName) {
        return new Promise(function (resolve, reject) {
            var newSession,boom,
                boomName = session.boom;

            console.log ('adding '+ boomName);
            Boom.findOne ({username: userName, name: boomName}, function(error, boom) {
                if (error){
                    console.log ('Failed to find boom ' + boomName + ' for session ' + session.date + ' in database: ' + error);
                    reject();
                } else {
                    session.boom = [ boom ];
                    resolve();
                }
            });
        });
    };

    seedDataBase();

})(module.exports);