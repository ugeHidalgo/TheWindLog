(function (sessionData){
    sessionData.init = function (app) {

        var mongoose = require ('mongoose'),
            Spot = require ('../models/spot'),
            Board = require ('../models/board'),
            Sail = require ('../models/sail'),
            Boom = require ('../models/boom'),
            Mast = require ('../models/mast'),
            Session = require ('../models/session');

        sessionData.getSessions = function (username, callbackFn) {
             Session.find({username:username}, callbackFn);
        };

        sessionData.getSessionsTotals = function (username, callbackFn) {
             var sessions = Session.aggregate([
                 {
                    $project: {
                        _id: 1,
                        spot: 1,
                        distance: 1,
                        time: 1,
                        maxSpeed: 1,
                        avgSpeed: 1,
                        value: 1
                    }
                 },
                 {
                    $group: {
                        _id: '$spot',
                        nOfsessions: {$sum: 1},
                        totalDistance: {$sum: '$distance'},
                        totalTime: {$sum: '$time'},
                        maxSpeed: {$max: '$maxSpeed'},
                        avgSpeed: {$avg: '$avgSpeed'},
                        avgValue: {$avg: '$value'}
                    }
                 }
                ], callbackFn);
        };

        sessionData.getSessionById = function (username, sessionId, callbackFn) {
             Session.findOne({username:username, _id: sessionId}, callbackFn);
        };

        sessionData.updateSession = function (session, callbackFn) {
            var updatedValues = {};

            session.board.distance += session.distance;

            if (session._id) {
                //Update existing session.
                updatedValues = {
                    spot: session.spot,
                    dat: session.dat,
                    distance: session.distance,
                    time: session.time,
                    maxSpeed: session.maxSpeed,
                    avgSpeed: session.avgSpeed,
                    board: session.board,
                    sail: session.sail,
                    mast: session.mast,
                    boom: session.boom,
                    value: session.value,
                    windDirection: session.windDirection,
                    windPressure: session.windPressure,
                    temperature: session.temperature,
                    comment: session.comment,
                };

                Session.findOneAndUpdate(
                {_id: session._id}, 
                { $set: updatedValues },
                function (error){
                    if (error){
                        callbackFn(error, null);
                    } else {
                        console.log ('Session data updated -->username = ' + session.username + ' /id = ' + session._id);                        
                        callbackFn(null, session)
                    }
                });
            } else {
                //Create new session.
                var newSession = new Session(session);

                newSession.spot[0] = new Spot(session.spot[0]);
                newSession.board[0] = new Board(session.board[0]);
                newSession.sail[0] = new Sail(session.sail[0]);
                newSession.boom[0] = new Boom(session.boom[0]);
                newSession.mast[0] = new Mast(session.mast[0]);

                newSession.save(function (error) {
                    if (error) {
                        callbackFn(error, null);
                    } else {
                        console.log ('New session saved ----->username = ' + newSession.username + ' /id = ' + newSession._id);
                        callbackFn(null, newSession);
                    }
                });
            }
        };
    };

})(module.exports);