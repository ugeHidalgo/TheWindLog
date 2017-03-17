##The WindLog

A windsurfing sessions diary implemented using a MEAN stack:

- Server dependencies:

    - body-parser
    - bower
    - connect-flash
    - cookie-parser     
    - express
    - express-session
    - grunt
    - grunt-nodemon
    - mongodb
    - mongoose    
    - passportjs
    - underscore    
    - vash    

- Client side dependencies:

    - angular
    - angular-bootstrap
    - angular-route
    - angular-smart-table
    - angular-ui-notification
    - font-awesome
    - bootstrap
    - jquery            
    - underscore    

___


**Database**: Mongo.

**Authorizing**: Passport with local authorization (Username/Password).

**View engine**: vash.

___

#Install process:

-1 Clone repository:

    git clone https://github.com/ugeHidalgo/TheWindLog.git

-2 Install:

    - Install mongodb downloading from http://www.mongodb.org
        Set path for databases with mongod --dbpath path

    - Install dependecies needed:

        cd thewindlog
        npm install
        bower install

-3 Run:
    Launch mongodb in a console:

        mongod
    
    Launch app with 

        npm start

    Access site to http://localhost:3000