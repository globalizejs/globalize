/*
Based on http://www.math.nus.edu.sg/aslaksen/calendar/cal.pdf

(transliterated Chinese does not contain accented characters since jshint balks at them).
To calculate dates in the traditional Chinese calendar (a lunisolar calendar),
there are a few rules (enumerated in Dr. Aslaksen's article).
Rule 1+2: days start at midnight, Bejing time (UTC+0800)
Rule 3: Months start on the day (as defined above) of the New Moon

So calculating the day of the month for any given day is straightforward if we can calculate new
moons. The hard part is deciding what month it is.

There are 12 or 13 months in a year, which is adjusted to match the solar year. In a non-leap year,
the months are named 1 through 12. In a leap year, one of the months is doubled, with the second
month being named with the same number plus "runyue". CLDR english appends "bis" to the
month name. The hard part is deciding which month to
intercalate.

Chinese New Years is always in January or February, so we can label Chinese years
with the corresponding Gregorian year, realizing that the last few weeks of the
year actually are in the next Gregorian year.

To name the months of year n, determine the solar year ("sui") from the day after the
winter solstice of year n-1 to the day of the winter solstice of year n, inclusive.

Determine the days of the new moons in that sui. There will be 12 or 13. If there are 12,
then it is not a leap sui and the first new moon is the start of month 12 of year n-1,
Chinese New Year is the second new moon, and number the months in order from there until
month 11 of year n. Determining the start of month 12 or possible runyue 11th and 12th
months requires running the algorithm for year n+1.
The lunar year from New Year to New Year is called "nian".

If there are 13 new moons, the runyue month is the first one of the sui that does not
correspond to a "solar month", meaning that it does not contain a
"solar month start" or zhongqi. The other months are number sequentially.

Zhongqi are calculated as 1/12 of the solar orbit, starting from the winter solstice
(the sun longitude is at 0 degrees). The next is when the sun is at 30 degrees, then at 60
degrees, etc. to 330 degrees (next would be the upcoming winter solstice). They are
approximately on the 20th of each Gregorian month.

Note that if the winter solstice is on the same day as the new moon, then that new moon
is the start of month 11. Month 11 always contains the winter solstice.

Years are numbered in cycles of 60 years; 1984 was year 1 of the cycle, so the year number
ought to be (date.getFullYear() - 1984) % 60 + 1. Javascript's % operator doesn't handle
negative numbers correctly, so the actual algorithm is
((date.getFullYear() - 1984) % 60 + 61) % 60.

Exactly when this cycle started (which cycle the year is in, here called the era by analogy to
the Gregorian BCE/CE) is a matter of some controversy. ICU uses 2637 BCE, so the era is
Math.floor((date.getFullYear() + 2696) / 60 ).
This is right because 2637 BCE means getFullYear -2636 (there is no 0 BCE), and we want the
first cycle to be era 1 not era 0, so we go back another 60 years.

*/
define([
	"./Gdate"
//	"./astronomy.js" // this creates errors in testing, but it is clearly required.
], function( Gdate ) {
	// cache of solar years. Each field is indexed by Gregorian year
	// and is an array of new moons:
	// {
	// 	newMoon: Integer,
	// 	m: Integer,
	// 	leap: undefined || "leap",
	// 	y: Integer
	// 	e: Integer
	// },
	// starting from
	// the day after the winter solstice of the previous year through the winter solstice
	// of this year. New Moon is the chinese day number (days from New Year 2016, 2016-02-08) of
	// the new moon, m and leap give the name of the month. y is the chinese year number for that
	// month (1..60). Months 1 through 11 belong to that year;
	// months 11-leap, 12 and 12-leap (if they exist) belong to the previous year.
	// e is the era number (as defined above).
	// The array also has a field solstice that is the chinese day number of the winter solstice
	var sui = {};

	function ChineseDate() { this._init.apply(this, arguments); }
	ChineseDate.prototype = new Gdate();

	ChineseDate.prototype.constructor = Gdate.calendars.chinese = ChineseDate;
	ChineseDate.prototype.nextYear = function(n) {
		if (arguments.length === 0){
			n = 1;
		}
		return new ChineseDate( this._era, this._year + n, this._month,
			this._date, this._monthType );
	};

	ChineseDate.prototype.nextMonth = function(n) {
		var i, m, ret,
			gy = cy2sui ( this._era, this._year, this._month, this._monthType ),
			months = getMonths( gy );

		if (arguments.length === 0){
			n = 1;
		}
		// find the current month
		for ( i = 0; i < months.length; ++i ){
			if (this._month === months[i].m && this._monthType === months[i].leap ){
				break;
			}
		}
		// if i is months.length here, the month wasn't found. That's a bug
		if (i >= months.length){
			/* console.error(this, i, gy, months, "not found"); */
			return new ChineseDate ( new Date( NaN ) );
		}
		if (n === 0 ){
			return new ChineseDate ( this );
		}else if ( n === 1 ){
			m = months[ i + 1 ];
			if ( m === undefined ){
				months = getMonths( gy + 1 );
				m = months[ 0 ];
			}
			return new ChineseDate( m.e, m.y, m.m, this._date, m.leap );
		}else if ( n === -1 ){
			m = months[ i - 1 ];
			if ( m === undefined ){
				months = getMonths( gy - 1 );
				m = months[ months.length - 1 ];
			}
			return new ChineseDate( m.e, m.y, m.m, this._date, m.leap );
		}else if ( n > 0 ) {
			ret = this.nextMonth( 1 ).nextMonth( n - 1 ); // anything wrong with tail recursion?
		}else /*  n < 0 */ {
			ret = this.nextMonth( -1 ).nextMonth( n + 1 );
		}
		if ( ret._date === this._date ) {
			return ret;
		}
		// have to deal with dates that were coerced too far back by going through short months
		return new ChineseDate ( this._era, ret._year, ret._month, this._date, ret._monthType );
	};

	ChineseDate.prototype._setDate = function(d) {
		var i, nextMonths,
			cd = d2cd( d ),
			months = getMonths( d.getFullYear() );
		if ( cd > months[ months.length - 1 ].newMoon ){
			nextMonths = getMonths( d.getFullYear() + 1 );
			if ( cd >= nextMonths[0].newMoon ){
				// d is actually in the next year
				months = nextMonths;
			}
		}
		for ( i = 0; i < months.length ; ++i ){
			if ( cd >= months[i].newMoon ){
				this._era = months[i].e;
				this._year = months[i].y;
				this._month = months[i].m;
				this._monthType = months[i].leap;
				this._date = cd - months[i].newMoon + 1;
				this._d = cd2d( cd );
			}
		}
	};

	ChineseDate.prototype._setFields = function(era, year, month, date, monthType) {
		var i,
			maybe = 0, // possible match for the month
			gy = cy2sui ( era, year, month, monthType ),
			months = getMonths ( gy );
				// find the current month
		for ( i = 0; i < months.length; ++i ){
			if ( month === months[i].m && monthType === months[i].leap ){
				break;
			}
			if ( month === months[i].m ){
				// month matches but it's not the right type. Allow this
				// (like going from a leap month to the same month next year)
				maybe = i;
			}
		}
		if ( i === months.length && maybe !== 0 ){
			i = maybe;
		}
		if ( i === months.length ){
			this._era = NaN;
			this._year = NaN;
			this._month = NaN;
			this._monthType = undefined;
			this._date = NaN;
			this._d = new Date( NaN );
		} else {
			this._era = era;
			this._year = year;
			this._month = months[i].m;
			this._monthType = months[i].leap;
			this._date = date;
			this._coerceMonth( i, gy ); // make sure date isn't too high
			this._d = cd2d( months[i].newMoon + this._date - 1);
		}
	};

	ChineseDate.prototype._coerceMonth = function(i, gy) {
		var daysInMonth, m2, nm2,
			months = getMonths( gy ),
			nm1 = months[i].newMoon;
			m2 = months[ i + 1 ];
			if ( m2 === undefined ){
				months = getMonths( gy + 1 );
				m2 = months[ 0 ];
			}
			nm2 = m2.newMoon;
			daysInMonth = nm2 - nm1;
			if ( this._date < 1 ){
				this._date = 1;
			} else if ( this._date > daysInMonth ){
				this._date = daysInMonth;
			}
	};

	function winterSolstice( y ){
		if ( !( y in sui ) ){
			sui[y] = [];
			sui[y].solstice = ms2cd( Gdate.winterSolstice( new Date(y, 11, 20).getTime(), true ) );
		}
		return sui[y].solstice;
	}

	function getMonths( y ){
		fillMonths( y );
		return sui[y];
	}

	function fillMonths( y ){
		var d, foundLeap, i, m, newMoon,
			cy = gy2cy( y ),
			lastcy = gy2cy ( y - 1 ),
			endYear = winterSolstice( y );
		if ( sui[y].length > 0 ){
			return; // already done
		}

		// fill in the new moons
		for ( d = winterSolstice( y - 1 ) + 1;;){
			newMoon = ms2cd ( Gdate.newMoon( cd2ms( d ), true ) );
			if ( newMoon > endYear ){
				break;
			}
			sui[y].push( { newMoon: newMoon, leap: undefined } );
			d = newMoon + 28; // almost to the next new moon
		}

		// name the months
		if ( sui[y].length === 12 ){
			// not a leap year
			sui[y][0].m = 12;
			sui[y][0].y = lastcy.y;
			sui[y][0].e = lastcy.e;
			for ( i = 1; i < 12; ++i ){
				sui[y][i].m = i;
				sui[y][i].y = cy.y;
				sui[y][i].e = cy.e;
			}
		} else {
			// a leap year; 13 months
			m = 11;
			foundLeap = false;
			for ( i = 0; i < 13; ++i ){
				// last month is always 11, not a leap month
				if ( !foundLeap && i < 12 &&
					noSolarTerm(sui[y][i].newMoon, sui[y][ i + 1 ].newMoon) ){
					sui[y][i].m = m;
					sui[y][i].leap = "leap";
					sui[y][i].y = ( m === 11 || m === 12 ) ? lastcy.y : cy.y;
					sui[y][i].e = ( m === 11 || m === 12 ) ? lastcy.e : cy.e;
					foundLeap = true;
				} else {
					++m;
					if ( m > 12 ){
						m = 1;
					}
					sui[y][i].m = m;
					sui[y][i].y = ( m === 12 ) ? lastcy.y : cy.y;
					sui[y][i].e = ( m === 12 ) ? lastcy.e : cy.e;
				}
			}
		}
	}

	function noSolarTerm( d1, d2 ){
		// returns true if there is no solar term in [d1,d2),
		// meaning the next solar term on or after d1 is also on or after d2
		return nextSolarTerm( d1 ) === nextSolarTerm( d2 );
	}

	function nextSolarTerm( d ){
		var sunLongitude = Gdate.sunLongitude( cd2ms( d ) );
		// solar terms are every 30 degrees or TAU/12
		return Math.ceil ( sunLongitude * 12 / Gdate.TAU );
	}

	function ms2cd ( t ){
		// convert unix timestamp to Chinese days from New Year 2016
		return Math.floor ( ( t - 1454860800000 ) / 86400000 );
	}

	function cd2ms ( cd ){
		return cd * 86400000 + 1454860800000;
	}

	// Date objects are created relative to local time (new Date(y,m,d) is midnight, local time)
	// so we need to correct this to get the dates right, to midnight Beijing time
	function d2cd ( d ){
		return ms2cd( d.getTime() - d.getTimezoneOffset() * 60 * 1000 - 8 * 3600000 );
	}

	function cd2d ( cd ){
		var d = new Date( cd2ms( cd ) + 8 * 3600000 );
		d.setHours( d.getHours() + d.getTimezoneOffset() / 60 );
		return d;
	}

	function gy2cy( y ){
		return {
			y: (( y - 1984 ) % 60 + 61) % 60,
			e: Math.floor(( y + 2696 ) / 60 )
		};
	}

	function cy2gy ( e, y ){
		return e * 60 - 2697 + y;
	}

	function cy2sui ( e, y, m, leap ){
		// the last months are actually recorded in the next year.
		var gy = cy2gy ( e, y) ;
		if ( m === 11 && leap === "leap" || m === 12 ){
			++gy;
		}
		return gy;
	}
});
