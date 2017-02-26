var http = require ('http'),
    express = require ('express'),
    mongoose = require ('mongoose'),
    dbConfig = require ('./data/dbConfig'),
    controllers = require ('./controllers'),
    bodyParser = require('body-parser');
    flash = require('connect-flash');
    cookieParser = require('cookie-parser')
    expressSession = require('express-session');
    app = express(),
    port = process.env.port || 3000;

mongoose.connect (dbConfig.url);

//Set the view engine.
app.set('view engine', 'vash');

//Set the public static resource folder.
app.use(express.static(__dirname + '/public'));

// parse urlencoded request bodies into req.body.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Support flash.
app.use(cookieParser());
app.use(expressSession({
    secret: 'anystringhereisvalidtoencript',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//Use authentication
var auth = require ('./auth');
auth.init(app);

//Controllers initialization.
controllers.init(app);

var server = http.createServer(app);

server.listen(port);