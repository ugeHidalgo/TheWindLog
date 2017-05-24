var serverUrl = 'http://localhost:5000';
var request = require('request');

describe('spotsController tests', function() {

    var j = request.jar(),
       requestWithCookie = request.defaults({jar: j});   

    describe('when getting spots list', function() {

        it('should return a 200 status ', function(done) {
            var url = serverUrl + '/api/spots/ugehidalgo';

            requestWithCookie.post('http://localhost:5000/api/spots/ugehidalgo', {user: 'ugehidalgo', password: 'a'}, done);

            request.get(url, function(error, response, body) { 
                if (error) console.log(error.message);
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        /*it('should return a list with spots', function(done) {

            var url = serverUrl + '/api/spots/ugehidalgo';
            var data;
            request.get(url, function(error, response, body) {
                if (error) console.log(error.message);
                data = JSON.parse(body);
                expect(data.length).toBe(8);
                done();
            });
        });*/

    });

});