angular.module('d3Charts', []).

   directive('bars', function ($parse) {
      return {
         restrict: 'E',
         scope: {data: '=chartData'},
         replace: false,
         template: '<div id="chart2"></div>',
         link: function ($scope, element, attrs) {
           var data = $scope.data;

           drawChart(data);
           
           
          $scope.$watch( 'data', function (newItems, oldItems) {
                removeBars();
                drawChart(newItems);
            });
         }       
      };      
   });


function drawChart (data){
    //var data = attrs.data.split(','),
    chart = d3.select('#chart2')
      .append("div").attr("class", "chart2")
      .selectAll('div')
      .data(data).enter()
      .append("div")
      .transition().ease("elastic")
      .style("width", function(d) { return d + "%"; })
      .text(function(d) { return d + "%"; });
  }

  function removeBars() {
      d3.select("#chart2").selectAll("div").remove();
  };