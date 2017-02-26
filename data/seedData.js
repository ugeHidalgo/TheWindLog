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
        }];

    seedData.initialSails = [{
            name: 'NaishF42', model: 'Force', brand: 'Naish', size: 4.2, mast: 370, boom: 142, adapter: 12, year: 2011,
            purchase: new Date(2017,2,25), price: 130, secondHand: true, active: true, username: 'ugeHidalgo'
        }, {
            name: 'NaishF47', model: 'Force', brand: 'Naish', size: 4.7, mast: 400, boom: 147, adapter: 12, year: 2011,
            purchase: new Date(2017,2,25), price: 130, secondHand: true, active: true, username: 'ugeHidalgo'
        }];
        

    })(module.exports);
