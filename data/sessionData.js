(function (sessionData){
    sessionData.init = function (app) {

        var mongoose = require ('mongoose'),
            Session = require ('../models/session');

        sessionData.getSessions = function (username, callbackFn) {
             Session.find({username:username}, callbackFn);
        };

        sessionData.getSessionById = function (username, sessionId, callbackFn) {
             Session.findOne({username:username, _id: sessionId}, callbackFn);
        };

        sessionData.updateSession = function (session, callbackFn) {
            var updatedValues = {};

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