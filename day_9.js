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

Address = (arr, id, mode) => {
  switch (mode) {
    case '0': return arr[id]
    case '1': return id
    case '2': return arr[id] + RELATIVE_BASE
    default: return arr[id]     
  }
}

Sum = (array, id, mode1, mode2, mode3) => {
  const first = array[Address(array, id+1, mode1)];
  const second = array[Address(array, id+2, mode2)];
  array[Address(array, id+3, mode3)] = first + second;
  return array;
}


Multiply = (array, id, mode1, mode2, mode3) => {
  const first = array[Address(array, id+1, mode1)];
  const second = array[Address(array, id+2, mode2)];

  if (String(first).length+String(second).length>34) {
    console.log('too big of a number')
    return 0;
  } else {
    array[Address(array, id+3, mode3)] = first * second;
    return array;
  }
}

Input = (array, id, mode1) => {
  array[Address(array, id+1, mode1)] = INPUT;
  return array;
}

Output = (array, id, mode1) => {
  OUTPUT += ', ';
  OUTPUT += array[Address(array, id+1, mode1)]
  return array;
}

JumpIfTrue = (array, id, mode1, mode2, invert) => {
  const value = array[Address(array, id+1, mode1)];
  let pointer = id+3;
  if (value==1 && !invert || (value==0 && invert=='invert')) {
    pointer = array[Address(array, id+2, mode2)];
  }
  return pointer;
}

LessThan = (array, id, mode1, mode2, mode3) => {
  const first = array[Address(array, id+1, mode1)];
  const second = array[Address(array, id+2, mode2)];
  if (first<second) {
    array[Address(array, id+3, mode3)] = 1;
  } else {
    array[Address(array, id+3, mode3)] = 0;
  }
  return array;
}

Equals = (array, id, mode1, mode2, mode3) => {
  const first = array[Address(array, id+1, mode1)];
  const second = array[Address(array, id+2, mode2)];
  if (first==second) {
    array[Address(array, id+3, mode3)] = 1;
  } else {
    array[Address(array, id+3, mode3)] = 0;
  }
  return array;
}

ChangeBase = (array, id, mode1) => {
  const base_diff = array[Address(array, id+1, mode1)];
  RELATIVE_BASE += base_diff;
}