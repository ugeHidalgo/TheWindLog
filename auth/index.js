(function (auth) {

    var data = require ('../data'),
        hasher = require ('./hasher'),
        passport = require ('passport');
        localStrategy = require ('passport-local').Strategy;


    function userVerify( username, password, callbackFn) {
        data.getUser(username, function (err, user) {
            if (!err) {
                var testHash = hasher.computeHash(password, user.salt);
                if (testHash === user.passwordHash) {
                    callbackFn (null, user);
                    return;
                }
            }
            callbackFn (null, false, {message:'Invalid username/password.'});
        });
    }

    auth.ensureAuthenticated = function (req, res, callbackFn) {
        if (req.isAuthenticated()){
            callbackFn();
        } else {
            res.redirect('/login/login');
        }
    };

    auth.ensureApiAuthenticated = function (req, res, callbackFn) {
        if (req.isAuthenticated()){
            callbackFn();
        } else {
            res.status(401).send('Not authorized.');
        }
    };


    auth.init  = function (app) {

        //setup passport authentication, por ahora solo local strategy, pero si quisieramos usar
        // facebook, google, etc además, se inicializaría aquí también.
        passport.use(new localStrategy(userVerify));
        passport.serializeUser(function(user, callbackFn) {
            callbackFn(null,user.username);
        });
        passport.deserializeUser(function (key, callbackFn){
            data.getUser( key, function (err, user) {
                if (err) {
                    callbackFn(null, false, { message: 'Failed to retrieve user.'});
                } else {
                    callbackFn(null, user);
                }
            });
        });
        app.use(passport.initialize());
        app.use(passport.session());

        app.get ('/login/login' , function (req, res) {
            res.render ('login/login', {
               title: 'Logging',
               message: req.flash('loginError') 
            });
        });

        app.post ('/login/login' , function (req, res, callbackFn) {
            var authFunction = passport.authenticate('local', function (err, user, info) {
                if (err) {
                    callbackFn(err);
                } else {
                    req.logIn (user, function (err){
                        if (err){
                            callbackFn(err);
                        } else {
                            res.redirect('/');
                        }
                    });
                }
            });
            authFunction (req, res, callbackFn);
        });

        app.get ('/logout' , function (req, res) {
            req.logout();
            res.redirect('/');
        });

        app.get ('/login/register', function (req, res) {
            res.render ('login/register', { 
                title: 'Register into the board',
                message: req.flash('registrationError')
            });
        });

        app.post ('/login/register', function (req, res) {

            var salt;
            if (req.body.password !== req.body.retypePassword){
                req.flash('registrationError', 'Password and confirmed password are not equal.');
                res.redirect('/login/register');
                return;
            }

            salt = hasher.createSalt(),

                user =  {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                passwordHash: hasher.computeHash(req.body.password, salt) ,
                salt: salt
            };

            data.addUser( user, function (err) {
                if (err){
                    req.flash('registrationError', 'Could not save user to database.');
                    res.redirect('/login/register');
                } else {
                    res.redirect('/login/login');
                }
            });
        });

    };

})(module.exports);