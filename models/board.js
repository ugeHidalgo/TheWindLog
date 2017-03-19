var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    BoardSchema = new Schema ({
        name : String,
        model : String,
        brand : String,
        volume : { type : Number, default : 0 },
        length : { type : Number, default : 0 }, 
        width : { type : Number, default : 0 },
        year : Number,
        purchase : Date,
        price : { type : Number, default : 0 },
        secondHand : { type : Boolean, default : false },
        active : { type : Boolean, default : true },
        updated : { type : Date, default : Date.now },
        comment: String,
        username : String
    });


module.exports = moongoose.model ('Board', BoardSchema);