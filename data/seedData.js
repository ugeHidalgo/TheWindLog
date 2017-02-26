(function (seedData) {

    seedData.initialUsers = [{
            name: 'Eugenio Hidalgo',
            email: 'ugehidalgo@gmail.com',
            username: 'ugeHidalgo',
            passwordHash: '820082966e1a80db69bf35f3a1801c8ad44e52ca',
            salt: '28a06fe9',
            active: true,
            admin: true
        }, {
            name: 'Pepe',
            email: 'pepe@gmail.com',
            username: 'pepe',
            passwordHash: '820082966e1a80db69bf35f3a1801c8ad44e52ca',
            salt: '28a06fe9',
            active: true,
            admin: false,
        }];

    seedData.initialBoards = [{
            name: 'Titan',
            model: 'Titan',
            brand: 'Naish',
            volume: 110,
            length: 252,
            width: 0,
            year: 2004,
            purchase: new Date(2016,4,2),
            price: 160,
            secondHand: true,
            active: true,
            username: 'ugeHidalgo'
        }];

    })(module.exports);
