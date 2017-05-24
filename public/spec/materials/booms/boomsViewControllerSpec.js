describe ('boomsView', function() {

    var boomsData = [
        { "id": 1, "name": "boom1" },
        { "id": 2, "name": "boom2" },
        { "id": 3, "name": "boom3" }
    ];        

    beforeEach(function() {    
        angular.module('ui.bootstrap',[]);
        angular.module('smart-table',[]);
        angular.module('ui-notification',[]);         

        module('boomsViewModule');
    });    

    it('should be able to test', function() {
        expect(true).toBeTruthy();
    });

    describe('boomsViewController', function() {

        var ctrl, $scope, $controller, windowMock, httpMock;

        beforeEach(inject(function(_$controller_, $httpBackend) {
            $controller = _$controller_; 
            $scope = {};
            
            httpMock = $httpBackend;
            
            windowMock =  { location: {hash : '#/anyUserName'} };

            ctrl = $controller('boomsViewController', {$scope: $scope, $window: windowMock, Notification});
        }));

        it('should create the controller', function() {        
            expect(ctrl).toBeDefined();
        });

        it('should get 15 items per page', function() {        
            expect($scope.itemsByPage).toBe(15);
        });

        it('should get 5 pages of items', function() {        
            expect($scope.numberOfPages).toBe(5);
        });

        it('should get the user name from the url', function() {        
            expect($scope.userName).toBe('anyUserName');
        });

        it('should activate the busy indicator before getting the booms', function() {        
            expect($scope.busyIndicator).toBeTruthy();
        });        

        describe ('after calling to get booms with a success call', function() {

            beforeEach(function(){
                httpMock.expectGET('/api/booms/anyUserName').respond(boomsData);
            });

            /*it('should get the expected data', function() {
                httpMock.flush();      
                expect($scope.booms).toEqual(boomsData);
            });*/

            it('should deactivate the busy indicator after getting the booms', function() {
                httpMock.flush();         
                expect($scope.busyIndicator).toBeFalsy();
            });
        });

        describe ('after calling to get booms with a failure call', function() {

            var notificationMock;

            beforeEach(function(){
                notificationMock = Notification;
                notificationMock.error = function () {};
                spyOn(notificationMock,'error');
                httpMock.expectGET('/api/booms/anyUserName').respond(500, 'Error getting data.');
            });

            it('should get an error using Notification', function() {
                httpMock.flush();      
                expect(Notification.error).toHaveBeenCalled();
            });
        });        
    });    
});