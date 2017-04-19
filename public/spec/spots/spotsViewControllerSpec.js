describe ('spotsView', function() {

    var spotsData = [
        { "ID": 1, "Name": "spot1" },
        { "ID": 2, "Name": "spot2" },
        { "ID": 3, "Name": "spot3" }
    ];        

    beforeEach(function() {    
        angular.module('ui.bootstrap',[]);
        angular.module('smart-table',[]);
        angular.module('ui-notification',[]);         

        module('spotsViewModule');
    });    

    it('should be able to test', function() {
        expect(true).toBeTruthy();
    });

    describe('spotsViewController', function() {

        var ctrl, $scope, $controller, windowMock, httpMock;

        beforeEach(inject(function(_$controller_, $httpBackend) {
            $controller = _$controller_; 
            $scope = {};
            
            httpMock = $httpBackend;
            
            windowMock =  { location: {hash : '#/anyUserName'} };

            ctrl = $controller('spotsViewController', {$scope: $scope, $window: windowMock, Notification});
        }));

        it('should create the controller', function() {        
            expect(ctrl).toBeDefined();
        });

        it('should get 10 items per page', function() {        
            expect($scope.itemsByPage).toBe(10);
        });

        it('should get 5 pages of items', function() {        
            expect($scope.numberOfPages).toBe(5);
        });

        it('should get the user name from the url', function() {        
            expect($scope.userName).toBe('anyUserName');
        });

        it('should activate the busy indicator before getting the spots', function() {        
            expect($scope.busyIndicator).toBeTruthy();
        });        

        describe ('after calling to get spots with a success call', function() {

            beforeEach(function(){
                httpMock.expectGET('/api/spots/anyUserName').respond(spotsData);
            });

            it('should get the expected data', function() {
                httpMock.flush();      
                expect($scope.spots).toEqual(spotsData);
            });

            it('should deactivate the busy indicator after getting the spots', function() {
                httpMock.flush();         
                expect($scope.busyIndicator).toBeFalsy();
            });
        });

        describe ('after calling to get spots with a failure call', function() {

            var notificationMock;

            beforeEach(function(){
                notificationMock = Notification;
                notificationMock.error = function () {};
                spyOn(notificationMock,'error');
                httpMock.expectGET('/api/spots/anyUserName').respond(500, 'Error getting data.');
            });

            it('should get an error using Notification', function() {
                httpMock.flush();      
                expect(Notification.error).toHaveBeenCalled();
            });
        });        
    });    
});