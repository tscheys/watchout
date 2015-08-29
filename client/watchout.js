// start slingin' some d3 here.
var svgContainer = d3.select('body').append('svg')
                                    .attr('width', window.innerWidth)
                                    .attr('height', window.innerHeight - 50)

var imageWidth = 100;
var imageHeight = 200;

var getRandomInBoundsIndex = function(direction) {
  var index = Math.random()*d3.select('svg').attr(direction);
  return checkBounds(index,direction);
}

var checkBounds = function (index, direction) {
  var bounds = direction === 'width' ? imageWidth : imageHeight;
  if(index < bounds) {
    index += bounds/2 + 30;
  } else if((d3.select('svg').attr(direction) - index) < bounds) {
    index -= bounds/2 + bounds/3 + 20;
  }
  return index;
}

// var amountOfCircles = 40;
// for(var i = 0; i < amountOfCircles; i++) {
//   svgContainer.append('circle')
//               .attr('cx', getRandomInBoundsIndex('width'))
//               .attr('cy', getRandomInBoundsIndex('height'))
//               .attr('r', 10)
//               .attr('class', 'enemy')
//               .style('position', 'relative')
//               imgs.enter()
//               .append("lib/boeing.png");
// }

var amountOfCircles = 15;
for(var i = 0; i < amountOfCircles; i++) {
  svgContainer.append('image')
              .attr('x', getRandomInBoundsIndex('width'))
              .attr('y', getRandomInBoundsIndex('height'))
              .attr('class', 'enemy')
              .attr("xlink:href", "lib/boeing.png")
              .attr('width', imageWidth + 'px')
              .attr('height', imageHeight + 'px');
}

// setInterval(
//   function(){
//     d3.select('svg').selectAll('circle').transition()
//                        .attr('cx', function(d){ return getRandomInBoundsIndex('width') })
//                        .attr('cy', function(d){ return getRandomInBoundsIndex('height') });
//   }, 1000) 

// var drag = d3.behavior.drag()  
//              .on('drag', function() { tim.attr('x', d3.event.x)
//                                             tim.attr('y',  d3.event.y - d3.select('.scoreboard').attr('heigth')); })
// var move = d3.behavior.drag()
//             .on('keydown', function() {
//                 switch(d3.event.keyCode) {
//                     case 37: // left
//                     tim.attr('x', tim.attr('x') + 10);
//                     break;
//                     case 38: // up
//                     tim.attr('y', tim.attr('y') - 10);
//                     break;

//                     case 39: // right
//                     tim.attr('x', tim.attr('x') - 10);
//                     break;

//                     case 40: // down
//                     tim.attr('y', tim.attr('y') + 10);
//                     break;

//                     default: 
//                     return; // exit this handler for other keys
//                 }
//                 e.preventDefault(); // prevent the default action (scroll / move caret)
//             });

var tim = svgContainer.append('image')
                             .attr('class', 'tim')
                             .attr('x', d3.select('svg').attr('width')/2)
                             .attr('y', d3.select('svg').attr('height')/2)
                             .attr('xlink:href', 'lib/fratbro.png')
                             .attr('width', imageWidth + 'px')
                             .attr('height', imageHeight + 'px')
                             .style('position', 'relative')

var blaine = svgContainer.append('image')
                             .attr('class', 'blaine')
                             .attr('x', d3.select('svg').attr('width')/2)
                             .attr('y', d3.select('svg').attr('height')/2)
                             .attr('xlink:href', 'lib/KillenIt.png')
                             .attr('width', imageWidth + 'px')
                             .attr('height', imageHeight + 'px')

d3.select('body').on('keydown', function() {
                                  var moveSpeed = 20;
                                  switch(d3.event.keyCode) {
                                      case 37: // left
                                        d3.select('.tim').attr('x', Math.max(parseInt(d3.select('.tim').attr('x')) - moveSpeed, imageWidth));           
                                      break;

                                      case 38: // up
                                      d3.select('.tim').attr('y', Math.max(parseInt(d3.select('.tim').attr('y')) - moveSpeed, imageHeight));
                                      break;

                                      case 39: // right
                                      d3.select('.tim').attr('x', Math.min(parseInt(d3.select('.tim').attr('x')) + moveSpeed, d3.select('svg').attr('width') - imageWidth));
                                      break;

                                      case 40: // down
                                      d3.select('.tim').attr('y', Math.min(parseInt(d3.select('.tim').attr('y')) + moveSpeed, d3.select('svg').attr('height') - imageHeight));
                                      break;

                                      case 65: // left
                                      d3.select('.blaine').attr('x', Math.max(parseInt(d3.select('.blaine').attr('x')) - moveSpeed, imageWidth));
                                      break;

                                      case 87: // up
                                      d3.select('.blaine').attr('y', Math.max(parseInt(d3.select('.blaine').attr('y')) - moveSpeed, imageHeight));
                                      break;

                                      case 68: // right
                                      d3.select('.blaine').attr('x', Math.min(parseInt(d3.select('.blaine').attr('x')) + moveSpeed, d3.select('svg').attr('width') - imageWidth));
                                      break;

                                      case 83: // down
                                      d3.select('.blaine').attr('y', Math.min(parseInt(d3.select('.blaine').attr('y')) + moveSpeed, d3.select('svg').attr('height') - imageHeight));
                                      break;

                                      default: 
                                      return; // exit this handler for other keys
                                  }
                                  d3.event.preventDefault(); // prevent the default action (scroll / move caret)
                              });  

setInterval(
  function(){
  d3.select('svg').selectAll('.enemy').transition()
                     .duration(2000)
                     .attr('x', function(d){ return getRandomInBoundsIndex('width')  })
                     .attr('y', function(d){ return getRandomInBoundsIndex('height')});
}, 2000)