(function (auth) {

    var userData = require ('../data/userData'),
        hasher = require ('./hasher'),
        passport = require ('passport');
        localStrategy = require ('passport-local').Strategy;

    function userVerify(req, username, password, callbackFn) {
        userData.getUser(username, function (err, user) {

            if (err) { return callbackFn(err); }
            if (!user) { return callbackFn(null, false, req.flash( 'loginErrorMessage', 'Incorrect username.' )); }
                
            var testHash = hasher.computeHash(password, user.salt);
            if (testHash !== user.passwordHash) {
                    return callbackFn (null, false, req.flash( 'loginErrorMessage', 'Incorrect password.' ));
            }
            return callbackFn (null, user);
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
        passport.use(new localStrategy( { passReqToCallback: true }, userVerify ));

        passport.serializeUser(function(user, callbackFn) { 
            callbackFn(null,user.username); 
        });

        passport.deserializeUser(function (key, callbackFn){
            userData.getUser( key, function (err, user) {
                if (err || !user) {
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
               title: '',
               message: req.flash('loginErrorMessage') 
            });
        });

        app.post ('/login/login' , passport.authenticate('local', 
            { 
                failureRedirect: '/login/login',
                failureFlash: true
            }), 
            function (req, res) {
                if (req.user) {
                    res.redirect ('/userMain/' + req.user.username);
                } 
            }
        );

        app.get ('/logout' , function (req, res) {
            req.logout();
            res.redirect('/');
        });

        app.get ('/login/register', function (req, res) {
            res.render ('login/register', { 
                title: 'Register into the WindLog',
                message: req.flash('registrationErrorMessage')
            });
        });

        app.post ('/login/register', function (req, res) {

            var salt, user;
            if (req.body.password !== req.body.confirmPassword){
                res.status(500).send('Password and confirmed password are not equal.');
                return;
            }

            if (userData.usedUsername(req.body.username, function (error, result){
                if (error || result) {
                    res.status(500).send('Username "' + req.body.username + '" is in use. Please change it.');
                } else {
                    salt = hasher.createSalt(),

                    user =  {
                        name: req.body.name,
                        email: req.body.email,
                        username: req.body.username,
                        passwordHash: hasher.computeHash(req.body.password, salt) ,
                        salt: salt
                    };

                    userData.addUser( user, function (err) {
                        if (err){
                            res.status(500).send('Could not save user to database.');
                        } else {
                            res.status(201).send (user)
                        }
                    });
                }
            }));
        });

    };

})(module.exports);