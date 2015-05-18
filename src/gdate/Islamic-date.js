define([
	"./Gdate"
], function( Gdate ) {

// Islamic tabular calendar (http://en.wikipedia.org/wiki/Tabular_Islamic_calendar)
// from Keith Wood's https://github.com/kbwood/calendars/blob/master/jquery.calendars.islamic.js
// Used under license
var jdEpoch = 1948439.5,
		daysPerMonth = [ 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29 ];

function IslamicDate() { this._init.apply(this, arguments); }
IslamicDate.prototype = new Gdate();

IslamicDate.prototype.constructor = Gdate.calendars.islamic = IslamicDate;
IslamicDate.prototype.nextYear = function(n) {
  if (arguments.length === 0){
		n = 1;
	}
	return new IslamicDate( this._era, this._year + n, this._month, this._date );
};
IslamicDate.prototype.nextMonth = function(n) {
	var id = fromJD( dateToJD( this._d ) ),
		m = id.m + n,
		y = id.y + Math.floor( ( m - 1 ) / 12 );
	m = ( m + 11 ) % 12 + 1;
	return new IslamicDate( this._era, y, m, id.d );
};
IslamicDate.prototype._coerceMonth = function( m, y ) {
	var id = fromJD( dateToJD( this._d ) );
	if (id.m === m && id.y === y ) {
		return;
	}
	this._setDate( jdToDate( toJD( y, m, daysInMonth( y, m ) ) ) );
};
IslamicDate.prototype._setDate = function(d) {
	var id = fromJD( dateToJD( d ) );
  if ( id.y < 1 || isNaN(d.getTime()) ){ // no dates before Epoch
    this._era = NaN;
    this._year = NaN;
    this._month = undefined;
    this._date = NaN;
		this._d = new Date( NaN );
  }else {
		this._era = 0;
		this._year = id.y;
		this._month = "" + id.m;
		this._date = id.d;
		this._d = d;
  }
};
IslamicDate.prototype._setFields = function(era, year, month, date) {
	var m = parseInt (month, 10),
		itoday = fromJD( dateToJD( new Date() ) );

	era = 0; // only one era
	if ( year == null ) {
		year = itoday.y;
	}else if ( year < 1 ) {
		year = 1;
	}
	if ( month == null ) {
		m = itoday.m;
	}else if ( m < 1 ) {
		m = 1;
	}else if ( m > 12 ){
		m = 12;
	}
	if ( date == null ) {
		date = itoday.d;
	}else if ( date < 1 ) {
		date = 1;
	}
	this._setDate( jdToDate( toJD( year, m, date ) ) );
	this._coerceMonth( m, year );
};

return IslamicDate;

function leapYear ( year ) {
	return ( year * 11 + 14) % 30 < 11;
}

function daysInMonth ( year, month ) {
	return daysPerMonth[ month - 1 ] +
		( month === 12 && leapYear( year ) ? 1 : 0 );
}

// Retrieve the Julian date equivalent for this date,
//	i.e. days since January 1, 4713 BCE Greenwich noon.
function toJD ( year, month, day ) {
	return day + Math.ceil( 29.5 * (month - 1) ) + ( year - 1 ) * 354 +
		Math.floor( 3 + (11 * year ) / 30 + jdEpoch - 1 );
}

function fromJD ( jd ) {
	var month, year, day;
	jd = Math.floor( jd ) + 0.5;
	year = Math.floor( (30 * ( jd - jdEpoch ) + 10646 ) / 10631 );
	year = (year <= 0 ? year - 1 : year);
	month = Math.min( 12, Math.ceil( ( jd - 29 - toJD( year, 1, 1 ) ) / 29.5 ) + 1 );
	day = jd - toJD( year, month, 1 ) + 1;
	return { y: year, m: month, d: day };
}

function dateToJD (d) {
	var a, b,
		year = d.getFullYear(),
		month = d.getMonth(),
		date = d.getDate();
	// Jean Meeus algorithm, "Astronomical Algorithms", 1991
	if (month < 2) {
		month += 12;
		year--;
	}
	a = Math.floor( year / 100 );
	b = 2 - a + Math.floor( a / 4 );
	return Math.floor( 365.25 * ( year + 4716 )) +
		Math.floor(30.6001 * ( month + 2 ) ) + date + b - 1524.5;
}

function jdToDate ( jd ){
	var b, c, d, e, day, month, year, date,
		z = Math.floor( jd + 0.5 ),
		a = Math.floor( ( z - 1867216.25 ) / 36524.25 );
	a = z + 1 + a - Math.floor( a / 4 );
	b = a + 1524;
	c = Math.floor( ( b - 122.1 ) / 365.25);
	d = Math.floor( 365.25 * c );
	e = Math.floor( ( b - d ) / 30.6001);
	day = b - d - Math.floor( e * 30.6001 );
	month = e - ( e > 13.5 ? 14 : 2 );
	year = c - ( month > 1.5 ? 4716 : 4715 );
	date = new Date( year, month, day );
	date.setFullYear( year ); // deal with Y2K bug
	return date;
}

});
