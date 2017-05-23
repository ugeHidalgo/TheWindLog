

d3Charts.directive('bars', function ($window) {
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
                removeBars($scope.chartId);
                drawChart(newItems, element, $scope.chartId, $scope.field, $scope.width, $scope.height);
            }, true);
         }       
      };      
   });

function removeBars(chartId) {
    d3.selectAll("." + chartId).selectAll("g").remove();
};

function drawChart(data, element, chartId, field, width, height) { //, fieldData) {

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
                    .domain([0, d3.max(data, function(d) { return sessionDataCount(d, field) })]);

    var xAxis = d3.svg.axis() //Define axis
                .scale(x)
                .orient("bottom"),
        yAxis = d3.svg.axis()
                .scale(y)
                .orient("right")
                .tickFormat(function(d) { return sessionDataTickLabel(d,field); })
                .ticks(d3.max(data, function(d) { return sessionDataCount(d, chartId) }))
                .ticks(setNumberOfTicksInVertAxis(d3.max(data, function(d) { return sessionDataCount(d, field) })))
                .tickSize (chartWidth);

    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([0, 0])
                .html(function(d) {
                    return "<strong>" + d._id[0].name + "</strong></br>" +
                            "<strong>" + field + ":</strong> <span style='color:red'>" + sessionDataTipValue(d, field) + "</span>";
                });

    var chart = d3.select("." + chartId) //element[0] //Center chart using margins                          
                .attr("class","chart "+ chartId)
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
                .text("Sessions/Spot: " + field);
                    
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
                    if (field === 'Count'){ 
                        return chartHeight - y(d.sessionsCount) - 1; 
                    }
                    if (field === 'Distance'){ 
                        return chartHeight - y(d.totalDistance) - 1; 
                    }
                    if (field === 'Time'){ 
                        return chartHeight - y(d.totalTime) - 1; 
                    }
                })
                .attr("y", function(d) { 
                    if (field === 'Count'){
                        return y(d.sessionsCount);
                    }
                    if (field === 'Distance'){
                        return y(d.totalDistance);
                    }
                    if (field === 'Time'){
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

function sessionDataCount(d, field) { 
    if (field === 'Count'){
        return d.sessionsCount;
    } 
    if (field === 'Distance'){
        return d.totalDistance;
    }
    if (field === 'Time'){
        return d.totalTime;
    }
    return 0;
};

function sessionDataTickLabel(d, field) { 
    if (field === 'Time'){
        return secondsToTime(d);
    }
    return d;
};

function sessionDataTipValue(d, field) { 
    if (field === 'Count'){
        return d.sessionsCount;
    } 
    if (field === 'Distance'){
        return parseFloat(Math.round(d.totalDistance * 100) / 100).toFixed(2);
    }
    if (field === 'Time'){
        return secondsToTime(d.totalTime);
    }
    return 0;
};


function secondsToTime (secondsAmount) {
    var days  = 1,
        hours = Math.floor (secondsAmount / 3600),
        minutes = Math.floor ((secondsAmount % 3600) / 60),
        seconds = Math.floor ((secondsAmount % 3600) % 60);

    if (hours<10) hours = '0' + hours;
    if (minutes<10) minutes = '0' + minutes;
    if (seconds<10) seconds = '0' + seconds;
    return hours + ":" + minutes +  ":" + seconds;
};