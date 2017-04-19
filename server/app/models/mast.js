var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    MastSchema = new Schema ({
        name : String,
        model : String,
        brand : String,
        carbon : { type : Number, default : 0 },
        length : { type : Number, default : 0 }, 
        imcs: { type : Number, default : 0 },
        type : String,
        year : String,
        purchase : Date,
        price : { type : Number, default : 0 },
        secondHand : { type : Boolean, default : false },
        active : { type : Boolean, default : true },
        updated : { type : Date, default : Date.now },
        comment: String,
        username : String
    });


module.exports = moongoose.model ('Mast', MastSchema);