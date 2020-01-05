/*-------- READ-FROM-FILE-CRAP ------- */
const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  else Calc(data);
});

/*------------- REAl CODE ------------- */

let initial_array = [],
INPUT = 2,
OUTPUT = '',
RELATIVE_BASE = 0,
padding_zeroes = 10000;

Calc = (data) => {
  initial_array = data.split(",");
  initial_array = initial_array.map(val => Number(val));
  let extended_array = [...initial_array, ...new Array(padding_zeroes).fill(0)]; //easy extra memory :)
  RecursiveKiller(extended_array, 0);
}

RecursiveKiller = (arr, id) => {
  let finish_flag = false;
  while (!finish_flag) {
    const result = IntCode(arr, id);
    arr = result.arr;
    id = result.id;
    if (result.finish) finish_flag = true;
  }
  console.log('Result:',OUTPUT.slice(2)); //removing ", " in front
}

//let CYCLES = 0;

IntCode = (arr, id) => {
  //CYCLES += 1;
  //console.log('CYCLE:', CYCLES); //there will be 300k+ of them
  const command = String(arr[id]).padStart(5, "0");
  switch (Number(command[3]+command[4])) {
    case 1:
      arr = Sum(arr, id, command[2], command[1], command[0]);
      return {arr, id: id+4}
    case 2:
      arr = Multiply(arr, id, command[2], command[1], command[0]);
      return {arr, id: id+4}
    case 3:
      arr = Input(arr, id, command[2]);
      return {arr, id: id+2}
    case 4:
      arr = Output(arr, id, command[2]);
      return {arr, id: id+2}
    case 5:
      poiner_new = JumpIfTrue(arr, id, command[2], command[1]);
      return {arr, id: poiner_new}
    case 6:
      poiner_new = JumpIfTrue(arr, id, command[2], command[1], 'invert');
      return {arr, id: poiner_new}
    case 7:
      arr = LessThan(arr, id, command[2], command[1], command[0]);
      return {arr, id: id+4}
    case 8:
      arr = Equals(arr, id, command[2], command[1], command[0]);
      return {arr, id: id+4}
    case 9:
      ChangeBase(arr, id, command[2]);
      return {arr, id: id+2}
    case 99:
      return  {arr, id, finish: true}
    default:
      console.log('unknown command')
      return {finish: true}
  }
}

Sum = (array, id, mode1, mode2, mode3) => {
  let first = array[array[id + 1]];
  if (mode1==1) first = array[id + 1];
  if (mode1==2) first = array[array[id + 1] + RELATIVE_BASE];

  let second = array[array[id + 2]];
  if (mode2==1) second = array[id + 2];
  if (mode2==2) second = array[array[id + 2] + RELATIVE_BASE];

  if (mode3==2) array[array[id + 3] + RELATIVE_BASE] = first + second;
  else array[array[id + 3]] = first + second;
  return array;
}


Multiply = (array, id, mode1, mode2, mode3) => {
  let first = array[array[id + 1]];
  if (mode1==1) first = array[id + 1];
  if (mode1==2) first = array[array[id + 1] + RELATIVE_BASE];

  let second = array[array[id + 2]];
  if (mode2==1) second = array[id + 2];
  if (mode2==2) second = array[array[id + 2] + RELATIVE_BASE];

  if (String(first).length+String(second).length>34) {
    console.log('too big of a number')
    return 0;
  } else {
    if (mode3==2) array[array[id + 3] + RELATIVE_BASE] = first * second;
    else array[array[id + 3]] = first * second;
  }
  return array;
}

Input = (array, id, mode1) => {
  if (mode1==2) array[array[id + 1] + RELATIVE_BASE] = INPUT;
  else array[array[id + 1]] = INPUT;
  return array;
}

Output = (array, id, mode1) => {
  OUTPUT += ', ';
  if (mode1==1) { OUTPUT += String(array[id + 1]) }
  else if (mode1==2) {OUTPUT += String(array[array[id + 1] + RELATIVE_BASE])}
  else { OUTPUT += String(array[array[id + 1]]) }
  return array;
}

JumpIfTrue = (array, id, mode1, mode2, invert) => {
  let value = array[array[id + 1]];
  if (mode1==1) value = array[id + 1];
  if (mode1==2) value = array[array[id + 1] + RELATIVE_BASE];
  let pointer = id+3;
  if (value==1 && !invert || (value==0 && invert=='invert')) {
    pointer = array[array[id + 2]];
    if (mode2==1) pointer = array[id + 2];
    if (mode2==2) pointer = array[array[id + 2] + RELATIVE_BASE];
  }
  return pointer;
}

LessThan = (array, id, mode1, mode2, mode3) => {
  let first = array[array[id + 1]];
  if (mode1==1) first = array[id + 1];
  if (mode1==2) first = array[array[id + 1] + RELATIVE_BASE];

  let second = array[array[id + 2]];
  if (mode2==1) second = array[id + 2];
  if (mode2==2) second = array[array[id + 2] + RELATIVE_BASE];

  if (first<second) {
    if (mode3==2) array[array[id + 3] + RELATIVE_BASE] = 1;
    else array[array[id + 3]] = 1;
    
  } else {
    if (mode3==2) array[array[id + 3] + RELATIVE_BASE] = 0;
    else array[array[id + 3]] = 0;
  }
  return array;
}

Equals = (array, id, mode1, mode2, mode3) => {
  let first = array[array[id + 1]];
  if (mode1==1) first = array[id + 1];
  if (mode1==2) first = array[array[id + 1] + RELATIVE_BASE];

  let second = array[array[id + 2]];
  if (mode2==1) second = array[id + 2];
  if (mode2==2) second = array[array[id + 2] + RELATIVE_BASE];

  if (first==second) {
    if (mode3==2) array[array[id + 3] + RELATIVE_BASE] = 1;
    else array[array[id + 3]] = 1;
  } else {
    if (mode3==2) array[array[id + 3] + RELATIVE_BASE] = 0;
    else array[array[id + 3]] = 0;
  }
  return array;
}

ChangeBase = (array, id, mode1) => {
  let base_diff = array[array[id + 1]];
  if (mode1==1) base_diff = array[id + 1];
  if (mode1==2) base_diff = array[array[id + 1] + RELATIVE_BASE];
  RELATIVE_BASE += base_diff;
}