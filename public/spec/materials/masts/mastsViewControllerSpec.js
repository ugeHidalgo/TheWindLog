describe ('mastsView', function() {

    var mastsData = [
        { "id": 1, "name": "mast1" },
        { "id": 2, "name": "mast2" },
        { "id": 3, "name": "mast3" }
    ];        

    beforeEach(function() {    
        angular.module('ui.bootstrap',[]);
        angular.module('smart-table',[]);
        angular.module('ui-notification',[]);         

        module('mastsViewModule');
    });    

    it('should be able to test', function() {
        expect(true).toBeTruthy();
    });

    describe('mastsViewController', function() {

        var ctrl, $scope, $controller, windowMock, httpMock;

        beforeEach(inject(function(_$controller_, $httpBackend) {
            $controller = _$controller_; 
            $scope = {};
            
            httpMock = $httpBackend;
            
            windowMock =  { location: {hash : '#/anyUserName'} };

            ctrl = $controller('mastsViewController', {$scope: $scope, $window: windowMock, Notification});
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

        it('should activate the busy indicator before getting the masts', function() {        
            expect($scope.busyIndicator).toBeTruthy();
        });        

        describe ('after calling to get masts with a success call', function() {

            beforeEach(function(){
                httpMock.expectGET('/api/masts/anyUserName').respond(mastsData);
            });

            /*it('should get the expected data', function() {
                httpMock.flush();      
                expect($scope.masts).toEqual(mastsData);
            });*/

            it('should deactivate the busy indicator after getting the masts', function() {
                httpMock.flush();         
                expect($scope.busyIndicator).toBeFalsy();
            });
        });

        describe ('after calling to get masts with a failure call', function() {

            var notificationMock;

            beforeEach(function(){
                notificationMock = Notification;
                notificationMock.error = function () {};
                spyOn(notificationMock,'error');
                httpMock.expectGET('/api/masts/anyUserName').respond(500, 'Error getting data.');
            });

            it('should get an error using Notification', function() {
                httpMock.flush();      
                expect(Notification.error).toHaveBeenCalled();
            });
        });        
    });    
});