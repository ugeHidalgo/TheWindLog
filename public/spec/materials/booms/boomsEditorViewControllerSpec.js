describe ('boomsEditorView', function() {

    var boomData = { "id": 1000, "name": "boom1", "username": "anyUserName"},
        savedSpotData = { "id": 1000, "name": "boom1-saved", "username": "anyUserName"};

    
    beforeEach(function() {
        angular.module('ui.bootstrap',[]);
        angular.module('ui-notification',[]);

        module('boomsEditorViewModule');
    });

    it('should be able to test', function() {
        expect(true).toBeTruthy();
    });

    describe('boomsEditorViewController', function() {

        var ctrl, $scope, $controller, $routeParamsMock;

        describe('when creating a new boom', function() {

            beforeEach(inject(function(_$controller_) {
                $controller = _$controller_; 
                $scope = {};
                $routeParamsMock = { userName: 'anyUserName', boomId: '0'};

                ctrl = $controller('boomsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification});
            }));

            it('should create the controller', function() {        
                expect(ctrl).toBeDefined();
            });

            it('should prepare a new boom to be used by the controller', function() {        
                expect($scope.boom.updated).toBeDefined();
                expect($scope.boom.userName).toBe('anyUserName');
                expect($scope.boom.active).toBe(false);
            });
        });

        describe('when loading an existing boom', function() {
            var httpMock;

            beforeEach(inject(function(_$controller_, $httpBackend) {
                $controller = _$controller_;                
                
                $routeParamsMock = { userName: 'anyUserName', boomId: '1000'};

                httpMock = $httpBackend;
                
                ctrl = $controller('boomsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification});
            }));            

            describe('with a success GET call', function() {

                beforeEach(function(){                    
                    httpMock.expectGET('/api/booms/anyUserName/1000').respond(boomData);                                        
                });

                it('should load the boom to be updated', function() {        
                    httpMock.flush();      
                    expect($scope.boom).toEqual(boomData);
                });
            });

            describe('with a failure GET call', function() {

                var NotificationMock;

                beforeEach(function(){
                    notificationMock = Notification;
                    notificationMock.error = function () {};
                    spyOn(notificationMock,'error');                    
                    httpMock.expectGET('/api/booms/anyUserName/1000').respond(500,'Error getting boom.');                                        
                });

                it('should get an error using Notification', function() {        
                    httpMock.flush();      
                    expect(Notification.error).toHaveBeenCalled();
                });
            });
        });

        describe('when saving a boom', function() {
            var httpMock;

            beforeEach(inject(function(_$controller_, $httpBackend) {
                $controller = _$controller_;                
                notificationMock = Notification;
                notificationMock.success = function () {};
                spyOn(notificationMock,'success');
                $routeParamsMock = { userName: 'anyUserName', boomId: '1000'};               

                httpMock = $httpBackend;
                
                ctrl = $controller('boomsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification});
            }));

            describe('with a success POST call', function() {

                beforeEach(function(){
                    boomData.updated = undefined;
                    boomData.purchase = undefined;
                    httpMock.expectPOST('/api/booms', savedSpotData).respond(200,savedSpotData);
                });

                it('should save the boom', function() {
                    $scope.boom.name = 'boom1-saved';    
                    $scope.saveItem();
                    $scope.boom.updated = undefined; //This is to avoid problems with milisecs.
                    $scope.boom.purchase = undefined;
                    httpMock.flush();                         
                    expect($scope.boom.name).toEqual('boom1-saved');
                });

                it('should activate the busy indicator before save', function() {
                    $scope.boom.name = 'boom1-saved';    
                    $scope.saveItem();
                    $scope.boom.updated = undefined; //This is to avoid problems with milisecs.
                    $scope.boom.purchase = undefined;
                    expect($scope.busyIndicator).toBeTruthy();
                    httpMock.flush();                                             
                });

                it('should get a Notification success message', function() {
                    $scope.boom.name = 'boom1-saved';    
                    $scope.saveItem();
                    $scope.boom.updated = undefined; //This is to avoid problems with milisecs.
                    $scope.boom.purchase = undefined;
                    httpMock.flush();                         
                    expect(Notification.success).toHaveBeenCalled();
                });

                it('should deactivate the busy indicator after save', function() {
                    $scope.boom.name = 'boom1-saved';    
                    $scope.saveItem();
                    $scope.boom.updated = undefined; //This is to avoid problems with milisecs.                    
                    $scope.boom.purchase = undefined;
                    httpMock.flush();
                    expect($scope.busyIndicator).toBeFalsy();
                });
            });
        });
    });
});