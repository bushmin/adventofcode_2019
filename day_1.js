/*-------- READ-FROM-FILE-CRAP ------- */
const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  else Calc(data);
});

/*------------- REAl CODE ------------- */

Calc = (data) => {
  let numArray = data.split("\n");
  let result = numArray.reduce(Reducer, 0);
  console.log(result);
}

Reducer = (acc, val) => acc + ExtraFuel(val);

ExtraFuel = (mass) => {
  const fuel = Math.max(0, Math.floor(mass / 3) - 2);
  if (fuel > 0) return fuel + ExtraFuel(fuel);
  return 0;
}