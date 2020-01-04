/*-------- READ-FROM-FILE-CRAP ------- */
const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  else Calc(data);
});

/*------------- REAl CODE ------------- */

let AMOUNT = 25*6,
WIDTH = 25,
layers = [],
colors = {
  0: '□',
  1: '■',
  2: 2
},
final_image = new Array(150).fill(2);

  Calc = (arr) => {
    for (let i=0; i<(arr.length/AMOUNT); i++){
      layer = arr.substring(i*AMOUNT, (i+1)*AMOUNT);
      layers.push(layer);
      //layers.push({string: layer, ...FindRepeatables(layer)});
    }
    AlignLayers(layers);
  }

    /* FindRepeatables = (str) => {
    let rep = {};
    for (letter of str){
      if (rep[letter]!=undefined) rep[letter]+=1;
      else rep[letter] = 1;
    }
    return rep;
  }
  
 FindMostZeroes = (layers) => {
    let best_layer = {0:AMOUNT};
    for (layer of layers){
      if (layer[0] < best_layer[0]) best_layer = layer;
    }
    console.log(best_layer);
    console.log(best_layer[1]*best_layer[2]);
  } */

  AlignLayers = (layers) => {
    for (layer of layers){
      for (let i=0; i<layer.length; i++){  
        if (final_image[i]==2) final_image[i] = colors[layer[i]];
      }
    }
    OutputImage(final_image, WIDTH);
  }

  OutputImage = (pixels, width) => {
    const pixel_line = pixels.join('');
    for (let i=0; i<pixel_line.length/width; i++){
      console.log(pixel_line.substring(i*width, (i+1)*width))
    }
  }