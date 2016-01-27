define(function() {

// a generalized (Globalized?) date. Eras, years, months and dates are numbers,
// but months may also have a type ("leap" is the only one defined in CLDR now).
// There is no concept of month or year order built into CLDR (thus the month after "1" isn't
// necessarily "2", and the year before 1000 isn't necessarily 999.
// There may be two months with the same number; the Chinese calendar does this,
// with one month having an undefined type and the next, the "leap" type.
// Dates are assumed to go in order,
// so the native Date implementation is valid.
// These objects are designed to be immutable.

function Gdate() { }
Gdate.prototype = {
	getEra: function() { return this._era; },
	getYear: function() { return this._year; },
	getMonth: function() { return this._month; },
	getMonthType: function() { return this._monthType; },
	getDate: function() { return this._date; },
	nextDate: function( n ) {
		if ( arguments.length === 0 ) {
			n = 1;
		}
		var d = new Date( this._d.getTime() ); // I'm getting errors with new Date(this._d)
		d.setDate( this._d.getDate() + n );
		return new this.constructor( d );
	},
	nextYear: undefined, // virtual function
	nextMonth: undefined, // virtual function
	startOfMonth: function() {
		return this.nextDate( 1 - this._date );
	},
	startOfYear: function() {

		// no choice but to go through each month one at a time
		var thisMonth = this,
			lastMonth = thisMonth.nextMonth( -1 );
		while ( lastMonth.getYear() === thisMonth._year ) {
			thisMonth = lastMonth;
			lastMonth = thisMonth.nextMonth( -1 );
		}
		return thisMonth.startOfMonth();
	},
	toDate: function() {

		// we need to make sure that an arbitrary time doesn't leak through
		var d = new Date( this._d.getFullYear(), this._d.getMonth(), this._d.getDate(),
			0, 0, 0, 0 );
		d.setFullYear( this._d.getFullYear() ); // deal with Y2K bug in Javascript
		return d;
	},
	_init: function( era, year, month, date, monthType ) {
		if ( era instanceof Date ) {
			this._setDate( era );
		}else if ( era instanceof Gdate ) {
			this._setDate( era.toDate() );
		}else {
			this._setFields( era, year, month, date, monthType );
		}
	},
	constructor: Gdate, // allow the new this.constructor idiom
	_setDate: undefined, // virtual function
	_setFields: undefined, // virtual function
	_era: NaN,
	_year: NaN,
	_month: NaN,
	_monthType: undefined,
	_date: NaN,
	_d: new Date( NaN )
};

Gdate.calendars = {}; // this will store the calendar algorithms (the Gdate subclass constructors)

return Gdate;

});
