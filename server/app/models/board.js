var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    BoardSchema = new Schema ({
        name : String,
        model : String,
        brand : String,
        volume : { type : Number, default : 0 },
        length : { type : Number, default : 0 }, 
        width : { type : Number, default : 0 },
        year : String,
        purchase : Date,
        price : { type : Number, default : 0 },
        distance : { type : Number, default : 0 },
        time : { type : Number, default : 0 },
        maxSpeed: { type : Number, default : 0 },
        avgSpeed: { type : Number, default : 0 },
        sessions: { type : Number, default : 0 },
        secondHand : { type : Boolean, default : false },
        active : { type : Boolean, default : true },
        updated : { type : Date, default : Date.now },
        comment: String,
        username : String
    });


module.exports = moongoose.model ('Board', BoardSchema);