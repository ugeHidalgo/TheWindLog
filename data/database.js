(function (database){

    var mongoDb = require ('mongodb');
    var mongoUrl = 'mongodb://localhost:27017/windlogDB';
    var theDb = null;

    database.getDb = function (callbackFn) {
        if (!theDb){
            //Connecto to db
            mongoDb.MongoClient.connect(mongoUrl, function (error, db) {
                if (error){
                    callbackFn(error,null);
                } else {
                    theDb = {
                        db: db,
                        users : db.collection('users'),
                        boards : db.collection('boards'),
                        sails : db.collection('sails'),
                        spots : db.collection('spots')
                    };
                    callbackFn(null,theDb);
                }
            });
        } else {
            callbackFn (null, theDb);
        }

    }

})(module.exports);