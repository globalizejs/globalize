define([
	"./Gdate"
], function( Gdate ) {

// convert from Unicode month indicies to algorithmically friendly numbers
var months = [ "8", "9", "10", "11", "12", "13", "1", "2", "3",
	"4", "5", "7", "6", "7-yeartype-leap" ],
	monthsReversed = {};
months.forEach( function( value, i ) { monthsReversed[value] = i; } );

function addDay(d, n){
	var ret = new Date (d.getTime());
	ret.setDate( ret.getDate() + n );
	return ret;
}

function HebrewDate() { this._init.apply(this, arguments); }
HebrewDate.prototype = new Gdate();

HebrewDate.prototype.constructor = HebrewDate;
HebrewDate.prototype.nextYear = function(n) {
  if (arguments.length === 0){
		n = 1;
	}
	return new HebrewDate( this._era, this._year + n, this._month, this._date );
};
HebrewDate.prototype.nextMonth = function(n) {
	var ret,
		hd = civ2heb( this._d ),
		roshchodesh = addDay(this._d, -hd.d + 1),
		//  the min/max() correct for the possibility of other month being too short
		daysinlastmonth = Math.max( civ2heb( addDay( roshchodesh, -1 ) ).daysinmonth, hd.d ),
		nextroshchodesh = addDay( roshchodesh, hd.daysinmonth ),
		daysintonextmonth = Math.min( hd.d, civ2heb( nextroshchodesh ).daysinmonth );
  if (arguments.length === 0){
		n = 1;
	}
	if (n === 0 ){
		return new HebrewDate ( this );
	}else if ( n === 1 ){
		return new HebrewDate( addDay( roshchodesh, hd.daysinmonth + daysintonextmonth - 1 ) );
	}else if ( n === -1 ){
		return new HebrewDate( addDay( this._d, -daysinlastmonth) );
	}else if ( n > 0 ) {
		ret = this.nextMonth( 1 ).nextMonth( n - 1 ); // anything wrong with tail recursion?
	}else /*  n < 0 */ {
		ret = this.nextMonth( -1 ).nextMonth( n + 1 );
	}
	if ( ret._date === this._date ) {
		return ret;
	}
	// have to deal with dates that were coerced too far back by going through short months
	return new HebrewDate ( this._era, ret._year, ret._month, this._date );
};
HebrewDate.prototype._coerceMonth = function( m, y ) {
	var roshchodesh,
		hd = civ2heb( this._d );
	if (hd.m === m && hd.y === y ) {
		return;
	}
	roshchodesh = civ2heb( heb2civ({ y: y, m: m, d:1 }) );
	this._setDate( heb2civ({ y: y, m: m, d: roshchodesh.daysinmonth }) );
};
HebrewDate.prototype._setDate = function(d) {
	var hd = civ2heb( d );
  if ( hd.y < 1 || isNaN(d.getTime()) ){ // no dates before Creation
    this._era = NaN;
    this._year = NaN;
    this._month = undefined;
    this._date = NaN;
		this._d = new Date( NaN );
  }else {
		this._era = 0;
		this._year = hd.y;
		this._month = months[ hd.m ];
		this._date = hd.d;
		this._d = d;
  }
};
HebrewDate.prototype._setFields = function(era, year, month, date) {
	var m,
		htoday = civ2heb( new Date() );

	era = 0; // only one era
	if ( year == null ) {
		year = htoday.y;
	}else if ( year < 1 ) {
		year = 1;
	}
	if ( month == null ) {
		m = htoday.m;
	}else if ( month in monthsReversed ) {
		m = monthsReversed[month];
	}else {
		this._setDate( new Date(NaN) );
		return;
	}
	if ( date == null ) {
		date = htoday.d;
	}else if ( date < 1 ) {
		date = 1;
	}
	htoday = {
		y: year,
		m: m,
		d: date
	};
	this._setDate( heb2civ( htoday ) );
	this._coerceMonth( m, year );
};

return HebrewDate;

function pesach(year) {
	var a, b, c, m,
		mar;	// "day in March" on which Pesach falls

	a = Math.floor( (12 * year + 17) % 19 );
	b = Math.floor( year % 4 );
	m = 32.044093161144 + 1.5542417966212 * a +  b / 4 - 0.0031777940220923 * year;
	if (m < 0) {
		m -= 1;
	}
	mar = Math.floor( m );
	if ( m < 0 ) {
		m++;
	}
	m -= mar;

	c = Math.floor( ( mar + 3 * year + 5 * b + 5 ) % 7);
	if ( c === 0 && a > 11 && m >= 0.89772376543210 ) {
		mar++;
	}else if ( c === 1 && a > 6 && m >= 0.63287037037037 ) {
		mar += 2;
	}else if ( c === 2 || c === 4 || c === 6 ) {
		mar++;
	}

	mar += Math.floor( ( year - 3760 ) / 100 ) - Math.floor( ( year - 3760 ) / 400 ) - 2;
	return mar;
}

function leap(y) {
	return ( ( y % 400 === 0 ) || ( y % 100 !== 0 && y % 4 === 0 ) );
}

// takes a Date object, returns an object with
// { m: hebrewmonth, d: hebrewdate, y: hebrewyear,
//   daysinmonth: number of days in this Hebrew month }
function civ2heb( date ) {
	var days, hy, p, anchor, adarType,
		d = date.getDate(),
		m = date.getMonth() + 1,
		y = date.getFullYear();

	m -= 2;
	if ( m <= 0 ) { // Jan or Feb
		m += 12;
		y -= 1;
	}

	d += Math.floor( 7 * m / 12 + 30 * (m - 1) ); // day in March
	hy = y + 3760;	// get Hebrew year
	p = pesach( hy );
	if (d <= p - 15) { // before 1 Nisan
		anchor = p;
		d += 365;
		if ( leap(y) ) {
			d++;
		}
		y -= 1;
		hy -= 1;
		p = pesach( hy );
	}else {
		anchor = pesach( hy + 1 );
	}

	d -= p - 15;
	anchor -= p - 12;
	y++;
	if ( leap( y ) ){
		anchor++;
	}

	for ( m = 0; m < 11; m++ ) {
		if ( m === 7 && anchor % 30 === 2 ) {
			days = 30; // Cheshvan
		}else if ( m === 8 && anchor % 30 === 0 ) {
			days = 29; // Kislev
		}else {
			days = 30 - m % 2;
		}
		if ( d <= days ) {
			break;
		}
		d -= days;
	}

	adarType = 0;			// plain old Adar
	if ( m === 11 ) {
		days = 29;
	}
	if ( m === 11 && anchor >= 30 ) {
		if (d > 30) {
			adarType = 2;	// Adar 2
			d -= 30;
		}else {
			adarType = 1;	// Adar 1
			days = 30;
		}
	}

	if ( m >= 6 ) {		// Tishrei or after?
		hy++;
	}

	if ( m === 11 ) { // adjust for Adars
		m += adarType;
	}
	return { d: d, m: m, y: hy, daysinmonth: days };
}

// Takes a hebrew date in the object form above and returns a Date object
// Assumes that the months are valid, except for the following:
// Unicode assumes that m===11 becomes m=13 in leap years (plain Adar translates to Adar II).
// In regular years, both m===12 and m===13 become m=11 (Adar I and Adar II translate to Adar).
function heb2civ( h ){
	var d, day, isleap, m, p, yearlength, yeartype;
	// dates through Cheshvan are completely determined by pesach
	if ( h.m < 6 ) {
		return new Date ( h.y - 3760, 2, pesach( h.y ) - 15 + h.d + Math.ceil( h.m * 29.5 ) );
	}
	if ( h.m < 8 ) {
		return new Date ( h.y - 3761, 2, pesach( h.y - 1 ) - 15 + h.d + Math.ceil( h.m * 29.5 ) );
	}
	p = pesach( h.y - 1 );
	yearlength = pesach( h.y ) - p + 365 + ( leap( h.y - 3760 ) ? 1 : 0 );
	yeartype = yearlength % 30 - 24; // -1 is chaser, 0 is ksidrah, +1 is male
	isleap = yearlength > 360;
	m = h.m;
	if ( isleap && m === 11 ) {
		m += 2;
	}else if ( !isleap && m > 11 ) {
		m = 11;
	}
	day = p - 15 + h.d + Math.ceil( m * 29.5 ) + yeartype;
	if (m > 11) {
		day -= 29; // we added an extra month in there (in leap years, there is no plain Adar)
	}
	d = new Date (h.y - 3761, 2, day);
	// if the hebrew date was valid but wrong
	// (Cheshvan or Kislev 30 in a haser year; Adar I 30 in a non-leap year)
	// then move it back a day to the 29th
	// we won't try to correct an actually invalid date
	if ( h.d < 30 || civ2heb( d ).m === m ){
		return d; // it worked
	}
	return new Date (h.y - 3761, 2, day - 1);
}
});
