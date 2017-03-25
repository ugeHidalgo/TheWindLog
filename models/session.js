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
        lat : { type : Number, default : 0 }, 
        long : { type : Number, default : 0 },
        active : { type: Boolean, default: true },
        updated : { type: Date, default: Date.now },
        comment: String,
        username : String
    });

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
        size : { type : Number, default : 0 },
        mast : { type : Number, default : 0 }, 
        boom : { type : Number, default : 0 },
        adapter: { type : Number, default : 0 },
        year : String,
        battens : Number, 
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

    MastSchema = new Schema ({
        name : String,
        model : String,
        brand : String,
        carbon : { type : Number, default : 0 },
        length : { type : Number, default : 0 }, 
        imcs: Number,
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

    BoomSchema = new Schema ({
        name : String,
        model : String,
        brand : String,
        maxLength : { type : Number, default : 0 },
        minLength : { type : Number, default : 0 }, 
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

    SessionSchema = new Schema ({
        spot : [ SpotSchema ],
        date : { type: Date, default: Date.now },
        distance : { type : Number, default : 0 },
        time : { type : Number, default : 0 },
        maxSpeed: { type : Number, default : 0 },
        medSpeed: { type : Number, default : 0 },
        board : [ BoardSchema ],
        sail : [ SailSchema ], 
        mast : [ MastSchema ],
        boom : [ BoomSchema ],
        value : { type : Number, default : 0 },
        windDirection : String,
        windPressure: { type : Number, default : 0 },
        temperature: { type : Number, default : 0 },
        comment:  String,
        username : String
    });

module.exports = moongoose.model ('Session', SessionSchema);