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
            name: 'Titan', model: 'Titan', brand: 'Naish', volume: 110, length: 252, width: 0, year: '2004',
            purchase: new Date('2016-04-02'), price: 160, secondHand: true, active: true, username: defaultUserName, 
            maxSpeed: 44.40, avgSpeed: 25, distance: 599.87, time: 143572, sessions: 32
        },{
            name: 'Rocket95', model: 'Rocket', brand: 'Tabou', volume: 95, length: 237, width: 58, year: '2010',
            purchase: new Date('2016-5-27'), price: 350, secondHand: true, active: true, username: defaultUserName,
            maxSpeed: 46.10, avgSpeed: 24, distance: 474.05, time: 96823, sessions: 21            
        },{
            name: 'RRDQuad83', model: 'WaveCult LTD 83', brand: 'RRD', volume: 83, length: 230, width: 59, year: '2014',
            purchase: new Date('2016-9-5'), price: 350, secondHand: true, active: true, username: defaultUserName,
            maxSpeed: 38.20, avgSpeed: 19.20, distance: 240.78, time: 47748, sessions: 7
        },{
            name: 'NaishWave', model: 'Naish 8.5', brand: 'Mistral', volume: 85, length: 256, width: 56, year: '2000',
            purchase: new Date('2016-4-30'), price: 0, secondHand: true, active: false, username: defaultUserName,
            maxSpeed: 46.20, avgSpeed: 18.90, distance: 52.32, time: 10675, sessions: 3
        },{
            name: 'isonic111', model: 'iSonic', brand: 'Starboard', volume: 111, length: 236, width: 68, year: '2008',
            purchase: new Date('2017-5-26'), price: 450, secondHand: true, active: true, username: defaultUserName,
            maxSpeed: 49.7, avgSpeed: 18.90, distance: 52.32, time: 10675, sessions: 3
        }];

    seedData.initialSails = [{
            name: 'Gun35', model: 'Steel', brand: 'Gun', size: 3.5, mast: 370, boom: 142, adapter: -10, year: '2010', battens: 4, cams: 0,
            imcs: 17, purchase: new Date('2017-2-16'), price: 85, secondHand: true, active: true, username: defaultUserName
        }, {
            name: 'Hot42', model: 'Legend', brand: 'Hot Sails Maui', size: 4.2, mast: 370, boom: 155, adapter: 28, year: '2008', battens: 5, cams: 0,
            imcs: 18, purchase: new Date('2016-2-25'), price: 80, secondHand: true, active: false, username: defaultUserName
        },{
            name: 'NaishF42', model: 'Force', brand: 'Naish', size: 4.2, mast: 370, boom: 155, adapter: 28, year: '2011', battens: 5, cams: 0,
            imcs: 18, purchase: new Date('2017-2-11'), price: 130, secondHand: true, active: true, username: defaultUserName
        }, {
            name: 'NaishF47', model: 'Force', brand: 'Naish', size: 4.7, mast: 400, boom: 165, adapter: 12, year: '2011', battens: 5, cams: 0,
            imcs: 21, purchase: new Date('2017-2-11'), price: 130, secondHand: true, active: true, username: defaultUserName
        }, {
            name: 'GaMa47', model: 'Manic', brand: 'Gaastra', size: 4.7, mast: 400, boom: 165, adapter: 12, year: '2004', battens: 5, cams: 0,
            imcs: 21, purchase: new Date('2016-5-09'), price: 90, secondHand: true, active: false, username: defaultUserName
        },{
            name: 'P7Slash52', model: 'Slash', brand: 'Point7', size: 5.2, mast: 400, boom: 163, adapter: 9.5, year: '2014', battens: 5, cams: 0,
            imcs: 21, purchase: new Date('2016-4-15'), price: 225, secondHand: true, active: true, username: defaultUserName
        }, {
            name: 'P7Sado59', model: 'Sado', brand: 'Point7', size: 5.9, mast: 430, boom: 175, adapter: 9.5, year: '2014', battens: 5, cams: 0,
            imcs: 21, purchase: new Date('2016-4-15'), price: 275, secondHand: true, active: true, username: defaultUserName
        },{
            name: 'GaC64', model: 'Cross', brand: 'Gaastra', size: 6.4, mast: 430, boom: 192, adapter: 22.5, year: '2014', battens: 6, cams: 0,
            imcs: 21, purchase: new Date('2016-6-20'), price: 180, secondHand: true, active: false, username: defaultUserName
        },{
            name: 'P7ACX7', model: 'ACX', brand: 'Point7', size: 7.0, mast: 460, boom: 240, adapter: 9.5, year: '2017', battens: 7, cams: 0,
            imcs: 21, purchase: new Date('2017-6-08'), price: 550, secondHand: false, active: true, username: defaultUserName
        }];

    seedData.initialMasts = [{
            name: 'N380S', model: 'Xcelerator', brand: 'North', carbon: 100, length: 380, type: "SDM", imcs: 17, year: '2008',
            purchase: new Date('2016-2-25'), price: 80, secondHand: true, active: true, username: defaultUserName
        }, {
            name: 'P400R', model: 'P400RDM', brand: 'Point7', carbon: 50, length: 400, type: "RDM", imcs: 21, year: '2014',
            purchase: new Date('2016-4-15'), price: 150, secondHand: true, active: true, username: defaultUserName
        }, {
            name: 'G430R', model: 'Cross', brand: 'Gun', carbon: 60, length: 430, type: "RDM", imcs: 21, year: '2016',
            purchase: new Date('2016-6-14'), price: 240, secondHand: false, active: true, username: defaultUserName
        }, {
            name: 'Mi460', model: 'Wave', brand: 'Mistral', carbon: 10, length: 460, type: "SDM", imcs: 24, year: '1990',
            purchase: new Date('1993-4-20'), price: 100, secondHand: true, active: false, username: defaultUserName
        }];

    seedData.initialBooms = [{
            name: 'B3140', model: 'Wave', brand: 'B3', maxLength: 140, minLength: 190, type: "Aluminium", year: '2016',
            purchase: new Date('2016-4-16'), price: 127.76, secondHand: false, active: true, username: defaultUserName
        }, {
            name: 'B3160', model: 'Wave', brand: 'B3', maxLength: 160, minLength: 210, type: "Aluminium", year: '2016',
            purchase: new Date('2016-6-14'), price: 127.76, secondHand: false, active: true, username: defaultUserName
        }, {
            name: 'NPW', model: 'Wave', brand: 'Neilpride', maxLength: 160, minLength: 210, type: "Aluminium", year: '2008',
            purchase: new Date('2016-2-25'), price: 20, secondHand: true, active: false, username: defaultUserName
        }];

    seedData.initialSpots = [
        { name: 'Torrenueva', city: 'Torrenueva', province: 'Granada', country: 'Spain', active: true, username: defaultUserName,
          lat: 36.69801666837331, long: -3.482644557952881 },
        { name: 'Torrenueva (Futbol)', city: 'Torrenueva', province: 'Granada', country: 'Spain', active: true, username: defaultUserName,
          lat: 36.70777110454221, long: -3.4965880215168 },
        { name: 'Rules', city: '', province: 'Granada', country: 'Spain', active: true, username: defaultUserName,
          lat: 36.871527372554866, long: -3.482368290424347 },
        { name: 'AWA', city: 'Motril', province: 'Granada', country: 'Spain', active: true, username: defaultUserName,
          lat: 36.714548590417635, long: -3.5529452562332153 },
        { name: 'Azucenas', city: 'Motril', province: 'Granada', country: 'Spain', active: true, username: defaultUserName,
          lat: 36.71098575438381, long: -3.49970743060112 },
        { name: 'Ponde', city: 'Almuñecar', province: 'Granada', country: 'Spain', active: true, username: defaultUserName,
          lat: 36.730500844777204, long: -3.6841481924057007 },
        { name: 'Valdevaqueros', city: 'Tarifa', province: 'Cádiz', country: 'Spain', active: true, username: defaultUserName,
          lat: 36.0663764741249, long: -5.684094429016113 },
        { name: 'Lances Norte', city: 'Tarifa', province: 'Cádiz', country: 'Spain', active: true, username: defaultUserName,
          lat: 36.04502188387152, long: -5.6370484828948975 },
        { name: 'ArteVida', city: 'Tarifa', province: 'Cádiz', country: 'Spain', active: true, username: defaultUserName,
          lat: 36.05172725943047, long: -5.647417902946472 },
        { name: 'Almerimar (Victor Center)', city: 'El Ejido', province: 'Almería', country: 'Spain', active: true, username: defaultUserName,
          lat: 36.70085216285717, long: -2.7995040267705917 },
        { name: 'Almerimar (Camping)', city: 'El Ejido', province: 'Almería', country: 'Spain', active: true, username: defaultUserName,
          lat: 36.70684431429625, long: -2.8148965537548065 },
        { name: 'Almerimar (Pinchos)', city: 'El Ejido', province: 'Almería', country: 'Spain', active: true, username: defaultUserName,
          lat: 36.70434773090518, long: -2.8321096301078796 },
        { name: 'Almerimar (Culoperro)', city: 'El Ejido', province: 'Almería', country: 'Spain', active: true, username: defaultUserName,
          lat: 36.70081237848548, long: -2.8385764360427856 },
        { name: 'Castel', city: 'Castell de Ferro', province: 'Granada', country: 'Spain', active: true, username: defaultUserName,
          lat: 36.720009708134434, long: -3.360695242881775 },
        { name: 'Bocana', city: '', province: 'Nador', country: 'Morocco', active: false, username: defaultUserName,
          lat: 35.21968793472027, long: -2.8782784938812256 }
        ];

     seedData.initialSessions = [{
/*            date: new Date('2016-12-08'), spot: 'Almerimar (Pinchos)', board: 'Rocket95', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 41.2, avgSpeed: 23, distance: 41.2, time: 7021, value: 9, windDirection: 'Levante', windPressure: 20, temperature: 20, 
            comment: 'Levante moderado con mucho choppy. Muy divertido',
            username: defaultUserName
        },{
            date: new Date('2016-11-20'), spot: 'Almerimar (Camping)', board: 'RRDQuad83', sail: 'P7Slash52', mast: 'P400R', boom: 'B3140', 
            maxSpeed: 36.7, avgSpeed: 15.8, distance: 25.31, time: 5295, value: 7, windDirection: 'Poniente', windPressure: 25, temperature: 22, 
            comment: 'Poniente flojo a medio/fuerte, con ola grande fuera y mediana en orilla.',
            username: defaultUserName
        },{
            date: new Date('2016-11-05'), spot: 'Almerimar (Camping)', board: 'RRDQuad83', sail: 'GaMa47', mast: 'P400R', boom: 'B3140',
            maxSpeed: 36.7, avgSpeed: 18.9, distance: 53.94, time: 10277, value: 9, windDirection: 'Poniente', windPressure: 30, temperature: 21, 
            comment: 'Poniente medio a fuerte con poca ola.',
            username: defaultUserName
        },{*/
            date: new Date('2017-02-27'), spot: 'Castel', board: 'Titan', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 40.8, avgSpeed: 19, distance: 9.2, time: 1814, value: 6, windDirection: 'Poniente', windPressure: 15, temperature: 20, 
            comment: 'Muy racheado en la orilla y mas fuerte con olas dentro. Se acabó pronto.',
            username: defaultUserName
        },{
            date: new Date('2017-03-17'), spot: 'Azucenas', board: 'Rocket95', sail: 'NaishF47', mast: 'P400R', boom: 'B3140',
            maxSpeed: 38.2, avgSpeed: 10.7, distance: 3, time: 960, value: 6, windDirection: 'Levante', windPressure: 40, temperature: 20, 
            comment: 'Rachas muy muy fuertes.',
            username: defaultUserName
        },{
            date: new Date('2017-03-17'), spot: 'Azucenas', board: 'RRDQuad83', sail: 'NaishF42', mast: 'N380S', boom: 'B3140',
            maxSpeed: 38.2, avgSpeed: 10.7, distance: 2.7, time: 963, value: 3, windDirection: 'Levante', windPressure: 40, temperature: 20, 
            comment: 'Rachas muy muy fuertes. (continuación de anterior sesión)',
            username: defaultUserName
        },{
            date: new Date('2017-03-18'), spot: 'Almerimar (Camping)', board: 'Titan', sail: 'P7Sado59', mast: 'P400R', boom: 'B3140', 
            maxSpeed: 33.8, avgSpeed: 10.2, distance: 19.7, time: 6951, value: 6, windDirection: 'Levante', windPressure: 30, temperature: 20, 
            comment: 'Racheado con muchos agujeros.',
            username: defaultUserName
        },{
            date: new Date('2017-03-26'), spot: 'Torrenueva (Futbol)', board: 'Titan', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 44.4, avgSpeed: 25, distance: 54.7, time: 6616, value: 10, windDirection: 'Levante', windPressure: 36, temperature: 18, 
            comment: 'Perfecto, plano y con viento constante.',
            username: defaultUserName
        },{
            date: new Date('2017-04-01'), spot: 'Ponde', board: 'Titan', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 40.7, avgSpeed: 18.1, distance: 22.2, time: 4549, value: 7, windDirection: 'Poniente', windPressure: 25, temperature: 20, 
            comment: 'Mucha ola. Flojo al principio, bueno después, y me salgo porque baja',
            username: defaultUserName
        },{
            date: new Date('2017-04-07'), spot: 'Torrenueva', board: 'Titan', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 32.9, avgSpeed: 12.9, distance: 9.97, time: 2852, value: 3, windDirection: 'Levante', windPressure: 15, temperature: 20, 
            comment: 'Mucha ola, muy racheado y flojo.',
            username: defaultUserName
        },{
            date: new Date('2017-04-09'), spot: 'Almerimar (Culoperro)', board: 'Rocket95', sail: 'P7Slash52', mast: 'P400R', boom: 'B3140', 
            maxSpeed: 37.3, avgSpeed: 18.4, distance: 30, time: 5870, value: 7, windDirection: 'Levante', windPressure: 35, temperature: 21, 
            comment: 'Levante subiendo sin ola.',
            username: defaultUserName
        },{
            date: new Date('2017-04-09'), spot: 'Almerimar (Culoperro)', board: 'RRDQuad83', sail: 'P7Slash52', mast: 'P400R', boom: 'B3140', 
            maxSpeed: 37.3, avgSpeed: 18.4, distance: 36.7, time: 7200, value: 9, windDirection: 'Levante', windPressure: 40, temperature: 20, 
            comment: 'Se pone bién y con ola de un metrillo buena para surfear al volver y para saltar al ir.',
            username: defaultUserName
        },{
            date: new Date('2017-04-13'), spot: 'Rules', board: 'Titan', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 40.8, avgSpeed: 15.1, distance: 21.4, time: 5153, value: 7, windDirection: 'SW', windPressure: 18, temperature: 26, 
            comment: 'Buen inicio de Rules.',
            username: defaultUserName
        },{
            date: new Date('2017-04-15'), spot: 'Rules', board: 'Titan', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 41.9, avgSpeed: 16.2, distance: 33.93, time: 7656, value: 8, windDirection: 'SW', windPressure: 22, temperature: 25, 
            comment: 'Sube poco a poco y al final mejor.',
            username: defaultUserName
        },{
            date: new Date('2017-04-16'), spot: 'Torrenueva', board: 'Titan', sail: 'P7Sado59', mast: 'G430R', boom: 'B3140', 
            maxSpeed: 37.9, avgSpeed: 19.2, distance: 23.99, time: 4579, value: 6, windDirection: 'Levante', windPressure: 36, temperature: 25, 
            comment: 'Empieza flojo y sube para luego bajar. Mucha ola dentro..',
            username: defaultUserName
        },{
            date: new Date('2017-04-22'), spot: 'Almerimar (Culoperro)', board: 'RRDQuad83', sail: 'NaishF47', mast: 'P400R', boom: 'B3140', 
            maxSpeed: 38.2, avgSpeed: 19.2, distance: 34.0, time: 6373, value: 7, windDirection: 'Levante', windPressure: 45, temperature: 21, 
            comment: 'Final de temporal de levante. Mucha ola para saltar y surfear.',
            username: defaultUserName
        },{
            date: new Date('2017-04-30'), spot: 'Almerimar (Camping)', board: 'RRDQuad83', sail: 'NaishF47', mast: 'P400R', boom: 'B3140', 
            maxSpeed: 35.8, avgSpeed: 17.6, distance: 42.47, time: 8537, value: 6, windDirection: 'Poniente', windPressure: 50, temperature: 19, 
            comment: 'Empieza flojo y va subiendo hasta estar muy pasado. Ola grande al final.',
            username: defaultUserName
        },{
            date: new Date('2017-05-01'), spot: 'Torrenueva', board: 'Titan', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 44, avgSpeed: 25.4, distance: 10, time: 1800, value: 8, windDirection: 'Levante', windPressure: 35, temperature: 20, 
            comment: 'Plano y constante para slalom. Cambio a la rocket',
            username: defaultUserName
        },{
            date: new Date('2017-05-01'), spot: 'Torrenueva', board: 'Rocket95', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 45.3, avgSpeed: 25.4, distance: 28.2, time: 3621, value: 9, windDirection: 'Levante', windPressure: 35, temperature: 20, 
            comment: 'Plano y constante para slalom.',
            username: defaultUserName
        },{
            date: new Date('2017-05-05'), spot: 'Rules', board: 'Titan', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 47.7, avgSpeed: 21.4, distance: 36.61, time: 6367, value: 9, windDirection: 'SW', windPressure: 35, temperature: 22, 
            comment: 'Se para al poco de empezar y despues se pone muy fuerte.',
            username: defaultUserName
        },{
            date: new Date('2017-05-07'), spot: 'Rules', board: 'Titan', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 36.2, avgSpeed: 13.1, distance: 14.71, time: 4047, value: 4, windDirection: 'SW', windPressure: 20, temperature: 19, 
            comment: 'Se para al poco de empezar y despues se pone muy fuerte.',
            username: defaultUserName
        },{
            date: new Date('2017-05-12'), spot: 'Ponde', board: 'Titan', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 34.4, avgSpeed: 11.18, distance: 5.45, time: 1698, value: 2, windDirection: 'Poniente', windPressure: 15, temperature: 20, 
            comment: 'Empieza muy bién y dura un largo. Planísimo.',
            username: defaultUserName
        },{
            date: new Date('2017-05-13'), spot: 'Castel', board: 'Rocket95', sail: 'P7Slash52', mast: 'P400R', boom: 'B3140', 
            maxSpeed: 34.5, avgSpeed: 10.5, distance: 1.79, time: 616, value: 0, windDirection: 'Poniente', windPressure: 30, temperature: 21, 
            comment: 'Muy racheado y soplando mal en la salida. Me salgo y me voy a la Ponde',
            username: defaultUserName
        },{
            date: new Date('2017-05-13'), spot: 'Ponde', board: 'Titan', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 41.4, avgSpeed: 23.8, distance: 21, time: 3192, value: 8, windDirection: 'Poniente', windPressure: 30, temperature: 21, 
            comment: 'Muy Plano perfecto.',
            username: defaultUserName
        },{
            date: new Date('2017-05-13'), spot: 'Ponde', board: 'Rocket95', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 41.4, avgSpeed: 25.8, distance: 21.9, time: 3192, value: 9, windDirection: 'Poniente', windPressure: 35, temperature: 21, 
            comment: 'Muy Plano perfecto y empieza a subir hasta ir pasado al final.',
            username: defaultUserName
        },{
            date: new Date('2017-05-19'), spot: 'Torrenueva', board: 'Rocket95', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 44.7, avgSpeed: 25.5, distance: 54.43, time: 7691, value: 9, windDirection: 'Levante', windPressure: 40, temperature: 23, 
            comment: 'Muy plano y perfecto. Al final pierdo la aleta y me vuelvo como puedo.',
            username: defaultUserName
        },{
            date: new Date('2017-05-21'), spot: 'Almerimar (Culoperro)', board: 'RRDQuad83', sail: 'NaishF42', mast: 'P400R', boom: 'B3140', 
            maxSpeed: 31.5, avgSpeed: 16.9, distance: 3.66, time: 777, value: 8, windDirection: 'Levante', windPressure: 50, temperature: 24, 
            comment: 'Racheado entro con 4,2 y salgo a cambiar.',
            username: defaultUserName
        },{
            date: new Date('2017-05-21'), spot: 'Almerimar (Culoperro)', board: 'RRDQuad83', sail: 'NaishF47', mast: 'P400R', boom: 'B3140', 
            maxSpeed: 38.2, avgSpeed: 22.5, distance: 28.06, time: 4616, value: 9, windDirection: 'Levante', windPressure: 60, temperature: 24, 
            comment: 'Racheado cambio a 4.7 y vuelve a subir. Pasado pero bién.',
            username: defaultUserName
        },{
            date: new Date('2017-05-26'), spot: 'Rules', board: 'Titan', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 38.8, avgSpeed: 12.5, distance: 23.66, time: 7181, value: 4, windDirection: 'SW', windPressure: 25, temperature: 30, 
            comment: 'Muy flojo con planeos y zonas paradas.',
            username: defaultUserName
        },{
            date: new Date('2017-05-28'), spot: 'Rules', board: 'isonic111', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 49.7, avgSpeed: 20.8, distance: 37.15, time: 6545, value: 8, windDirection: 'SW', windPressure: 35, temperature: 28, 
            comment: 'Muy fuerte y al final se quita.',
            username: defaultUserName
        },{
            date: new Date('2017-06-02'), spot: 'Rules', board: 'isonic111', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 41.7, avgSpeed: 13.6, distance: 27.97, time: 7362, value: 4, windDirection: 'SW', windPressure: 20, temperature: 28, 
            comment: 'Muy flojo con planeos y zonas paradas.',
            username: defaultUserName
        },{
            date: new Date('2017-06-03'), spot: 'Rules', board: 'isonic111', sail: 'GaC64', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 46.6, avgSpeed: 20.0, distance: 60.47, time: 10902, value: 8, windDirection: 'SW', windPressure: 30, temperature: 31, 
            comment: 'Fuerte con un parón en medio.',
            username: defaultUserName
        },{
            date: new Date('2017-06-09'), spot: 'Rules', board: 'isonic111', sail: 'P7ACX7', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 42.4, avgSpeed: 18.9, distance: 52.21, time: 9924, value: 8, windDirection: 'SW', windPressure: 20, temperature: 25, 
            comment: 'Empieza flojo y sube hasta ponerse bien para la 7.',
            username: defaultUserName
        },{
            date: new Date('2017-06-11'), spot: 'Rules', board: 'isonic111', sail: 'P7ACX7', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 48.1, avgSpeed: 23.7, distance: 52.69, time: 7993, value: 8, windDirection: 'SW', windPressure: 25, temperature: 32, 
            comment: 'Muy constante con una subida en medio.',
            username: defaultUserName
        },{
            date: new Date('2017-06-15'), spot: 'Rules', board: 'isonic111', sail: 'P7ACX7', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 47.8, avgSpeed: 26.3, distance: 73.98, time: 10529, value: 10, windDirection: 'SW', windPressure: 25, temperature: 31, 
            comment: 'Muy constante y me salgo y sigue.',
            username: defaultUserName
        },{
            date: new Date('2017-06-16'), spot: 'Rules', board: 'isonic111', sail: 'P7ACX7', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 48.8, avgSpeed: 24.8, distance: 37.73, time: 5576, value: 7, windDirection: 'SW', windPressure: 30, temperature: 31, 
            comment: 'Empieza muy fuerte, al limite de ir pasado y va bajando hasta que llueve.',
            username: defaultUserName
        },{
            date: new Date('2017-06-18'), spot: 'Rules', board: 'isonic111', sail: 'P7ACX7', mast: 'G430R', boom: null, 
            maxSpeed: 38.1, avgSpeed: 18.1, distance: 20, time: 3600, value: 2, windDirection: 'SW', windPressure: 20, temperature: 27, 
            comment: 'Manu me deja una botavara ancha para probar. Me dejo el Garmin. Se para..',
            username: defaultUserName
        },{
            date: new Date('2017-06-23'), spot: 'Rules', board: 'isonic111', sail: 'P7ACX7', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 46.7, avgSpeed: 22.4, distance: 36.46, time: 5921, value: 8, windDirection: 'SW', windPressure: 25, temperature: 35, 
            comment: 'Viento fuerte a ratos y aflojando poco a poco.',
            username: defaultUserName
        },{
            date: new Date('2017-06-25'), spot: 'Rules', board: 'isonic111', sail: 'P7ACX7', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 46.7, avgSpeed: 22.4, distance: 34.45, time: 5784, value: 7, windDirection: 'SW', windPressure: 30, temperature: 38, 
            comment: 'Viento muy fuerte y bajones totales de viento',
            username: defaultUserName
        },{
            date: new Date('2017-06-30'), spot: 'Rules', board: 'isonic111', sail: 'P7ACX7', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 50.1, avgSpeed: 21.5, distance: 36.85, time: 6242, value: 7, windDirection: 'SW', windPressure: 35, temperature: 25, 
            comment: 'Super rachas y parones',
            username: defaultUserName
        },{
            date: new Date('2017-07-02'), spot: 'Torrenueva (Futbol)', board: 'Rocket95', sail: 'P7Sado59', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 42.7, avgSpeed: 19.3, distance: 4.88, time: 969, value: 6, windDirection: 'Levante', windPressure: 60, temperature: 27, 
            comment: 'Super rachas y parones',
            username: defaultUserName
        },{
            date: new Date('2017-07-02'), spot: 'Rules', board: 'isonic111', sail: 'P7ACX7', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 47, avgSpeed: 19.2, distance: 30.29, time: 5717, value: 6, windDirection: 'SW', windPressure: 20, temperature: 28, 
            comment: 'Super rachas y parones',
            username: defaultUserName
        },{
            date: new Date('2017-07-7'), spot: 'Rules', board: 'isonic111', sail: 'P7ACX7', mast: 'G430R', boom: 'B3160', 
            maxSpeed: 46.4, avgSpeed: 22.8, distance: 44.8, time: 7088, value: 7, windDirection: 'SW', windPressure: 25, temperature: 27, 
            comment: 'Super rachas y parones',
            username: defaultUserName
        }]

    })(module.exports);
