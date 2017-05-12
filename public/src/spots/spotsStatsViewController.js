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
                    drawSessionsCountChart($scope.sessionsTotals, "#ch1.chart");
                    drawSessionsCountChart($scope.sessionsTotals, "#ch2.chart");
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get sessions totals !!');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });

            function drawSessionsCountChart(data, chartId) {

                var margin = { top: 20, right: 30, bottom: 30, left: 40},
                    chartWidth = 500 - margin.left - margin.right,
                    chartHeight = 325 - margin.top - margin.bottom,
                    chart, chartbar,
                    barWidth = chartWidth / data.length; //El ancho de la barra

                var x = d3.scale.ordinal()
                                .rangeRoundBands([0,chartWidth], .1)
                                .domain(data.map( function(d) { return d._id[0].name; })),
                    y = d3.scale.linear() //Escala el width de la barra al alto del div    
                                .range([chartHeight, 0])
                                .domain([0, d3.max(data, function(d) { return d.sessionsCount; })]);
                
                var xAxis = d3.svg.axis()
                                .scale(x)
                                .orient("bottom"),
                    yAxis = d3.svg.axis()
                                .scale(y)
                                .orient("left")
                                .ticks(d3.max(data, function(d) { return d.sessionsCount; }), "%");

                var chart = d3.select(chartId)
                            .attr("width", chartWidth + margin.left + margin.right )
                            .attr("height", chartHeight + margin.bottom + margin.top )
                        .append("g") //Para centrar el chart con los margenes definidos.
                            .attr("transform","translate(" + margin.left + "," + margin.top + ")");

                chart.append("g")
                            .attr("class", "x axis")
                            .attr("transform", "translate (0," + chartHeight + ")")
                            .call(xAxis);
                chart.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                    .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y",6)
                        .attr("dy", ".71em")
                        .style("text-anchor","end")
                        .text("Sessions count");
                                
                chart.selectAll(".bar")
                        .data(data)
                    .enter().append("rect")
                        .attr("class","bar")
                        .attr("x", function(d) { return x(d._id[0].name); })
                        .attr("y", function(d) { return y(d.sessionsCount); })
                        .attr("height", function(d) { return chartHeight - y(d.sessionsCount); }) //Para darle la vuelta a la barra ya que el 0,0 es el top left.
                        .attr("width", x.rangeBand());
            };

            function type(d) {
                d.sessionsCount = +d.sessionsCount; // coerce to number
                return d;
            };
        }
    ]);