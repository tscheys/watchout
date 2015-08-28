// start slingin' some d3 here.
var svgContainer = d3.select('body').append('svg')
                                    .attr('width', window.innerWidth)
                                    .attr('height', window.innerHeight - 250)

// var circle = svgContainer.append('circle')
//                          .attr('cx', 15)
//                          .attr('cy', 15)
//                          .attr('r', 10);
var getRandomInBoundsIndex = function(direction) {
  var index = Math.random()*d3.select('svg').attr(direction);

  if(index < 50 ) {
    index += 30;
  } else if((d3.select('svg').attr(direction) - index) < 50) {
    index -= 30;
  }

  return index;
}

var amountOfCircles = 40;
for(var i = 0; i < amountOfCircles; i++) {
  svgContainer.append('circle')
              .attr('cx', getRandomInBoundsIndex('width'))
              .attr('cy', getRandomInBoundsIndex('height'))
              .attr('r', 10)
              .style('position', 'relative');
}

setInterval(
  function(){
    d3.select('svg').selectAll('circle').transition()
                       .attr('cx', function(d){ return getRandomInBoundsIndex('width') })
                       .attr('cy', function(d){ return getRandomInBoundsIndex('height') });
  }, 1000)              