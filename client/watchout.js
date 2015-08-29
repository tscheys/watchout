// start slingin' some d3 here.
var svgContainer = d3.select('body').append('svg')
                                    .attr('width', window.innerWidth)
                                    .attr('height', window.innerHeight - 50)

var imageWidth = 100;
var imageHeight = 200;
var timCollisions = 0;
var blaineCollisions = 0;
var scoreboard = d3.select('.collisions > span');

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

function collide(node1X, node1Y, node2X, node2Y) {
  // compute r for each node 
  //  subsequently calculate nx1,nx2,... for each node 
  var distance = Math.sqrt(Math.pow((node2Y - node1Y),2) + Math.pow((node2X - node1X),2));
  var x = imageWidth/2;
  var y = imageHeight/2;

  var halfDist = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
  return distance < halfDist*2;
}

var amountOfEnemies = 1;
for(var i = 0; i < amountOfEnemies; i++) {
  svgContainer.append('image')
              .attr('x', getRandomInBoundsIndex('width'))
              .attr('y', getRandomInBoundsIndex('height'))
              .attr('class', 'enemy')
              .attr("xlink:href", "lib/boeing.png")
              .attr('width', imageWidth + 'px')
              .attr('height', imageHeight + 'px');
}

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
                             .attr('height', imageHeight + 'px');

var moveSpeed = 20;
var getRestrictedIndex = function (hero, axis, direction) {
  var bound = (axis === 'x') ? imageWidth : imageHeight;

  if(direction === "negative") {
    return Math.max(parseInt(d3.select(hero).attr(axis)) - moveSpeed, bound);
  } else {
    var dir = (axis === 'x') ? 'width' : 'height';
    return Math.min(parseInt(d3.select(hero).attr(axis)) + moveSpeed, d3.select('svg').attr(dir) - bound);
  }
}

d3.select('body').on('keydown', function() {
                                  switch(d3.event.keyCode) {
                                      case 37: // left
                                        d3.select('.tim').attr('x', getRestrictedIndex('.tim', 'x', 'negative'));           
                                      break;

                                      case 38: // up
                                      d3.select('.tim').attr('y', getRestrictedIndex('.tim', 'y', 'negative'));
                                      break;

                                      case 39: // right
                                      d3.select('.tim').attr('x', getRestrictedIndex('.tim', 'x', 'positive'));
                                      break;

                                      case 40: // down
                                      d3.select('.tim').attr('y', getRestrictedIndex('.tim', 'y', 'positive'));
                                      break;

                                      case 65: // left
                                      d3.select('.blaine').attr('x', getRestrictedIndex('.blaine', 'x', 'negative'));
                                      break;

                                      case 87: // up
                                      d3.select('.blaine').attr('y', getRestrictedIndex('.blaine', 'y', 'negative'));
                                      break;

                                      case 68: // right
                                      d3.select('.blaine').attr('x', getRestrictedIndex('.blaine', 'x', 'positive'));
                                      break;

                                      case 83: // down
                                      d3.select('.blaine').attr('y', getRestrictedIndex('.blaine', 'y', 'positive'));
                                      break;

                                      default: 
                                      return; // exit this handler for other keys
                                  }
                                  d3.event.preventDefault(); // prevent the default action (scroll / move caret)
                              });  

setInterval(
  function(){
  var timAlreadyCollided = false;
  var blaineAlreadyCollided = false;
  d3.select('svg').selectAll('.enemy').transition()
                     .duration(2000)
                     .attr('x', function(d){ return getRandomInBoundsIndex('width')})
                     .attr('y', function(d){ return getRandomInBoundsIndex('height')})
                     .tween('image', function() {
                        return function(t) {
                          var x = d3.select(this).attr('x');
                          var y = d3.select(this).attr('y');
                          var blaineX = d3.select('.blaine').attr('x'); 
                          var blaineY = d3.select('.blaine').attr('y'); 
                          var timX = d3.select('.tim').attr('x'); 
                          var timY = d3.select('.tim').attr('y'); 
                          if(collide(blaineX, blaineY, x, y) && !blaineAlreadyCollided) { 
                            blaineCollisions++;
                            blaineAlreadyCollided = true;
                          }
                          if(collide(timX, timY, x, y) && !timAlreadyCollided) { 
                            timCollisions++;
                            timAlreadyCollided = true;
                          }

                          scoreboard.text(blaineCollisions + timCollisions);
                        }
                      });
}, 2000)