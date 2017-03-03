var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    SailSchema = new Schema ({
        name : String,
        model : String,
        brand : String,
        size : Number,
        mast : Number, 
        boom : Number,
        adapter: Number,
        year : Number,
        battens : Number, 
        cams : { type:  Number, default: 0 },
        imcs: Number,
        purchase : Date,
        price : Number,
        secondHand : { type: Boolean, default: false },
        active : { type: Boolean, default: true },
        updated : { type: Date, default: Date.now },
        comment: String,
        username : String
    });


module.exports = moongoose.model ('Sail', SailSchema);