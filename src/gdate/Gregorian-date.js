define([
	"./Gdate"
], function( Gdate ) {

function GregorianDate() { this._init.apply(this, arguments); }
GregorianDate.prototype = new Gdate();

GregorianDate.prototype.constructor = Gdate.calendars.gregorian = GregorianDate;
GregorianDate.prototype.nextYear = function(n) {
  if (arguments.length === 0){
		n = 1;
	}
  var d = new Date(this._d);
  d.setFullYear(this._d.getFullYear() + n);
  this._coerceMonth(d, this._d.getMonth());
  return new GregorianDate(d);
};
GregorianDate.prototype.nextMonth = function(n) {
  if (arguments.length === 0){
		n = 1;
	}
  var d = new Date(this._d.getTime());
  d.setMonth(this._d.getMonth() + n);
  this._coerceMonth(d, (this._d.getMonth() + n + 12) % 12);
  return new GregorianDate(d);
};
GregorianDate.prototype._coerceMonth = function(d, m) {
   if (d.getMonth() > m){
    // date was too large; overflowed into the next month
    d.setDate(1);
    d.setMonth(m + 1);
    d.setDate(0); // last day of previous month
  }
};
GregorianDate.prototype._setDate = function(d) {
  this._d = d;
  if (isNaN(d.getTime())){
    this._era = NaN;
    this._year = NaN;
    this._month = undefined;
    this._date = NaN;
  }else {
    this._era = d.getFullYear() < 0 ? 0 : 1;
    this._year = Math.abs(d.getFullYear());
		if (this._era === 0) {
			++this._year; // Date year == -4 corresponds to 5 BCE
		}
    this._month = "" + (d.getMonth() + 1);  // quickie stringify
    this._date = d.getDate();
  }
};
GregorianDate.prototype._setFields = function(era, year, month, date) {
  var d = new Date(), m = parseInt (month, 10) - 1;
  if (era == null){
		era = d.getFullYear() < 0 ? 0 : 1;
	}
  if (year == null){
		year = d.getFullYear();
	}
  if (month == null){
		month = d.getMonth() + 1;
	}
  if (date == null){
		date = d.getDate();
	}
  if (year < 1){
		year = 1;
	}
  if (m < 0){
		m = 0;
	}
  if (m > 11){
		m = 11;
	}
  if (date < 1){
		date = 1;
	}
  // use d to check for valid date's
	year = era === 1 ? year : 1 - year;
  d.setFullYear(year);
  d.setMonth(m);
  d.setDate(date);
  this._coerceMonth(d, m);
  this._setDate(d);
};

});
