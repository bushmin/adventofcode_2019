/*-------- READ-FROM-FILE-CRAP ------- */
const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  else Calc(data);
});

/*------------- REAl CODE ------------- */

let initial_array = [];

Calc = (data) => {
  initial_array = data.split(",");
  Selection();
}

Selection = () => {
  for (let i=0; i<100; i++) {
    for (let j=0; j<100; j++) {
      let new_arr = [...initial_array];
      new_arr[1] = i;
      new_arr[2] = j;
      const val = IntCode(new_arr, 0);
      if (val == 19690720) {
        console.log(100*i+j);
        return;
      }
    }
  }
}

IntCode = (arr, id) => {
  switch (Number(arr[id])) {
    case 1:
      arr = Sum(arr, arr[id + 1], arr[id + 2], arr[id + 3]);
      break;
    case 2:
      arr = Multiply(arr, arr[id + 1], arr[id + 2], arr[id + 3]);
      break;
    case 99:
      return arr[0];
    default:
      break;
  }
  return IntCode(arr, id + 4);
}

Sum = (array, first, second, result) => {
  array[result] = Number(array[first]) + Number(array[second]);
  return array;
}
Multiply = (array, first, second, result) => {
  array[result] = Number(array[first]) * Number(array[second]);
  return array;
};
