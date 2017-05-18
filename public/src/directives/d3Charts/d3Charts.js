angular.module('d3Charts', []).

   directive('bars', function ($window) {
      return {
         restrict: 'E',
         scope: {myData: '=chartData'},
         replace: false,
         template: '<svg id="chart"></svg>',
         link: function ($scope, element, attrs) {
           var data = $scope.myData;                   
           
           $scope.$watch( 'myData', function (newItems, oldItems) {
                removeBars();
                drawSessionsTotalChart(newItems, element, 0, "#ch-bar-count.chart", "Count");
                //drawSessionsTotalChart(newItems, element, 1, "#ch-bar-distance.chart", "Distance");
                //drawSessionsTotalChart(newItems, "#ch-bar-time.chart", "Time");
            }, true);
         }       
      };      
   });


function removeBars() {
    d3.selectAll(".bar").remove();
    d3.selectAll("g").remove();
};

function drawSessionsTotalChart(data, element, elementId, chartId, fieldData) {

    if (data.length === 0) return;

    var margin = { top: 20, right: 50, bottom: 100, left: 20},
        chartWidth = 450 - margin.left - margin.right,
        chartHeight = 325 - margin.top - margin.bottom,
        chart, chartbar,
        barWidth = chartWidth / data.length; //El ancho de la barra


    var x = d3.scale.ordinal() //Scale dimensions to max values 
                    .rangeRoundBands([0,chartWidth], .1)
                    .domain(data.map( function(d) { return d._id[0].name; })),
        y = d3.scale.linear()    
                    .range([chartHeight, 0])
                    .domain([0, d3.max(data, function(d) { return sessionDataCount(d, fieldData) })]);

    var xAxis = d3.svg.axis() //Define axis
                .scale(x)
                .orient("bottom"),
        yAxis = d3.svg.axis()
                .scale(y)
                .orient("right")
                .ticks(d3.max(data, function(d) { return sessionDataCount(d, fieldData) }))
                .ticks(setNumberOfTicksInVertAxis(d3.max(data, function(d) { return sessionDataCount(d, fieldData) })))
                .tickSize (chartWidth);

    var chart = d3.select(element[0])//chartId)  //Center chart using margins                          
                .append("svg")
                .attr("id",chartId)
                .attr("class","chart")
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
                .text("Sessions/Spot: " + fieldData);
                    
    chart.selectAll("rect") //Draw bar positioning first and resizing to value with animation
            .data(data)
            .enter().append("rect")                                                      
                .attr("x", function(d) { return x(d._id[0].name); })
                .attr("y", function(d) { return chartHeight; })                                
                .attr("width", x.rangeBand())
                .attr("height", 0)
                .transition().ease("elastic")
                .attr("height", function(d) {
                    if (fieldData === 'Count'){ 
                        return chartHeight - y(d.sessionsCount) - 1; 
                    }
                    if (fieldData === 'Distance'){ 
                        return chartHeight - y(d.totalDistance) - 1; 
                    }
                    if (fieldData === 'Time'){ 
                        return chartHeight - y(d.totalTime) - 1; 
                    }
                })
                .attr("y", function(d) { 
                    if (fieldData === 'Count'){
                        return y(d.sessionsCount);
                    }
                    if (fieldData === 'Distance'){
                        return y(d.totalDistance);
                    }
                    if (fieldData === 'Time'){
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

    function sessionDataCount(d, fieldData) { 
    if (fieldData === 'Count'){
        return d.sessionsCount;
    } 
    if (fieldData === 'Distance'){
        return d.totalDistance;
    }
    if (fieldData === 'Time'){
        return d.totalTime;
    }
    return 0;
};