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

    var margin = { top: 20, right: 20, bottom: 20, left: 20},
        chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.top - margin.bottom;

    var radius = Math.min(chartWidth, chartHeight) / 2;
    var color = d3.scale.category20c();

    var svg = d3.select('.' + chartId)
                .attr("class","chart "+ chartId)
                .attr('width', chartWidth + margin.left + margin.right)
                .attr('height', chartHeight + margin.bottom + margin.top)
                .append('g')
                .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

    var arc = d3.svg.arc()
                .innerRadius(radius / 2)
                .outerRadius(radius);

    var pie = d3.layout.pie()
                .value(function(d) { return d.sessionsCount; })
                .sort(null);

    var path = svg.selectAll('path')
                .data(pie(data))
                .enter()
                .append('path')
                //.attr('d', arc)
                .attr('fill', function(d, i) {
                    return color(i);
                })
                .transition().delay(function(d, i) { return i * 50; }).duration(100)
                .attrTween('d', function(d) {
                    var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                    return function(t) {
                        d.endAngle = i(t);
                        return arc(d);
                    }
                });
};