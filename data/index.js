(function (data){
    var seedData = require ('./seedData');
    var database = require ('./database');

    data.addUser = function (user, callbackFn) {
        database.getDb(function (error, db) {
            if (error){
                console.log('Failed to add user to BD');
                callbackFn(error);
            } else {
                db.users.insert(user, function (error){
                    if (error){
                        callbackFn(error);
                    } else {
                        callbackFn(null)
                    }
                });
            }
        });
    };

    data.updateUser = function (user, callbackFn) {
        database.getDb(function (error, db) {
            if (error){
                console.log('Failed to update user to BD');
                callbackFn(error);
            } else {
                db.users.update(
                    {username: user.username}, 
                    {
                        $set: {
                            name: user.name,
                            email: user.email
                        }
                    },
                    function (error){
                    if (error){
                        callbackFn(error);
                    } else {
                        callbackFn(null)
                    }
                });
            }
        });
    };

    data.getUser = function (username, callbackFn) {
        database.getDb(function (error, db) {
            if (error){
                console.log('Failed to get user from DB');
                callbackFn(error);
            } else {
                db.users.findOne({username:username}, callbackFn);
            }
        });
    };

    function seedDataBase () {
        database.getDb ( function ( error, db){
            if (error){
                console.log ('Failed to seed database: ' + error);
            } else {
                //Test to see id boards data exist yet to avoid reseeding
                db.boards.count ( function (error, data){
                    if (error) {
                        console.log ('Failed to count boards in database: ' + error);
                    } else {
                        if (data===0){
                            console.log ('Seeding boards data into database.');
                            seedData.initialBoards.forEach (function (board) {
                                 db.boards.insert(note,function (error){
                                     if (error){
                                         console.log ('Failed to insert board in database: ' + error);
                                     }
                                 });
                            });
                        } else {
                            console.log ('Boards database already seeded.');
                        }
                    }
                });
            }
        });
    };

    seedDataBase();

})(module.exports);