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
                    drawSessionsCountChart($scope.sessionsTotals);
                    /*$scope.sessionsTotals.forEach(function(sessionData) {
                        sessions.push (sessionData.sessionsCount);
                        if (sessions.length === $scope.sessionsTotals.length &&
                            sessions.length >0) {
                                drawSessionsCountChart($scope.sessionsTotals);
                        }
                    });*/
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get sessions totals !!');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });

            function drawSessionsCountChart(data) {

            
                var margin = { top: 20, right: 30, bottom: 20, left: 30},
                    chartWidth = 200,
                    chartHeight = 325,
                    chart, bar,
                    scaleY = d3.scale.linear() //Escala el width de la barra al alto del div    
                                .range([chartHeight, 0]);
                                //alto del div
                                
                scaleY.domain([0, d3.max(data, function(d) { return d.sessionsCount; })]);

                var barWidth = chartWidth / data.length; //El ancho de la barra

                var chart = d3.select("#ch1.chart")
                                .attr("width", chartWidth )
                                .attr("height", chartHeight);
                                
                var bar = chart.selectAll("div")
                                .data(data)
                                .enter().append("g")
                                .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; }); //Desplazamiento de la barra hacia la derecha

                bar.append("rect")
                    .attr("y", function(d) { return scaleY(d.sessionsCount); })
                    .attr("height", function(d) { return chartHeight - scaleY(d.sessionsCount); }) //Para darle la vuelta a la barra ya que el 0,0 es el top left.
                    .attr("width", barWidth - 1);

                bar.append("text")
                    .attr("x", barWidth / 2 ) //x left 
                    .attr("y", function(d) { return scaleY(d.sessionsCount) + 3; }) //y bottom
                    .attr("dy", ".75em")
                    .text(function(d) { return d.sessionsCount; });
            };

            function type(d) {
                d.sessionsCount = +d.sessionsCount; // coerce to number
                return d;
            };
        }
    ]);