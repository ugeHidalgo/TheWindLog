var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    SessionSchema = new Schema ({
        spot : String,
        date : { type: Date, default: Date.now },
        distance : Number,
        time : Number,
        board : String,
        sail : String, 
        mast : String,
        boom : String,
        value : Number,
        windDirection : String,
        windPressure: Number,
        temperature: Number,
        comment:  String,
        username : String
    });

module.exports = moongoose.model ('Session', SessionSchema);