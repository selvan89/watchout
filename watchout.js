// // start slingin' some d3 here
// var hero = d3.select(".hero");
// var svg = d3.select("svg");

// // hero.on('click', function(){
// //   // console.log('hello');
// //   // console.log(this);

// // });
// var canvas = d3.select("#canvas");
// var svg = d3.select("svg");
// svg.on("click", function() {
//     console.log(d3.mouse(svg.node));
// })

var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 10,
  padding: 20
};

var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
};

var gameBoard = d3.select('#arena').append('svg:svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height);

var makePlayer = function(){
  var playa = {};
  playa.color = '#ff6600';
  playa.x = 400;
  playa.y = 400;
  // playa.angle = 0;
  playa.r = 10;
  // playa.gameOptions = gameOptions;
  // playa.render = //some render function

  return playa;
};

var createEnemies = function(){
  var enemies = [];
  for( var i=0; i< gameOptions.nEnemies; i++ ){
    var enemy = {};
    enemy.id = i;
    enemy.x = Math.random()*450;
    enemy.y = Math.random()*700;
    enemy.color = 'black'
    enemies.push(enemy);
  }
  // console.log(enemies);
  return enemies;
}

var render = function(characters, classType){
  var characterCollection = gameBoard.selectAll(classType).data(characters);
  characterCollection.enter()
    .append('svg:circle')
    .attr('class', classType)
    .attr('cx', function(character){
      return character.x;
    })
    .attr('cy', function(character){
      return character.y;
    })
    .attr('r', 20)
    .attr('fill', function(character){
      return character.color;
    });
  //characterCollection.exit().remove();
}

// FUNCTION CALLS
var newEnemyPositions = createEnemies();
render(newEnemyPositions, 'enemy');
var ourHero = makePlayer();
// ourHero = [ourHero];
render([ourHero], 'hero')


var randomPosition = function(limit){
  return Math.random()*limit;
}

var moveEnemies = function(){
  d3.selectAll('.enemy').transition().duration(1000)
  .attr('cx', function(){
    return randomPosition(450);
  })
  .attr('cy', function(){
    return randomPosition(700);
  })
};

var checkCollision = function(enemies, collidedCallBack){
  console.log(enemies[0]);
  var enemiesCopied = Array.prototype.slice.call(enemies[0], 0);

  setInterval(function(){
    var currentScore = +d3.select('.current span').text();
    d3.select('.current span').text(currentScore+1);
    enemiesCopied.forEach(function(enemy){
      var dEnemy = d3.select(enemy);
      var radiusSum = parseFloat(dEnemy.attr('r')) + parseFloat(d3.select('.hero').attr('r'));
      // console.log(dEnemy.attr('cx'));
      var xDiff = parseFloat(dEnemy.attr('cx')) - parseFloat(d3.select('.hero').attr('cx'));
      var yDiff = parseFloat(dEnemy.attr('cy')) - parseFloat(d3.select('.hero').attr('cy'));
      // console.log('yDiff: ', yDiff, '\nxDiff: ', xDiff)
      var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
      // console.log('separation: ',separation);
      // console.log('radiusSum: ', separation);
      if(separation < radiusSum){
        // console.log('collided');
        collidedCallBack();
      }
    });
  }, 100);
}

var whenCollided = function(){
  // increase collision count
  var counter = +d3.select('.collisions span').text();
  d3.select('.collisions span').text(counter+1);
  // make current score high score if it's larger than high score
  if(+d3.select('.high span').text() < +d3.select('.current span').text()){
    d3.select('.high span').text(d3.select('.current span').text())
  }
  d3.select('.current span').text(0);
  // reset current score
  // do some flashy whatever thing

}

// var getEnemyLocation = function(){
//   var enemies = d3.select('svg').selectAll('.enemy');
//   collision(enemies, function(){
//     console.log('hi');
//   });
// }

// var interpolateEnemy = function(singleEnemy){
//   // for(var i = 0; i < enemies; i++){
//     // var singleEnemy = d3.select(enemies[i]);
//     // console.log(singleEnemy);
//     singleEnemy.transition().tween("mover", function(){
//       var ix = d3.interpolateString(singleEnemy.attr('cx'), randomPosition(450));
//       var iy = d3.interpolateString(singleEnemy.attr('cy'), randomPosition(700));
//       return function(t){
//         // detectCollision(iy(t), ix(t));
//         singleEnemy.attr('cx', ix(t)).attr('cy', iy(t));
//       }
//     });
//   // }
// }

// var detectCollision = function(xCoord, yCoord){
//   var
// }


setInterval(moveEnemies, 1000);
// console.log(newEnemyPositions);
var enemies = d3.selectAll('.enemy');
setInterval(checkCollision(enemies, whenCollided), 10);
// setInterval(, 1000);
