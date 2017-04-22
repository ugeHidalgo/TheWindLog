describe ('sessionsEditorView', function() {

    var sessionData = { "id": 1000, "name": "session1", "username": "anyUserName"},
        spotsData = [{ "id": 1000, "name": "spot1", "username": "anyUserName"},
                     { "id": 1001, "name": "spot2", "username": "anyUserName"} ],
        boardsData = [{ "id": 1000, "name": "board1", "username": "anyUserName"},
                     { "id": 1001, "name": "board2", "username": "anyUserName"} ],
        sailsData = [{ "id": 1000, "name": "sails1", "username": "anyUserName"},
                     { "id": 1001, "name": "sails2", "username": "anyUserName"} ],
        mastsData = [{ "id": 1000, "name": "masts1", "username": "anyUserName"},
                     { "id": 1001, "name": "masts2", "username": "anyUserName"} ],
        boomsData = [{ "id": 1000, "name": "booms1", "username": "anyUserName"},
                     { "id": 1001, "name": "booms2", "username": "anyUserName"} ],
        savedSpotData = { "id": 1000, "name": "session1-saved", "username": "anyUserName"};

    
    beforeEach(function() {
        angular.module('ui.bootstrap',[]);
        angular.module('ui-notification',[]);

        module('sessionsEditorViewModule');
    });

    it('should be able to test', function() {
        expect(true).toBeTruthy();
    });

    describe('sessionsEditorViewController', function() {

        var ctrl, $scope, $controller, $routeParamsMock, httpMock;

        describe('when creating a new session', function() {

            beforeEach(inject(function(_$controller_, $httpBackend) {
                $controller = _$controller_; 
                $scope = {};
                $routeParamsMock = { userName: 'anyUserName', sessionId: '0'};
                httpMock = $httpBackend;

                ctrl = $controller('sessionsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification});

                httpMock.expectGET('/api/spots/anyUserName').respond(spotsData);
                httpMock.expectGET('/api/boards/anyUserName').respond(boardsData);
                httpMock.expectGET('/api/sails/anyUserName').respond(sailsData);
                httpMock.expectGET('/api/booms/anyUserName').respond(boomsData);
                httpMock.expectGET('/api/masts/anyUserName').respond(mastsData);
            }));

            it('should create the controller', function() {        
                expect(ctrl).toBeDefined();
            });

            it('should load data for spots, boards, sails, booms and masts', function() {        
                
                httpMock.flush();
                expect($scope.spots.length).toBe(2);
                expect($scope.boards.length).toBe(2);
                expect($scope.sails.length).toBe(2);
                expect($scope.masts.length).toBe(2);
                expect($scope.booms.length).toBe(2);
            });

            /*it('should prepare a new session to be used by the controller', function() {        
                
                httpMock.flush();
                expect($scope.session.updated).toBeDefined();
                expect($scope.session.userName).toBe('anyUserName');
                expect($scope.session.active).toBe(false);
            });*/
        });

        describe('when loading an existing session', function() {
            var httpMock;

            beforeEach(inject(function(_$controller_, $httpBackend) {
                $controller = _$controller_;                
                
                $routeParamsMock = { userName: 'anyUserName', sessionId: '1000'};

                httpMock = $httpBackend;
                
                ctrl = $controller('sessionsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification});
            }));            

            describe('with a success GET call', function() {

                beforeEach(function(){                    
                    httpMock.expectGET('/api/sessions/anyUserName/1000').respond(sessionData);                                        
                });

                /*it('should load the session to be updated', function() {        
                    httpMock.flush();      
                    expect($scope.session).toEqual(sessionData);
                });*/
            });

            describe('with a failure GET call', function() {

                var NotificationMock;

                beforeEach(function(){
                    notificationMock = Notification;
                    notificationMock.error = function () {};
                    spyOn(notificationMock,'error');                    
                    httpMock.expectGET('/api/sessions/anyUserName/1000').respond(500,'Error getting session.');                                        
                });

                /*it('should get an error using Notification', function() {        
                    httpMock.flush();      
                    expect(Notification.error).toHaveBeenCalled();
                });*/
            });
        });

        describe('when saving a session', function() {
            var httpMock;

            beforeEach(inject(function(_$controller_, $httpBackend) {
                $controller = _$controller_;                
                notificationMock = Notification;
                notificationMock.success = function () {};
                spyOn(notificationMock,'success');
                $routeParamsMock = { userName: 'anyUserName', sessionId: '1000'};               

                httpMock = $httpBackend;
                
                ctrl = $controller('sessionsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification});
            }));

            describe('with a success POST call', function() {

                beforeEach(function(){
                    sessionData.updated = undefined;
                    httpMock.expectPOST('/api/sessions', savedSpotData).respond(200,savedSpotData);
                });

                /*it('should save the session', function() {
                    $scope.session.name = 'session1-saved';    
                    $scope.saveItem();
                    $scope.session.updated = undefined; //This is to avoid problems with milisecs.
                    httpMock.flush();                         
                    expect($scope.session.name).toEqual('session1-saved');
                });

                it('should activate the busy indicator before save', function() {
                    $scope.session.name = 'session1-saved';    
                    $scope.saveItem();
                    $scope.session.updated = undefined; //This is to avoid problems with milisecs.
                    expect($scope.busyIndicator).toBeTruthy();
                    httpMock.flush();                                             
                });

                it('should get a Notification success message', function() {
                    $scope.session.name = 'session1-saved';    
                    $scope.saveItem();
                    $scope.session.updated = undefined; //This is to avoid problems with milisecs.
                    httpMock.flush();                         
                    expect(Notification.success).toHaveBeenCalled();
                });

                it('should deactivate the busy indicator after save', function() {
                    $scope.session.name = 'session1-saved';    
                    $scope.saveItem();
                    $scope.session.updated = undefined; //This is to avoid problems with milisecs.                    
                    httpMock.flush();
                    expect($scope.busyIndicator).toBeFalsy();
                });*/
            });
        });
    });
});