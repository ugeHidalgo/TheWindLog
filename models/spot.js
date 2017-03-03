var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    SpotSchema = new Schema ({
        name : String,
        city : String,
        province : String,
        country : String,
        lat : Number, 
        long : Number,
        active : { type: Boolean, default: true },
        updated : { type: Date, default: Date.now },
        comment: String,
        username : String
    });

module.exports = moongoose.model ('Spot', SpotSchema);