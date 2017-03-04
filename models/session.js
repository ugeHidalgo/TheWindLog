var moongoose = require ('mongoose'),
    Spot = require ('./spot'),
    Board = require ('./board'),
    Sail = require ('./sail'),
    Mast = require ('./mast'),
    Boom = require ('./boom');
    

    Schema = moongoose.Schema;

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
        comment: String,
        username : String
    });

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

    BoomSchema = new Schema ({
        name : String,
        model : String,
        brand : String,
        maxLength : Number,
        minLength : Number, 
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

    SessionSchema = new Schema ({
        spot : [ SpotSchema ],
        date : { type: Date, default: Date.now },
        distance : Number,
        time : Number,
        maxSpeed: Number,
        medSpeed: Number,
        board : [ BoardSchema ],
        sail : [ SailSchema ], 
        mast : [ MastSchema ],
        boom : [ BoomSchema ],
        value : Number,
        windDirection : String,
        windPressure: Number,
        temperature: Number,
        comment:  String,
        username : String
    });

module.exports = moongoose.model ('Session', SessionSchema);