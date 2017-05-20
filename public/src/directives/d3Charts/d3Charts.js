angular.module('d3Charts', [])

   .directive('bars', function ($window) {
      return {
         restrict: 'EA',
         scope: {
             myData: '=chartData',
             barId: '@',
             barData: '@',
             height: '=',
             width: '='
        },
         template: '<svg id="chart" class="{{barId}}"></svg>',
         link: function ($scope, element, attrs) {
           var data = $scope.myData;                   
           
           $scope.$watch( 'myData', function (newItems, oldItems) {
                //removeBars();
                //var a = $scope.barId;
                drawSessionsTotalChart(newItems, element, $scope.barId, $scope.barData, $scope.width, $scope.height);
            }, true);
         }       
      };      
   });

function removeBars() {
    d3.selectAll(".bar").remove();
    d3.selectAll("g").remove();
};

function drawSessionsTotalChart(data, element, chartId, barData, width, height) { //, fieldData) {

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
                    .domain([0, d3.max(data, function(d) { return sessionDataCount(d, barData) })]);

    var xAxis = d3.svg.axis() //Define axis
                .scale(x)
                .orient("bottom"),
        yAxis = d3.svg.axis()
                .scale(y)
                .orient("right")
                .ticks(d3.max(data, function(d) { return sessionDataCount(d, chartId) }))
                .ticks(setNumberOfTicksInVertAxis(d3.max(data, function(d) { return sessionDataCount(d, barData) })))
                .tickSize (chartWidth);

    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([0, 0])
                .html(function(d) {
                    return "<strong>" + d._id[0].name + "</strong></br>" +
                            "<strong>" + barData + ":</strong> <span style='color:red'>" + sessionDataCount(d, barData) + "</span>";
                });

    var chart = d3.select("." + chartId) //element[0] //Center chart using margins                          
                //.append("svg")
                //.attr("id",chartId)
                .attr("class","chart "+ chartId)
                //.attr("class",$scope.barId)
                .attr("width", chartWidth + margin.left + margin.right )
                .attr("height", chartHeight + margin.bottom + margin.top )
                .append("g") 
                    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    chart.call(tip);

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
                .text("Sessions/Spot: " + barData);
                    
    chart.selectAll("rect") //Draw bar positioning first and resizing to value with animation
            .data(data)
            .enter().append("rect")                                                      
                .attr("x", function(d) { return x(d._id[0].name); })
                .attr("y", function(d) { return chartHeight; })                                
                .attr("width", x.rangeBand())
                .attr("height", 0)
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                .transition().ease("elastic")
                .attr("height", function(d) {
                    if (barData === 'Count'){ 
                        return chartHeight - y(d.sessionsCount) - 1; 
                    }
                    if (barData === 'Distance'){ 
                        return chartHeight - y(d.totalDistance) - 1; 
                    }
                    if (barData === 'Time'){ 
                        return chartHeight - y(d.totalTime) - 1; 
                    }
                })
                .attr("y", function(d) { 
                    if (barData === 'Count'){
                        return y(d.sessionsCount);
                    }
                    if (barData === 'Distance'){
                        return y(d.totalDistance);
                    }
                    if (barData === 'Time'){
                        return y(d.totalTime);
                    }
                });
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

function sessionDataCount(d, barData) { 
    if (barData === 'Count'){
        return d.sessionsCount;
    } 
    if (barData === 'Distance'){
        return d.totalDistance;
    }
    if (barData === 'Time'){
        return d.totalTime;
    }
    return 0;
};