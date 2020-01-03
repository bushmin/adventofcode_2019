const low = 347312;
const high = 805915;

let amount = 0;

IsValid = (i) => {
  i = '-' + i + '-';
  let double = false;
  for (j = 1; j < i.length - 2; j++){
    if (i[j + 1] < i[j]) return false
    if (i[j + 1] == i[j] && i[j - 1] != i[j] && i[j + 1] != i[j + 2]) {
      double = true;
    }
  }

  if (double) return true;
  return false;
}

for(let i = low; i <= high; i++){
  if (IsValid(String(i))) {
    amount++;
  }
}
console.log(amount)