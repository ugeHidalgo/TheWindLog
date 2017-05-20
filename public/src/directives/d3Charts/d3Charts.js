angular.module('d3Charts', [])

   .directive('bars', function ($window) {
      return {
         restrict: 'EA',
         scope: {
             myData: '=chartData',
             barId: '@',
             height: '=',
             width: '='
        },
         template: '<svg id="chart" class="{{barId}}"></svg>',
         link: function ($scope, element, attrs) {
           var data = $scope.myData;                   
           
           $scope.$watch( 'myData', function (newItems, oldItems) {
                //removeBars();
                var a = $scope.barId;
                drawSessionsTotalChart(newItems, element, $scope.barId, $scope.width, $scope.height);
            }, true);
         }       
      };      
   });

function removeBars() {
    d3.selectAll(".bar").remove();
    d3.selectAll("g").remove();
};

function drawSessionsTotalChart(data, element, chartId, width, height) { //, fieldData) {

    if (data.length === 0) return;
    if (!width) width = 450;
    if (!height) height = 325;

    var margin = { top: 20, right: 50, bottom: 100, left: 20},
        chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.top - margin.bottom,
        chart, chartbar,
        barWidth = chartWidth / data.length; //El ancho de la barra


    var x = d3.scale.ordinal() //Scale dimensions to max values 
                    .rangeRoundBands([0,chartWidth], .1)
                    .domain(data.map( function(d) { return d._id[0].name; })),
        y = d3.scale.linear()    
                    .range([chartHeight, 0])
                    .domain([0, d3.max(data, function(d) { return sessionDataCount(d, chartId) })]);

    var xAxis = d3.svg.axis() //Define axis
                .scale(x)
                .orient("bottom"),
        yAxis = d3.svg.axis()
                .scale(y)
                .orient("right")
                .ticks(d3.max(data, function(d) { return sessionDataCount(d, chartId) }))
                .ticks(setNumberOfTicksInVertAxis(d3.max(data, function(d) { return sessionDataCount(d, chartId) })))
                .tickSize (chartWidth);

    var chart = d3.select("." + chartId) //element[0] //Center chart using margins                          
                //.append("svg")
                //.attr("id",chartId)
                .attr("class","chart "+ chartId)
                //.attr("class",$scope.barId)
                .attr("width", chartWidth + margin.left + margin.right )
                .attr("height", chartHeight + margin.bottom + margin.top )
                .append("g") 
                    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    chart.append("g") //Append axis and define texts
            .attr("class", "x axis")
            .attr("transform", "translate (0," + chartHeight + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(45)")            
            .style("text-anchor", "start");

    chart.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
                .attr("x",chartWidth)
                .attr("y",-9)
                .attr("dy", ".71em")
                .style("text-anchor","right")
                .text("Sessions/Spot: " + getChartName(chartId));
                    
    chart.selectAll("rect") //Draw bar positioning first and resizing to value with animation
            .data(data)
            .enter().append("rect")                                                      
                .attr("x", function(d) { return x(d._id[0].name); })
                .attr("y", function(d) { return chartHeight; })                                
                .attr("width", x.rangeBand())
                .attr("height", 0)
                .transition().ease("elastic")
                .attr("height", function(d) {
                    if (chartId === 'ch-bar-count'){ 
                        return chartHeight - y(d.sessionsCount) - 1; 
                    }
                    if (chartId === 'ch-bar-distance'){ 
                        return chartHeight - y(d.totalDistance) - 1; 
                    }
                    if (chartId === 'ch-bar-time'){ 
                        return chartHeight - y(d.totalTime) - 1; 
                    }
                })
                .attr("y", function(d) { 
                    if (chartId === 'ch-bar-count'){
                        return y(d.sessionsCount);
                    }
                    if (chartId === 'ch-bar-distance'){
                        return y(d.totalDistance);
                    }
                    if (chartId === 'ch-bar-time'){
                        return y(d.totalTime);
                    }
                })
};

function type(d) {
    d.sessionsCount = +d.sessionsCount; // coerce to number
    return d;
};

function setNumberOfTicksInVertAxis(maxValue) {
    if (maxValue > 100 ) {
        return 10;
    } 
    if (maxValue > 10 ){
        return maxValue / 10;
    } 
    return 5;
};

function sessionDataCount(d, chartId) { 
    if (chartId === 'ch-bar-count'){
        return d.sessionsCount;
    } 
    if (chartId === 'ch-bar-distance'){
        return d.totalDistance;
    }
    if (chartId === 'ch-bar-time'){
        return d.totalTime;
    }
    return 0;
};

function getChartName(chartId) { 
    if (chartId === 'ch-bar-count'){
        return 'Sessions number';
    } 
    if (chartId === 'ch-bar-distance'){
        return 'Distance';
    }
    if (chartId === 'ch-bar-time'){
        return 'Time';
    }
    return 0;
};