describe ('boardsEditorView', function() {

    var boardData = { "id": 1000, "name": "board1", "username": "anyUserName"},
        savedSpotData = { "id": 1000, "name": "board1-saved", "username": "anyUserName"};

    
    beforeEach(function() {
        angular.module('ui.bootstrap',[]);
        angular.module('ui-notification',[]);

        module('boardsEditorViewModule');
    });

    it('should be able to test', function() {
        expect(true).toBeTruthy();
    });

    describe('boardsEditorViewController', function() {

        var ctrl, $scope, $controller, $routeParamsMock;

        describe('when creating a new board', function() {

            beforeEach(inject(function(_$controller_) {
                $controller = _$controller_; 
                $scope = {};
                $routeParamsMock = { userName: 'anyUserName', boardId: '0'};

                ctrl = $controller('boardsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification});
            }));

            it('should create the controller', function() {        
                expect(ctrl).toBeDefined();
            });

            it('should prepare a new board to be used by the controller', function() {        
                expect($scope.board.updated).toBeDefined();
                expect($scope.board.userName).toBe('anyUserName');
                expect($scope.board.active).toBe(false);
            });
        });

        describe('when loading an existing board', function() {
            var httpMock;

            beforeEach(inject(function(_$controller_, $httpBackend) {
                $controller = _$controller_;                
                
                $routeParamsMock = { userName: 'anyUserName', boardId: '1000'};

                httpMock = $httpBackend;
                
                ctrl = $controller('boardsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification});
            }));            

            describe('with a success GET call', function() {

                beforeEach(function(){                    
                    httpMock.expectGET('/api/boards/anyUserName/1000').respond(boardData);                                        
                });

                it('should load the board to be updated', function() {        
                    httpMock.flush();      
                    expect($scope.board).toEqual(boardData);
                });
            });

            describe('with a failure GET call', function() {

                var NotificationMock;

                beforeEach(function(){
                    notificationMock = Notification;
                    notificationMock.error = function () {};
                    spyOn(notificationMock,'error');                    
                    httpMock.expectGET('/api/boards/anyUserName/1000').respond(500,'Error getting board.');                                        
                });

                it('should get an error using Notification', function() {        
                    httpMock.flush();      
                    expect(Notification.error).toHaveBeenCalled();
                });
            });
        });

        describe('when saving a board', function() {
            var httpMock;

            beforeEach(inject(function(_$controller_, $httpBackend) {
                $controller = _$controller_;                
                notificationMock = Notification;
                notificationMock.success = function () {};
                spyOn(notificationMock,'success');
                $routeParamsMock = { userName: 'anyUserName', boardId: '1000'};               

                httpMock = $httpBackend;
                
                ctrl = $controller('boardsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification});
            }));

            describe('with a success POST call', function() {

                beforeEach(function(){
                    boardData.updated = undefined;
                    boardData.purchase = undefined;
                    httpMock.expectPOST('/api/boards', savedSpotData).respond(200,savedSpotData);
                });

                it('should save the board', function() {
                    $scope.board.name = 'board1-saved';    
                    $scope.saveItem();
                    $scope.board.updated = undefined; //This is to avoid problems with milisecs.
                    $scope.board.purchase = undefined;
                    httpMock.flush();                         
                    expect($scope.board.name).toEqual('board1-saved');
                });

                it('should activate the busy indicator before save', function() {
                    $scope.board.name = 'board1-saved';    
                    $scope.saveItem();
                    $scope.board.updated = undefined; //This is to avoid problems with milisecs.
                    $scope.board.purchase = undefined;
                    expect($scope.busyIndicator).toBeTruthy();
                    httpMock.flush();                                             
                });

                it('should get a Notification success message', function() {
                    $scope.board.name = 'board1-saved';    
                    $scope.saveItem();
                    $scope.board.updated = undefined; //This is to avoid problems with milisecs.
                    $scope.board.purchase = undefined;
                    httpMock.flush();                         
                    expect(Notification.success).toHaveBeenCalled();
                });

                it('should deactivate the busy indicator after save', function() {
                    $scope.board.name = 'board1-saved';    
                    $scope.saveItem();
                    $scope.board.updated = undefined; //This is to avoid problems with milisecs.                    
                    $scope.board.purchase = undefined;
                    httpMock.flush();
                    expect($scope.busyIndicator).toBeFalsy();
                });
            });
        });
    });
});