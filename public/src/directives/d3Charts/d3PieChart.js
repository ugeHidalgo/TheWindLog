d3Charts.directive('pieChart', function ($window) {
      return {
         restrict: 'EA',
         scope: {
             myData: '=chartData',
             chartId: '@',
             chartData: '@',
             height: '=',
             width: '='
        },
         template: '<svg id="chart" class="{{chartId}}"></svg>',
         link: function ($scope, element, attrs) {
           var data = $scope.myData;                   
           
           $scope.$watch( 'myData', function (newItems, oldItems) {
                //removeBars($scope.barId);
                //drawSessionsTotalChart(newItems, element, $scope.barId, $scope.barData, $scope.width, $scope.height);
            }, true);
         }       
      };      
   });