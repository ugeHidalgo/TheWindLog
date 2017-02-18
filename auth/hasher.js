(function (hasher) {

    var crypto = require('crypto');  //Build into node

    hasher.createSalt = function () {
        var len = 8;
        return crypto.randomBytes(Math.ceil(len/2)).toString('hex').substring(0,len);
    };

    hasher.computeHash = function (sourceString, salt) {
        var hmac = crypto.createHmac('sha1', salt),
            hash = hmac.update(sourceString);
        
        return hash.digest('hex');
    };

} )(module.exports);