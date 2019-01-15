const parameters = {'dream' : {value: 1} , 'force' : {value: " gkqselk"}}

let valueName = 'dream';
let value = "";
if (parameters.hasOwnProperty(valueName)) {
  value = parameters[valueName].value
}else{
  value = "no"
}

console.log(value)
