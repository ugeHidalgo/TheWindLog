describe ('boardsView', function() {

    var boardsData = [
        { "id": 1, "name": "board1" },
        { "id": 2, "name": "board2" },
        { "id": 3, "name": "board3" }
    ];        

    beforeEach(function() {    
        angular.module('ui.bootstrap',[]);
        angular.module('smart-table',[]);
        angular.module('ui-notification',[]);         

        module('boardsViewModule');
    });    

    it('should be able to test', function() {
        expect(true).toBeTruthy();
    });

    describe('boardsViewController', function() {

        var ctrl, $scope, $controller, windowMock, httpMock;

        beforeEach(inject(function(_$controller_, $httpBackend) {
            $controller = _$controller_; 
            $scope = {};
            
            httpMock = $httpBackend;
            
            windowMock =  { location: {hash : '#/anyUserName'} };

            ctrl = $controller('boardsViewController', {$scope: $scope, $window: windowMock, Notification});
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

        it('should activate the busy indicator before getting the boards', function() {        
            expect($scope.busyIndicator).toBeTruthy();
        });        

        describe ('after calling to get boards with a success call', function() {

            beforeEach(function(){
                httpMock.expectGET('/api/boards/anyUserName').respond(boardsData);
            });

            it('should get the expected data', function() {
                httpMock.flush();      
                expect($scope.boards).toEqual(boardsData);
            });

            it('should deactivate the busy indicator after getting the boards', function() {
                httpMock.flush();         
                expect($scope.busyIndicator).toBeFalsy();
            });
        });

        describe ('after calling to get boards with a failure call', function() {

            var notificationMock;

            beforeEach(function(){
                notificationMock = Notification;
                notificationMock.error = function () {};
                spyOn(notificationMock,'error');
                httpMock.expectGET('/api/boards/anyUserName').respond(500, 'Error getting data.');
            });

            it('should get an error using Notification', function() {
                httpMock.flush();      
                expect(Notification.error).toHaveBeenCalled();
            });
        });        
    });    
});