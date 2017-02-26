var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    BoardSchema = new Schema ({
        name : String,
        model : String,
        brand : String,
        volume : Number,
        length : Number, 
        width : Number,
        year : Number,
        purchase : Date,
        price : Number,
        secondHand : { type : Boolean, default : false },
        active : { type : Boolean, default : true },
        updated : { type : Date, default : Date.now },
        username : String
    });


module.exports = moongoose.model ('Board', BoardSchema);