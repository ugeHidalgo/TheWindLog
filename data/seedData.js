(function (seedData) {

    seedData.initialUsers = [{
            name: 'Eugenio Hidalgo', email: 'ugehidalgo@gmail.com', username: 'ugeHidalgo',
            passwordHash: '820082966e1a80db69bf35f3a1801c8ad44e52ca', salt: '28a06fe9',
            active: true, admin: true
        }, {
            name: 'Pepe', email: 'pepe@gmail.com', username: 'pepe',
            passwordHash: '820082966e1a80db69bf35f3a1801c8ad44e52ca', salt: '28a06fe9',
            active: true, admin: false,
        }];

    seedData.initialBoards = [{
            name: 'Titan', model: 'Titan', brand: 'Naish', volume: 110, length: 252, width: 0, year: 2004,
            purchase: new Date(2016,4,2), price: 160, secondHand: true, active: true, username: 'ugeHidalgo'
        },{
            name: 'Rocket95', model: 'Rocket', brand: 'Tabou', volume: 95, length: 237, width: 58, year: 2010,
            purchase: new Date(2016,5,27), price: 350, secondHand: true, active: true, username: 'ugeHidalgo'
        },{
            name: 'RRDQuad83', model: 'WaveCult LTD 83', brand: 'RRD', volume: 83, length: 230, width: 59, year: 2014,
            purchase: new Date(2016,9,5), price: 350, secondHand: true, active: true, username: 'ugeHidalgo'
        },{
            name: 'NaishWave', model: 'Naish 8.5', brand: 'Mistral', volume: 85, length: 256, width: 56, year: 2000,
            purchase: new Date(2016,4,30), price: 0, secondHand: true, active: true, username: 'ugeHidalgo'
        }];

    seedData.initialSails = [{
            name: 'Gun35', model: 'Steel', brand: 'Gun', size: 3.5, mast: 370, boom: 142, adapter: -10, year: 2010, battens: 4, cams: 0,
            imcs: 18, purchase: new Date(2017,2,16), price: 85, secondHand: true, active: true, username: 'ugeHidalgo'
        }, {
            name: 'NaishF42', model: 'Force', brand: 'Naish', size: 4.2, mast: 370, boom: 155, adapter: 28, year: 2011, battens: 5, cams: 0,
            imcs: 18, purchase: new Date(2017,2,11), price: 130, secondHand: true, active: true, username: 'ugeHidalgo'
        }, {
            name: 'NaishF47', model: 'Force', brand: 'Naish', size: 4.7, mast: 400, boom: 165, adapter: 12, year: 2011, battens: 5, cams: 0,
            imcs: 21, purchase: new Date(2017,2,11), price: 130, secondHand: true, active: true, username: 'ugeHidalgo'
        }, {
            name: 'P7Slash52', model: 'Slash', brand: 'Point7', size: 5.2, mast: 400, boom: 163, adapter: 9.5, year: 2014, battens: 5, cams: 0,
            imcs: 21, purchase: new Date(2016,4,15), price: 225, secondHand: true, active: true, username: 'ugeHidalgo'
        }, {
            name: 'P7Sado59', model: 'Sado', brand: 'Point7', size: 5.9, mast: 430, boom: 175, adapter: 9.5, year: 2014, battens: 5, cams: 0,
            imcs: 21, purchase: new Date(2016,4,15), price: 275, secondHand: true, active: true, username: 'ugeHidalgo'
        }, {
            name: 'GaC64', model: 'Cross', brand: 'Naish', size: 6.4, mast: 430, boom: 192, adapter: 22.5, year: 2014, battens: 6, cams: 0,
            imcs: 21, purchase: new Date(2016,6,20), price: 180, secondHand: true, active: true, username: 'ugeHidalgo'
        }];

    seedData.initialMasts = [{
            name: 'N380S', model: 'Xcelerator', brand: 'North', carbon: 100, length: 380, type: "SDM", imcs: 18, year: 2008,
            purchase: new Date(2016,2,25), price: 80, secondHand: true, active: true, username: 'ugeHidalgo'
        }, {
            name: 'P400R', model: '', brand: 'Point7', carbon: 50, length: 400, type: "RDM", imcs: 21, year: 2014,
            purchase: new Date(2016,4,15), price: 150, secondHand: true, active: true, username: 'ugeHidalgo'
        }, {
            name: 'G430R', model: 'Cross', brand: 'Gun', carbon: 60, length: 430, type: "RDM", imcs: 21, year: 2016,
            purchase: new Date(2016,6,14), price: 240, secondHand: false, active: true, username: 'ugeHidalgo'
        }];

    seedData.initialBooms = [{
            name: 'B3140', model: 'Wave', brand: 'B3', maxLength: 140, minLength: 190, type: "Aluminium", year: 2016,
            purchase: new Date(2016,4,16), price: 127.76, secondHand: false, active: true, username: 'ugeHidalgo'
        }, {
            name: 'B3160', model: 'Wave', brand: 'B3', maxLength: 160, minLength: 210, type: "Aluminium", year: 2016,
            purchase: new Date(2016,6,14), price: 127.76, secondHand: false, active: true, username: 'ugeHidalgo'
        }];
        

    })(module.exports);
