var Agecalc = function(age){
	this.age = age;
}

Agecalc.prototype.daysLived = function(currentAge) {
	return currentAge * 365;
}

Agecalc.prototype.doggyYears = function(dogAge) {
	return dogAge * 3;
}
module.exports = Agecalc;

