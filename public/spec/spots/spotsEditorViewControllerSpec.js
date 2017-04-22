describe ('spotsEditorView', function() {

    var spotData = { "id": 1000, "name": "spot1", "username": "anyUserName"},
        savedSpotData = { "id": 1000, "name": "spot1-saved", "username": "anyUserName"};

    
    beforeEach(function() {
        angular.module('ui.bootstrap',[]);
        angular.module('ui-notification',[]);

        module('spotsEditorViewModule');
    });

    it('should be able to test', function() {
        expect(true).toBeTruthy();
    });

    describe('spotsEditorViewController', function() {

        var ctrl, $scope, $controller, $routeParamsMock;

        describe('when creating a new spot', function() {

            beforeEach(inject(function(_$controller_) {
                $controller = _$controller_; 
                $scope = {};
                $routeParamsMock = { userName: 'anyUserName', spotId: '0'};
                NgMap = {};

                ctrl = $controller('spotsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification, NgMap});
            }));

            it('should create the controller', function() {        
                expect(ctrl).toBeDefined();
            });

            it('should prepare a new spot to be used by the controller', function() {        
                expect($scope.spot.updated).toBeDefined();
                expect($scope.spot.userName).toBe('anyUserName');
                expect($scope.spot.active).toBe(false);
            });
        });

        describe('when loading an existing spot', function() {
            var httpMock;

            beforeEach(inject(function(_$controller_, $httpBackend) {
                $controller = _$controller_;                
                
                $routeParamsMock = { userName: 'anyUserName', spotId: '1000'};
                NgMap = {};

                httpMock = $httpBackend;
                
                ctrl = $controller('spotsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification, NgMap});
            }));            

            describe('with a success GET call', function() {

                beforeEach(function(){
                    spyOn( $scope, 'initMap' );
                    httpMock.expectGET('/api/spots/anyUserName/1000').respond(spotData);                                        
                });

                it('should load the spot to be updated', function() {        
                    httpMock.flush();      
                    expect($scope.spot).toEqual(spotData);
                });
            });

            describe('with a failure GET call', function() {

                var NotificationMock;

                beforeEach(function(){
                    notificationMock = Notification;
                    notificationMock.error = function () {};
                    spyOn(notificationMock,'error');
                    spyOn( $scope, 'initMap' );
                    httpMock.expectGET('/api/spots/anyUserName/1000').respond(500,'Error getting spot.');                                        
                });

                it('should get an error using Notification', function() {        
                    httpMock.flush();      
                    expect(Notification.error).toHaveBeenCalled();
                });
            });
        });

        describe('when saving a spot', function() {
            var httpMock;

            beforeEach(inject(function(_$controller_, $httpBackend) {
                $controller = _$controller_;                
                notificationMock = Notification;
                notificationMock.success = function () {};
                spyOn(notificationMock,'success');
                $routeParamsMock = { userName: 'anyUserName', spotId: '1000'};
                NgMap = { };

                httpMock = $httpBackend;
                
                ctrl = $controller('spotsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification, NgMap});
            }));

            describe('with a success POST call', function() {

                beforeEach(function(){
                    spotData.updated = undefined;
                    httpMock.expectPOST('/api/spots', savedSpotData).respond(200,savedSpotData);
                });

                it('should save the spot', function() {
                    $scope.spot.name = 'spot1-saved';    
                    $scope.saveItem();
                    $scope.spot.updated = undefined; //This is to avoid problems with milisecs.
                    httpMock.flush();                         
                    expect($scope.spot.name).toEqual('spot1-saved');
                });

                it('should activate the busy indicator before save', function() {
                    $scope.spot.name = 'spot1-saved';    
                    $scope.saveItem();
                    $scope.spot.updated = undefined; //This is to avoid problems with milisecs.
                    expect($scope.busyIndicator).toBeTruthy();
                    httpMock.flush();                                             
                });

                it('should get a Notification success message', function() {
                    $scope.spot.name = 'spot1-saved';    
                    $scope.saveItem();
                    $scope.spot.updated = undefined; //This is to avoid problems with milisecs.
                    httpMock.flush();                         
                    expect(Notification.success).toHaveBeenCalled();
                });

                it('should deactivate the busy indicator after save', function() {
                    $scope.spot.name = 'spot1-saved';    
                    $scope.saveItem();
                    $scope.spot.updated = undefined; //This is to avoid problems with milisecs.                    
                    httpMock.flush();
                    expect($scope.busyIndicator).toBeFalsy();
                });
            });
        });
    });
});