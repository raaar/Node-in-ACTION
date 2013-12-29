var Agecalc = require('./age-calculator')
,	age = 25;


agecalc = new Agecalc(age);


console.log(agecalc.daysLived(27));
console.log(agecalc.doggyYears(3));

