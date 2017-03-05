(function (seedData) {
    var defaultUserName = 'ugehidalgo';

    seedData.initialUsers = [{
            name: 'Eugenio Hidalgo', email: 'ugehidalgo@gmail.com', username: defaultUserName,
            passwordHash: '820082966e1a80db69bf35f3a1801c8ad44e52ca', salt: '28a06fe9',
            active: true, admin: true
        }, {
            name: 'Pepe', email: 'pepe@gmail.com', username: 'pepe',
            passwordHash: '820082966e1a80db69bf35f3a1801c8ad44e52ca', salt: '28a06fe9',
            active: true, admin: false,
        }];

    seedData.initialBoards = [{
            name: 'Titan', model: 'Titan', brand: 'Naish', volume: 110, length: 252, width: 0, year: 2004,
            purchase: new Date('2016-04-02'), price: 160, secondHand: true, active: true, username: defaultUserName
        },{
            name: 'Rocket95', model: 'Rocket', brand: 'Tabou', volume: 95, length: 237, width: 58, year: 2010,
            purchase: new Date('2016-5-27'), price: 350, secondHand: true, active: true, username: defaultUserName
        },{
            name: 'RRDQuad83', model: 'WaveCult LTD 83', brand: 'RRD', volume: 83, length: 230, width: 59, year: 2014,
            purchase: new Date('2016-9-5'), price: 350, secondHand: true, active: true, username: defaultUserName
        },{
            name: 'NaishWave', model: 'Naish 8.5', brand: 'Mistral', volume: 85, length: 256, width: 56, year: 2000,
            purchase: new Date('2016-4-30'), price: 0, secondHand: true, active: true, username: defaultUserName
        }];

    seedData.initialSails = [{
            name: 'Gun35', model: 'Steel', brand: 'Gun', size: 3.5, mast: 370, boom: 142, adapter: -10, year: 2010, battens: 4, cams: 0,
            imcs: 17, purchase: new Date('2017-2-16'), price: 85, secondHand: true, active: true, username: defaultUserName
        }, {
            name: 'NaishF42', model: 'Force', brand: 'Naish', size: 4.2, mast: 370, boom: 155, adapter: 28, year: 2011, battens: 5, cams: 0,
            imcs: 18, purchase: new Date('2017-2-11'), price: 130, secondHand: true, active: true, username: defaultUserName
        }, {
            name: 'NaishF47', model: 'Force', brand: 'Naish', size: 4.7, mast: 400, boom: 165, adapter: 12, year: 2011, battens: 5, cams: 0,
            imcs: 21, purchase: new Date('2017-2-11'), price: 130, secondHand: true, active: true, username: defaultUserName
        }, {
            name: 'GaMa47', model: 'Manic', brand: 'Gaastra', size: 4.7, mast: 400, boom: 165, adapter: 12, year: 2004, battens: 5, cams: 0,
            imcs: 21, purchase: new Date('2016-5-09'), price: 90, secondHand: true, active: true, username: defaultUserName
        },{
            name: 'P7Slash52', model: 'Slash', brand: 'Point7', size: 5.2, mast: 400, boom: 163, adapter: 9.5, year: 2014, battens: 5, cams: 0,
            imcs: 21, purchase: new Date('2016-4-15'), price: 225, secondHand: true, active: true, username: defaultUserName
        }, {
            name: 'P7Sado59', model: 'Sado', brand: 'Point7', size: 5.9, mast: 430, boom: 175, adapter: 9.5, year: 2014, battens: 5, cams: 0,
            imcs: 21, purchase: new Date('2016-4-15'), price: 275, secondHand: true, active: true, username: defaultUserName
        },{
            name: 'GaC64', model: 'Cross', brand: 'Gaastra', size: 6.4, mast: 430, boom: 192, adapter: 22.5, year: 2014, battens: 6, cams: 0,
            imcs: 21, purchase: new Date('2016-6-20'), price: 180, secondHand: true, active: true, username: defaultUserName
        }];

    seedData.initialMasts = [{
            name: 'N380S', model: 'Xcelerator', brand: 'North', carbon: 100, length: 380, type: "SDM", imcs: 17, year: 2008,
            purchase: new Date('2016-2-25'), price: 80, secondHand: true, active: true, username: defaultUserName
        }, {
            name: 'P400R', model: '', brand: 'Point7', carbon: 50, length: 400, type: "RDM", imcs: 21, year: 2014,
            purchase: new Date('2016-4-15'), price: 150, secondHand: true, active: true, username: defaultUserName
        }, {
            name: 'G430R', model: 'Cross', brand: 'Gun', carbon: 60, length: 430, type: "RDM", imcs: 21, year: 2016,
            purchase: new Date('2016-6-14'), price: 240, secondHand: false, active: true, username: defaultUserName
        }];

    seedData.initialBooms = [{
            name: 'B3140', model: 'Wave', brand: 'B3', maxLength: 140, minLength: 190, type: "Aluminium", year: 2016,
            purchase: new Date('2016-4-16'), price: 127.76, secondHand: false, active: true, username: defaultUserName
        }, {
            name: 'B3160', model: 'Wave', brand: 'B3', maxLength: 160, minLength: 210, type: "Aluminium", year: 2016,
            purchase: new Date('2016-6-14'), price: 127.76, secondHand: false, active: true, username: defaultUserName
        }];

    seedData.initialSpots = [
        { name: 'Torrenueva', city: 'Torrenueva', province: 'Granada', country: 'Spain', long: 0, lat: 0, active: true, username: defaultUserName,
          lat: 36.69801666837331, long: -3.482644557952881 },
        { name: 'Rules', city: '', province: 'Granada', country: 'Spain', long: 0, lat: 0, active: true, username: defaultUserName,
          lat: 36.871527372554866, long: -3.482368290424347 },
        { name: 'AWA', city: 'Motril', province: 'Granada', country: 'Spain', long: 0, lat: 0, active: true, username: defaultUserName,
          lat: 36.714548590417635, long: -3.5529452562332153 },
        { name: 'Ponde', city: 'Almuñecar', province: 'Granada', country: 'Spain', long: 0, lat: 0, active: true, username: defaultUserName,
          lat: 36.730500844777204, long: -3.6841481924057007 },
        { name: 'Valdevaqueros', city: 'Tarifa', province: 'Cádiz', country: 'Spain', long: 0, lat: 0, active: true, username: defaultUserName,
          lat: 36.0663764741249, long: -5.684094429016113 },
        { name: 'Lances Norte', city: 'Tarifa', province: 'Cádiz', country: 'Spain', long: 0, lat: 0, active: true, username: defaultUserName,
          lat: 36.04502188387152, long: -5.6370484828948975 },
        { name: 'ArteVida', city: 'Tarifa', province: 'Cádiz', country: 'Spain', long: 0, lat: 0, active: true, username: defaultUserName,
          lat: 36.05172725943047, long: -5.647417902946472 },
        { name: 'Almerimar (Victor Center)', city: 'El Ejido', province: 'Almería', country: 'Spain', long: 0, lat: 0, active: true, username: defaultUserName,
          lat: 36.70085216285717, long: -2.7995040267705917 },
        { name: 'Almerimar (Camping)', city: 'El Ejido', province: 'Almería', country: 'Spain', long: 0, lat: 0, active: true, username: defaultUserName,
          lat: 36.70684431429625, long: -2.8148965537548065 },
        { name: 'Almerimar (Pinchos)', city: 'El Ejido', province: 'Almería', country: 'Spain', long: 0, lat: 0, active: true, username: defaultUserName,
          lat: 36.70434773090518, long: -2.8321096301078796 },
        { name: 'Almerimar (Casilla)', city: 'El Ejido', province: 'Almería', country: 'Spain', long: 0, lat: 0, active: true, username: defaultUserName,
          lat: 36.70081237848548, long: -2.8385764360427856 },
        { name: 'Castel (Peñón)', city: 'Castell de Ferro', province: 'Granada', country: 'Spain', long: 0, lat: 0, active: true, username: defaultUserName,
          lat: 36.720009708134434, long: -3.360695242881775 }
        ];

     seedData.initialSessions = [{
            date: new Date('2017-02-27'), spot: 'Castel (Peñón)', board: 'Titan', sail: 'GaC64', mast: 'G430R', boom: 'B3160',
            distance: 9.2, time: 1814, value: 6, windDirection: 'Poniente', windPressure: 15, temperature: 20, username: defaultUserName
        },{
            date: new Date('2016-12-08'), spot: 'Almerimar (Pinchos)', board: 'Rocket95', sail: 'GaC64', mast: 'G430R', boom: 'B3160',
            distance: 41.2, time: 7021, value: 9, windDirection: 'Levante', windPressure: 20, temperature: 20, username: defaultUserName
        },{
            date: new Date('2016-11-20'), spot: 'Almerimar (Camping)', board: 'RRDQuad83', sail: 'P7Slash52', mast: 'P400R', boom: 'B3140',
            distance: 25.31, time: 5295, value: 7, windDirection: 'Poniente', windPressure: 25, temperature: 22, username: defaultUserName
        },{
            date: new Date('2016-11-05'), spot: 'Almerimar (Camping)', board: 'RRDQuad83', sail: 'GaMa47', mast: 'P400R', boom: 'B3140',
            distance: 53.94, time: 10277, value: 9, windDirection: 'Poniente', windPressure: 30, temperature: 21, username: defaultUserName
        }];

    })(module.exports);
