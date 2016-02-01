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
		var self = this,
			today = function() { // lazy create today's date
				var ret = new self.constructor( new Date() );
				today = function() { return ret; };
				return ret;
			};
		if ( era instanceof Date ) {
			this._setDate( era );
		} else if ( era instanceof Gdate ) {
			this._setDate( era.toDate() );
		} else if ( era == null && year == null && month == null && date == null ) {
			this._setDate( new Date( NaN ) ) ;
		} else if ( year ==  null && month == null && date == null ) {
			this._setDate ( new Date() );
		} else {

			// set defaults; see the algorithm at https://gist.github.com/dwachss/4f9a6c77c8feb8e2ad09
			if ( date == null ) {
				date = 1;
			}
			if ( month == null && year !== null ) {
				month = 1;
			} else if ( month == null ) {
				month = today().getMonth();
			}
			if ( year == null ) {
				year = today().getYear();
			}
			if ( era == null ) {
				era = today().getEra();
			}
			this._setFields( era, year, month, date, monthType );
		}
	},
	_setInvalid: function() {
		this._era = this._year = this._month = this._date = NaN;
		this._month = undefined;
		this._d = new Date( NaN );
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
