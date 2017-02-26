var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    UserSchema = Schema ({
        name : String,
        email : String,
        username : String,
        passwordHash : String,
        salt : String,
        active : { type : Boolean, default : true },
        admin : { type : Boolean, default : false },
        updated : { type : Date, default : Date.now }
    });


module.exports = moongoose.model ('User', UserSchema);