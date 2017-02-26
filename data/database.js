(function (database){

    var mongoDb = require ('mongodb'),
        dbConfig = require ('./dbConfig.js'),
        theDb = null;

    database.getDb = function (callbackFn) {
        if (!theDb){
            //Connecto to db
            mongoDb.MongoClient.connect(dbConfig.url, function (error, db) {
                if (error){
                    callbackFn(error,null);
                } else {
                    theDb = {
                        db: db,
                        users : db.collection('users'),
                        boards : db.collection('boards')
                    };
                    callbackFn(null,theDb);
                }
            });
        } else {
            callbackFn (null, theDb);
        }
    };

})(module.exports);