describe ('sailsEditorView', function() {

    var sailData = { "id": 1000, "name": "sail1", "username": "anyUserName"},
        savedSpotData = { "id": 1000, "name": "sail1-saved", "username": "anyUserName"};

    
    beforeEach(function() {
        angular.module('ui.bootstrap',[]);
        angular.module('ui-notification',[]);

        module('sailsEditorViewModule');
    });

    it('should be able to test', function() {
        expect(true).toBeTruthy();
    });

    describe('sailsEditorViewController', function() {

        var ctrl, $scope, $controller, $routeParamsMock;

        describe('when creating a new sail', function() {

            beforeEach(inject(function(_$controller_) {
                $controller = _$controller_; 
                $scope = {};
                $routeParamsMock = { userName: 'anyUserName', sailId: '0'};

                ctrl = $controller('sailsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification});
            }));

            it('should create the controller', function() {        
                expect(ctrl).toBeDefined();
            });

            it('should prepare a new sail to be used by the controller', function() {        
                expect($scope.sail.updated).toBeDefined();
                expect($scope.sail.userName).toBe('anyUserName');
                expect($scope.sail.active).toBe(false);
            });
        });

        describe('when loading an existing sail', function() {
            var httpMock;

            beforeEach(inject(function(_$controller_, $httpBackend) {
                $controller = _$controller_;                
                
                $routeParamsMock = { userName: 'anyUserName', sailId: '1000'};

                httpMock = $httpBackend;
                
                ctrl = $controller('sailsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification});
            }));            

            describe('with a success GET call', function() {

                beforeEach(function(){                    
                    httpMock.expectGET('/api/sails/anyUserName/1000').respond(sailData);                                        
                });

                it('should load the sail to be updated', function() {        
                    httpMock.flush();      
                    expect($scope.sail).toEqual(sailData);
                });
            });

            describe('with a failure GET call', function() {

                var NotificationMock;

                beforeEach(function(){
                    notificationMock = Notification;
                    notificationMock.error = function () {};
                    spyOn(notificationMock,'error');                    
                    httpMock.expectGET('/api/sails/anyUserName/1000').respond(500,'Error getting sail.');                                        
                });

                it('should get an error using Notification', function() {        
                    httpMock.flush();      
                    expect(Notification.error).toHaveBeenCalled();
                });
            });
        });

        describe('when saving a sail', function() {
            var httpMock;

            beforeEach(inject(function(_$controller_, $httpBackend) {
                $controller = _$controller_;                
                notificationMock = Notification;
                notificationMock.success = function () {};
                spyOn(notificationMock,'success');
                $routeParamsMock = { userName: 'anyUserName', sailId: '1000'};               

                httpMock = $httpBackend;
                
                ctrl = $controller('sailsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification});
            }));

            describe('with a success POST call', function() {

                beforeEach(function(){
                    sailData.updated = undefined;
                    sailData.purchase = undefined;
                    httpMock.expectPOST('/api/sails', savedSpotData).respond(200,savedSpotData);
                });

                it('should save the sail', function() {
                    $scope.sail.name = 'sail1-saved';    
                    $scope.saveItem();
                    $scope.sail.updated = undefined; //This is to avoid problems with milisecs.
                    $scope.sail.purchase = undefined;
                    httpMock.flush();                         
                    expect($scope.sail.name).toEqual('sail1-saved');
                });

                it('should activate the busy indicator before save', function() {
                    $scope.sail.name = 'sail1-saved';    
                    $scope.saveItem();
                    $scope.sail.updated = undefined; //This is to avoid problems with milisecs.
                    $scope.sail.purchase = undefined;
                    expect($scope.busyIndicator).toBeTruthy();
                    httpMock.flush();                                             
                });

                it('should get a Notification success message', function() {
                    $scope.sail.name = 'sail1-saved';    
                    $scope.saveItem();
                    $scope.sail.updated = undefined; //This is to avoid problems with milisecs.
                    $scope.sail.purchase = undefined;
                    httpMock.flush();                         
                    expect(Notification.success).toHaveBeenCalled();
                });

                it('should deactivate the busy indicator after save', function() {
                    $scope.sail.name = 'sail1-saved';    
                    $scope.saveItem();
                    $scope.sail.updated = undefined; //This is to avoid problems with milisecs.                    
                    $scope.sail.purchase = undefined;
                    httpMock.flush();
                    expect($scope.busyIndicator).toBeFalsy();
                });
            });
        });
    });
});