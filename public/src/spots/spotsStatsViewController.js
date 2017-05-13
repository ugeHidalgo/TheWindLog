'use strict';

angular
    .module ('spotsStatsViewModule', [
        'ui.bootstrap', 
        'ui-notification'])

    .controller ('spotsStatsViewController',  [
        '$scope', 
        '$window',
        '$routeParams', 
        'Notification', 
        '$http',
        function ($scope, $window, $$routeParams, Notification, $http) {

            var urlParts = $window.location.hash.split('/'),
                userName = urlParts[2],
                url = '/api/sessionstotals/' + userName;

            $scope.userName = userName;
            $scope.itemsByPage = 10;
            $scope.numberOfPages = 5;
            $scope.busyIndicator = true;
            $scope.sessionsTotals = [];
            

            $http.get(url)
                .then(function (result) {
                    //Success
                    $scope.sessionsTotals = result.data;
                    drawSessionsTotalChart($scope.sessionsTotals, "#ch1.chart", "Count");
                    drawSessionsTotalChart($scope.sessionsTotals, "#ch2.chart", "Distance");
                    drawSessionsTotalChart($scope.sessionsTotals, "#ch3.chart", "Time");
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get sessions totals !!');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });

            function drawSessionsTotalChart(data, chartId, fieldData) {

                var margin = { top: 20, right: 30, bottom: 100, left: 40},
                    chartWidth = 650 - margin.left - margin.right,
                    chartHeight = 325 - margin.top - margin.bottom,
                    chart, chartbar,
                    barWidth = chartWidth / data.length; //El ancho de la barra

                var x = d3.scale.ordinal()
                                .rangeRoundBands([0,chartWidth], .1)
                                .domain(data.map( function(d) { return d._id[0].name; })),
                    y = d3.scale.linear() //Escala el width de la barra al alto del div    
                                .range([chartHeight, 0])
                                .domain([0, d3.max(data, function(d) { return sessionDataCount(d, fieldData) })]);
                
                var xAxis = d3.svg.axis()
                            .scale(x)
                            .orient("bottom"),
                    yAxis = d3.svg.axis()
                            .scale(y)
                            .orient("right")
                            .ticks(d3.max(data, function(d) { return sessionDataCount(d, fieldData) }))
                            .ticks(setNumberOfTicksInVertAxis(d3.max(data, function(d) { return sessionDataCount(d, fieldData) })))
                            .tickSize (chartWidth);

                var chart = d3.select(chartId)
                            .attr("width", chartWidth + margin.left + margin.right )
                            .attr("height", chartHeight + margin.bottom + margin.top )
                            .append("g") //Para centrar el chart con los margenes definidos.
                                .attr("transform","translate(" + margin.left + "," + margin.top + ")");

                chart.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate (0," + chartHeight + ")")
                        .call(xAxis)
                        .selectAll("text")
                        .attr("y", 0)
                        .attr("x", 9)
                        .attr("dy", ".35em")
                        .attr("transform", "rotate(90)")
                        
                        .style("text-anchor", "start");

                chart.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                            //.attr("transform", "rotate(-90)")
                            .attr("x",chartWidth)
                            .attr("y",-10)
                            .attr("dy", ".71em")
                            .style("text-anchor","right")
                            .text("Sessions/Spot: " + fieldData);
                                
                chart.selectAll(".bar")
                        .data(data)
                        .enter().append("rect")
                            .attr("class","bar")
                            .attr("x", function(d) { return x(d._id[0].name); })
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
                            .attr("width", x.rangeBand());
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
        }
    ]);