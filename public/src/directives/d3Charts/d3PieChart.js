d3Charts.directive('pieChart', function ($window) {
      return {
         restrict: 'EA',
         scope: {
             myData: '=chartData',
             chartId: '@',
             field: '@',
             height: '=',
             width: '='
        },
         template: '<svg id="chart" class="{{chartId}}"></svg>',
         link: function ($scope, element, attrs) {
           var data = $scope.myData;                   
           
           $scope.$watch( 'myData', function (newItems, oldItems) {
                //removeBars($scope.chartId);
                drawPieChart(newItems, element, $scope.chartId, $scope.field, $scope.width, $scope.height);
            }, true);
         }       
      };      
});

function drawPieChart(data, element, chartId, field, width, height) {

    if (data.length === 0) return;
    if (!width) width = 450;
    if (!height) height = 325;

    var radius = Math.min(width, height) / 2;
    var color = d3.scale.ordinal(d3.schemeCategory20b);

    var svg = d3.select('.' + chartId)
                .attr("class","chart "+ chartId)
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

};