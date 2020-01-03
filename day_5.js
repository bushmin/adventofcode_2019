/*-------- READ-FROM-FILE-CRAP ------- */
const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  else Calc(data);
});

/*------------- REAl CODE ------------- */

let initial_array = [];
let INPUT = 5;
let OUTPUT = '';

Calc = (data) => {
  initial_array = data.split(",");
  initial_array = initial_array.map(val => Number(val));
  
  IntCode(initial_array, 0);
  console.log('OUTPUT =', OUTPUT);
  }


IntCode = (arr, id) => {
  const command = String(arr[id]).padStart(5, "0");
  switch (Number(command[3]+command[4])) {
    case 1:
      arr = Sum(arr, id, command[2], command[1]);
      return IntCode(arr, id + 4);
    case 2:
      arr = Multiply(arr, id, command[2], command[1]);
      return IntCode(arr, id + 4);
    case 3:
      arr = Input(arr, id);
      return IntCode(arr, id + 2);
    case 4:
      arr = Output(arr, id, command[2]);
      return IntCode(arr, id + 2);
    case 5:
      poiner_new = JumpIfTrue(arr, id, command[2], command[1]);
      return IntCode(arr, poiner_new);
    case 6:
      poiner_new = JumpIfTrue(arr, id, command[2], command[1], 'invert');
      return IntCode(arr, poiner_new);
    case 7:
      arr = LessThan(arr, id, command[2], command[1]);
      return IntCode(arr, id + 4);
    case 8:
      arr = Equals(arr, id, command[2], command[1]);
      return IntCode(arr, id + 4);
    case 99:
      return arr[0];
    default:
      console.log('wat')
      break;
  }
}

Sum = (array, id, mode1, mode2) => {
  let first = array[array[id + 1]];
  if (mode1!=0) first = array[id + 1];

  let second = array[array[id + 2]];
  if (mode2!=0) second = array[id + 2];

  array[array[id + 3]] = Number(first) + Number(second);
  return array;
}


Multiply = (array, id, mode1, mode2) => {
  let first = array[array[id + 1]];
  if (mode1!=0) first = array[id + 1];

  let second = array[array[id + 2]];
  if (mode2!=0) second = array[id + 2];

  array[array[id + 3]] = Number(first) * Number(second);
  return array;
}

Input = (array, id) => {
  array[array[id + 1]] = INPUT;
  return array;
}

Output = (array, id, mode1) => {
  if (mode1!=0) { OUTPUT += String(array[id + 1]) }
  else { OUTPUT += String(array[array[id + 1]]) }
  return array;
}

JumpIfTrue = (array, id, mode1, mode2, invert) => {
  let value = array[array[id + 1]];
  if (mode1!=0) value = array[id + 1];
  let pointer = id+3;
  if (value!=0 && !invert || (value==0 && invert=='invert')) {
    pointer = array[array[id + 2]];
    if (mode2!=0) pointer = array[id + 2];
  }
  return pointer;
}

LessThan = (array, id, mode1, mode2) => {
  let first = array[array[id + 1]];
  if (mode1!=0) first = array[id + 1];

  let second = array[array[id + 2]];
  if (mode2!=0) second = array[id + 2];

  if (first<second) {
    array[array[id + 3]] = 1;
  } else {
    array[array[id + 3]] = 0;
  }
  return array;
}

Equals = (array, id, mode1, mode2) => {
  let first = array[array[id + 1]];
  if (mode1!=0) first = array[id + 1];

  let second = array[array[id + 2]];
  if (mode2!=0) second = array[id + 2];

  if (first==second) {
    array[array[id + 3]] = 1;
  } else {
    array[array[id + 3]] = 0;
  }
  return array;
}