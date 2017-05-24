describe ('sessionsView', function() {

    var sessionsData = [
        { "id": 1, "name": "session1" },
        { "id": 2, "name": "session2" },
        { "id": 3, "name": "session3" }
    ];        

    beforeEach(function() {    
        angular.module('ui.bootstrap',[]);
        angular.module('smart-table',[]);
        angular.module('ui-notification',[]);         

        module('sessionsViewModule');
    });    

    it('should be able to test', function() {
        expect(true).toBeTruthy();
    });

    describe('sessionsViewController', function() {

        var ctrl, $scope, $controller, windowMock, httpMock;

        beforeEach(inject(function(_$controller_, $httpBackend) {
            $controller = _$controller_; 
            $scope = {};
            
            httpMock = $httpBackend;
            
            windowMock =  { location: {hash : '#/anyUserName'} };

            ctrl = $controller('sessionsViewController', {$scope: $scope, $window: windowMock, Notification});
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

        it('should activate the busy indicator before getting the sessions', function() {        
            expect($scope.busyIndicator).toBeTruthy();
        });        

        describe ('after calling to get sessions with a success call', function() {

            beforeEach(function(){
                httpMock.expectGET('/api/sessions/anyUserName').respond(sessionsData);
            });

            /*it('should get the expected data', function() {
                httpMock.flush();      
                expect($scope.sessions).toEqual(sessionsData);
            });*/

            it('should deactivate the busy indicator after getting the sessions', function() {
                httpMock.flush();         
                expect($scope.busyIndicator).toBeFalsy();
            });
        });

        describe ('after calling to get sessions with a failure call', function() {

            var notificationMock;

            beforeEach(function(){
                notificationMock = Notification;
                notificationMock.error = function () {};
                spyOn(notificationMock,'error');
                httpMock.expectGET('/api/sessions/anyUserName').respond(500, 'Error getting data.');
            });

            it('should get an error using Notification', function() {
                httpMock.flush();      
                expect(Notification.error).toHaveBeenCalled();
            });
        });        
    });    
});