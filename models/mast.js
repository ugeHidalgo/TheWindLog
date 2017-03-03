var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    MastSchema = new Schema ({
        name : String,
        model : String,
        brand : String,
        carbon : Number,
        length : Number, 
        imcs: Number,
        type : String,
        year : Number,
        purchase : Date,
        price : Number,
        secondHand : { type : Boolean, default : false },
        active : { type : Boolean, default : true },
        updated : { type : Date, default : Date.now },
        comment: String,
        username : String
    });


module.exports = moongoose.model ('Mast', MastSchema);