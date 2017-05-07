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
                sessions = [],
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
                    $scope.sessionsTotals.forEach(function(sessionData) {
                        sessions.push (sessionData.sessionsCount);
                        if (sessions.length === $scope.sessionsTotals.length &&
                            sessions.length >0) {
                                drawSessionsCountChart();
                        }
                    });
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get sessions totals !!');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });

            function drawSessionsCountChart() {

            
                var barHeight = 20,
                    margin = { top: 20, right: 30, bottom: 20, left: 30},
                    chartWidth = 550 - margin.left - margin.right,
                    chartHeight = 500 - margin.top - margin.bottom,
                    chart, bar,
                    x = d3.scale.linear()
                            .domain([0, d3.max(sessions)])
                            .range([0,chartWidth]);

                var xAxis = d3.svg.axis()
                                .scale(x)
                                .orient("left");

                var chart = d3.select("#ch1.chart")
                                .attr("width", chartWidth + margin.left + margin.right)
                                .attr("height", barHeight * sessions.length + margin.top + margin.bottom);
                                
                chart.append("g")
                     .attr("class", "x axis")
                     .attr("transform", "translate (0," + chartWidth + ")")
                     .call(xAxis);

                var bar = chart.selectAll("div")
                    .data(sessions)
                    .enter().append("g")
                    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

                bar.append("rect")
                    .attr("width", x)
                    .attr("height", barHeight - 1);

                bar.append("text")
                    .attr("x", function(d) { return x(d) - 3; }) //style sirve para fijar attributos de HTML
                    .attr("y", barHeight / 2)
                    .attr("dy", ".35em")
                    .text(function(d) { return d; });

            };
        }
    ]);