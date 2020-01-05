/*-------- READ-FROM-FILE-CRAP ------- */
const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  else Calc(data);
});

/*------------- REAl CODE ------------- */

let initial_array = [],
WIDTH = 0,
HEIGHT = 0,
asteroids = [];

Calc = (data) => {
  initial_array = data.split("\n");
  initial_array = initial_array.map(val => val.split(""));
  WIDTH = initial_array[0].length;
  HEIGHT = initial_array.length;
  for (let y=0; y<HEIGHT; y++){
    for (let x=0; x<WIDTH; x++){
      if (initial_array[y][x] == "#") {
        asteroids.push({x, y})
      }
    }
  }
  IterateAsteroids(asteroids);
}

IterateAsteroids = (asteroids) => {
  let maxVisible = 0;
  let max_surr = [];
  for (asteroid of asteroids){
    let visible = 0;
    let surr_ast = [];
    for (neighbour of asteroids){
      let is_obscured = false;
      if (neighbour==asteroid) continue;
      const aim = CountAngle(asteroid, neighbour);
      if (aim.angle.x != Math.abs(aim.direction.x) || aim.angle.y != Math.abs(aim.direction.y)){
        let MUL = Math.max(Math.abs(aim.direction.x),Math.abs(aim.direction.y))/Math.max(aim.angle.x,aim.angle.y)
        for (let x=1; x < MUL; x+=1) {
          const POSX = asteroid.x + aim.direction.x*x/MUL;
          const POSY = asteroid.y + aim.direction.y*x/MUL;
          if (asteroids.some(ast => ast.x === POSX && ast.y === POSY)){
            is_obscured = true;
          }
        }
      }
      surr_ast.push({x: neighbour.x, y: neighbour.y, angle: AngleToRad(aim.direction.x,aim.direction.y),distance: Distance(asteroid, neighbour)})
      if (!is_obscured) visible +=1;
    }
    if (visible>maxVisible){
      maxVisible = visible;
      max_surr = surr_ast;
    }
  }

  DestroyAsteroids(max_surr.sort(SortByAngleAndDistance));
}

Distance = (a,b) => {
return Math.floor(Math.sqrt(Math.pow((a.x-b.x),2)+Math.pow((a.y-b.y),2))*100)/100;
}

SortByAngleAndDistance = (a, b) => {
  if (a.angle<b.angle) return -1;
  if (a.angle>b.angle) return 1;
  else {
    if (a.distance<b.distance) return -1;
    if (a.distance>b.distance) return 1;
  }
  return 0;
}

DestroyAsteroids = (arr) => {
  DESTROYED = 0;
  while (arr.length){
    let dir = undefined;
    for (asteroid of arr){
      if (asteroid.angle != dir){
        dir = asteroid.angle;
        DESTROYED += 1;
        console.log(DESTROYED, 'is destroyed: ', asteroid)
        arr = arr.filter(el => el!=asteroid);
      }
    }
  }
}


AngleToRad = (x,y) => {
  let rad = Math.atan(Math.abs(x)/Math.abs(y));
  if (y>=0&&x>=0) rad = Math.PI/2 + rad;
  else if (y>=0&&x<0) rad = Math.PI + rad;
  else if (y<0&&x<0) rad = Math.PI*2 - rad;
  //return rad;
  return Math.floor(rad*10000)/10000;
}

CountAngle = (a1, a2) => {
  const direction = {x: a2.x-a1.x, y: a2.y-a1.y};
  const angle = reduce(Math.abs(direction.x), Math.abs(direction.y));
  return {direction, angle}
}

reduce = (x,y) => {
  var gcd = function gcd(a,b){
    return b ? gcd(b, a%b) : a;
  };
  gcd = gcd(x,y);
  return {x: x/gcd, y: y/gcd};
}