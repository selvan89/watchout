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
  nEnemies: 30,
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

var collision = function(enemies, collidedCallBack){
  console.log(enemies[0]);
  var enemiesCopied = Array.prototype.slice.call(enemies[0], 0);
  enemiesCopied.forEach(function(enemy){
    // console.log(enemy);
    var dEnemy = d3.select(enemy);
    var radiusSum = parseFloat(dEnemy.attr('r')) + ourHero.r;
    console.log(dEnemy.attr('cx'));
    var xDiff = parseFloat(dEnemy.attr('cx')) + ourHero.x;
    var yDiff = parseFloat(dEnemy.attr('cy')) + ourHero.y;
    console.log('yDiff: ', yDiff, '\nxDiff: ', xDiff)
    var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if(separation < radiusSum){
      collidedCallBack();
    }
  });
}

var getEnemyLocation = function(){
  var enemies = d3.select('svg').selectAll('.enemy');
  collision(enemies, function(){
    console.log('hi');
  });
}
setInterval(moveEnemies, 2000);
getEnemyLocation();
