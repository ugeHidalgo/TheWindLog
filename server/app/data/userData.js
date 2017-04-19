(function (userData){
    userData.init = function (app) {

        var mongoose = require ('mongoose'),
            User = require ('../models/user'),
            hasher = require ('../auth/hasher');

        userData.addUser = function (user, callbackFn) {
            var newUser = new User(user);

            newUser.save(function (error) {
                if (error) {
                    callbackFn(error);
                } else {
                    callbackFn(null)
                }
            });
        };

        userData.updateUser = function (user, callbackFn) {
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

        userData.getUser = function (username, callbackFn) {
            User.findOne({username:username}, callbackFn);
        };

        userData.usedUsername = function (username, callbackFn) {
            User.findOne({username:username}, callbackFn );
        };

        userData.seedSessionData = function (username, callbackFn) {
            console.log ('Seeding session data for ' + username);
            SeedTools.seedSessionsData();
        };

    };

})(module.exports);