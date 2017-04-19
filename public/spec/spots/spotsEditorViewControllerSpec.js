describe ('spotsEditorView', function() {

    var spotData = { "id": 1000, "Name": "spot1", "userName": "anyUserName"};

    
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

        describe('when updating an existing spot', function() {
            var httpMock;

            beforeEach(inject(function(_$controller_, $httpBackend) {
                $controller = _$controller_;                
                
                $routeParamsMock = { userName: 'anyUserName', spotId: '1000'};
                NgMap = { };

                httpMock = $httpBackend;
                
                ctrl = $controller('spotsEditorViewController', {$scope: $scope, $routeParams: $routeParamsMock, Notification, NgMap});
            }));

            it('should create the controller', function() {        
                expect(ctrl).toBeDefined();
            });

            describe('with a success get call', function() {

                beforeEach(function(){
                    spyOn( $scope, 'initMap' );
                    httpMock.expectGET('/api/spots/anyUserName/1000').respond(spotData);                                        
                });

                it('should load the spot to be updated', function() {        
                    httpMock.flush();      
                    expect($scope.spot).toEqual(spotData);
                });
            });
        });
    });
});