##The WindLog

A windsurfing sessions diary implemented using a MEAN stack:

Currently running on Heroku at: https://thewindlog.herokuapp.com/


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
    - ui-bootstrap          
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
    Launch mongoDB in a console:

        mongod
    
    Launch app with 

        npm start

    Access site to http://localhost:5000


-4 Debug server side with node inspector:
    node --inspect --debug .
    Copiar url y pegar en un browser.

-5 Remote Data base can also be used hosted in mLab (Need to change local db config to remote. See dbConfig.js to change it)

#CSS changes
Use instead sass files and regenerate CSS using grunt with "grunt watch" command.