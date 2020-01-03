/*-------- READ-FROM-FILE-CRAP ------- */
const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  else Calc(data);
});

/*------------- REAl CODE ------------- */


let first_canvas = [[0, 0]];
let second_canvas = [[0, 0]];


Calc = (data) => {
  let input = data.split("\n");
  let first_wire = input[0].split(",");
  let second_wire = input[1].split(",");

  DrawWire(first_wire, first_canvas); 
  DrawWire(second_wire, second_canvas);
  FindClosestIntersection(first_canvas, second_canvas);
}

DrawWire = (wire, canvas) => {
  for (command of wire){
    ParseStroke(canvas, command, canvas[canvas.length - 1][0], canvas[canvas.length - 1][1])
  }
}

ParseStroke = (arr, command, x, y) => {
  switch (command[0]) {
    case 'U':
      PaintStroke(arr, x, y, command.slice(1) , 0, -1)
      break;
    case 'R':
      PaintStroke(arr, x, y, command.slice(1) , 1, 0)
      break;
    case 'D':
      PaintStroke(arr, x, y, command.slice(1) , 0, 1)
      break;
    case 'L':
      PaintStroke(arr, x, y, command.slice(1) , -1, 0)
      break;
    default:
      break;
  }
}


PaintStroke = (arr, x, y, length, dirx, diry) => {
  for(let i= 0; i<length; i++){
    arr.push([x + dirx, y + diry]);
    x += dirx;
    y += diry;
  }
}

FindClosestIntersection = (arr1, arr2) => {
  let dist = 10000000;
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i][0] == arr2[j][0] && arr1[i][1] == arr2[j][1]) {
        const d = i+j;
        if (d<dist && d>0) {
          dist = d;
          console.log(dist);
        }
      }
    }
  }
}