describe ('mastsEditorView', function() {

    var mastData = { "id": 1000, "name": "mast1", "username": "anyUserName"},
        savedSpotData = { "id": 1000, "name": "mast1-saved", "username": "anyUserName"};

    
    beforeEach(function() {
        angular.module('ui.bootstrap',[]);
        angular.module('ui-notification',[]);

        module('mastsEditorViewModule');
    });

    it('should be able to test', function() {
        expect(true).toBeTruthy();
    });

    describe('mastsEditorViewController', function() {

        var ctrl, $scope, $controller, $routeParamsMock;

        describe('when creating a new mast', function() {

            beforeEach(inject(function(_$controller_) {
                $controller = _$controller_; 
                $scope = {};
                $routeParamsMock = { userName: 'anyUserName', mastId: '0'};

                ctrl = $controller('mastsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification});
            }));

            it('should create the controller', function() {        
                expect(ctrl).toBeDefined();
            });

            it('should prepare a new mast to be used by the controller', function() {        
                expect($scope.mast.updated).toBeDefined();
                expect($scope.mast.userName).toBe('anyUserName');
                expect($scope.mast.active).toBe(false);
            });
        });

        describe('when loading an existing mast', function() {
            var httpMock;

            beforeEach(inject(function(_$controller_, $httpBackend) {
                $controller = _$controller_;                
                
                $routeParamsMock = { userName: 'anyUserName', mastId: '1000'};

                httpMock = $httpBackend;
                
                ctrl = $controller('mastsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification});
            }));            

            describe('with a success GET call', function() {

                beforeEach(function(){                    
                    httpMock.expectGET('/api/masts/anyUserName/1000').respond(mastData);                                        
                });

                it('should load the mast to be updated', function() {        
                    httpMock.flush();      
                    expect($scope.mast).toEqual(mastData);
                });
            });

            describe('with a failure GET call', function() {

                var NotificationMock;

                beforeEach(function(){
                    notificationMock = Notification;
                    notificationMock.error = function () {};
                    spyOn(notificationMock,'error');                    
                    httpMock.expectGET('/api/masts/anyUserName/1000').respond(500,'Error getting mast.');                                        
                });

                it('should get an error using Notification', function() {        
                    httpMock.flush();      
                    expect(Notification.error).toHaveBeenCalled();
                });
            });
        });

        describe('when saving a mast', function() {
            var httpMock;

            beforeEach(inject(function(_$controller_, $httpBackend) {
                $controller = _$controller_;                
                notificationMock = Notification;
                notificationMock.success = function () {};
                spyOn(notificationMock,'success');
                $routeParamsMock = { userName: 'anyUserName', mastId: '1000'};               

                httpMock = $httpBackend;
                
                ctrl = $controller('mastsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification});
            }));

            describe('with a success POST call', function() {

                beforeEach(function(){
                    mastData.updated = undefined;
                    mastData.purchase = undefined;
                    httpMock.expectPOST('/api/masts', savedSpotData).respond(200,savedSpotData);
                });

                it('should save the mast', function() {
                    $scope.mast.name = 'mast1-saved';    
                    $scope.saveItem();
                    $scope.mast.updated = undefined; //This is to avoid problems with milisecs.
                    $scope.mast.purchase = undefined;
                    httpMock.flush();                         
                    expect($scope.mast.name).toEqual('mast1-saved');
                });

                it('should activate the busy indicator before save', function() {
                    $scope.mast.name = 'mast1-saved';    
                    $scope.saveItem();
                    $scope.mast.updated = undefined; //This is to avoid problems with milisecs.
                    $scope.mast.purchase = undefined;
                    expect($scope.busyIndicator).toBeTruthy();
                    httpMock.flush();                                             
                });

                it('should get a Notification success message', function() {
                    $scope.mast.name = 'mast1-saved';    
                    $scope.saveItem();
                    $scope.mast.updated = undefined; //This is to avoid problems with milisecs.
                    $scope.mast.purchase = undefined;
                    httpMock.flush();                         
                    expect(Notification.success).toHaveBeenCalled();
                });

                it('should deactivate the busy indicator after save', function() {
                    $scope.mast.name = 'mast1-saved';    
                    $scope.saveItem();
                    $scope.mast.updated = undefined; //This is to avoid problems with milisecs.                    
                    $scope.mast.purchase = undefined;
                    httpMock.flush();
                    expect($scope.busyIndicator).toBeFalsy();
                });
            });
        });
    });
});