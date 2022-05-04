const moment = require ('moment');

let now = moment(); 
//fecha actual
console.log(now);
let miCumple = moment("11-13-1999","MM-DD-YYYY");

const difYears = now.diff(miCumple,'years');
const difDias = now.diff(miCumple, "days");
const difMin = now.diff(miCumple,'minutes');
console.log(difYears, difDias, difMin);
