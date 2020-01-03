/*-------- READ-FROM-FILE-CRAP ------- */
const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  else Calc(data);
});

/*------------- REAl CODE ------------- */

Calc = (data) => {
  initial_array = data.split("\n");
  let connections = {};
  for (conn of initial_array){
    connections[conn.split(')')[1]] = conn.split(')')[0]
  }

  const YOU = FullPath('YOU', connections);
  const SAN = FullPath('SAN', connections);

  for (let i = 0; i < YOU.length; i++){
    for (let j = 0; j < SAN.length; j++){
      if (YOU[i]==SAN[j]) {
        console.log(i+j-2);
        return;
      }
    }
  }
  
}

FullPath = (star, connections) => {
  if (star == 'COM') return ['COM'];
  else return [star, ...FullPath(connections[star], connections)]
}
