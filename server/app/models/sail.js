var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    SailSchema = new Schema ({
        name : String,
        model : String,
        brand : String,
        size : { type : Number, default : 0 },
        mast : { type : Number, default : 0 }, 
        boom : { type : Number, default : 0 },
        adapter: { type : Number, default : 0 },
        year : String,
        battens : { type : Number, default : 0 }, 
        cams : { type:  Number, default: 0 },
        imcs: { type : Number, default : 0 },
        purchase : Date,
        price : { type : Number, default : 0 },
        secondHand : { type: Boolean, default: false },
        active : { type: Boolean, default: true },
        updated : { type: Date, default: Date.now },
        comment: String,
        username : String
    });


module.exports = moongoose.model ('Sail', SailSchema);