

/**
 * format( date, properties )
 *
 * @date [Date instance].
 *
 * @properties
 *
 * TODO Support other calendar types.
 *
 * Disclosure: this function borrows excerpts of dojo/date/locale.
 */
var dateFormat = function( date, numberFormatters, properties ) {
	var timeSeparator = properties.timeSeparator;

	return properties.pattern.replace( datePatternRe, function( current ) {
		var ret,
			chr = current.charAt( 0 ),
			length = current.length;

		if ( chr === "j" ) {

			// Locale preferred hHKk.
			// http://www.unicode.org/reports/tr35/tr35-dates.html#Time_Data
			chr = properties.preferredTime;
		}

		if ( chr === "Z" ) {

			// Z..ZZZ: same as "xxxx".
			if ( length < 4 ) {
				chr = "x";
				length = 4;

			// ZZZZ: same as "OOOO".
			} else if ( length < 5 ) {
				chr = "O";
				length = 4;

			// ZZZZZ: same as "XXXXX"
			} else {
				chr = "X";
				length = 5;
			}
		}

		switch ( chr ) {

			// Era
			case "G":
				ret = properties.eras[ date.getFullYear() < 0 ? 0 : 1 ];
				break;

			// Year
			case "y":

				// Plain year.
				// The length specifies the padding, but for two letters it also specifies the
				// maximum length.
				ret = date.getFullYear();
				if ( length === 2 ) {
					ret = String( ret );
					ret = +ret.substr( ret.length - 2 );
				}
				break;

			case "Y":

				// Year in "Week of Year"
				// The length specifies the padding, but for two letters it also specifies the
				// maximum length.
				// yearInWeekofYear = date + DaysInAWeek - (dayOfWeek - firstDay) - minDays
				ret = new Date( date.getTime() );
				ret.setDate(
					ret.getDate() + 7 -
					dateDayOfWeek( date, properties.firstDay ) -
					properties.firstDay -
					properties.minDays
				);
				ret = ret.getFullYear();
				if ( length === 2 ) {
					ret = String( ret );
					ret = +ret.substr( ret.length - 2 );
				}
				break;

			// Quarter
			case "Q":
			case "q":
				ret = Math.ceil( ( date.getMonth() + 1 ) / 3 );
				if ( length > 2 ) {
					ret = properties.quarters[ chr ][ length ][ ret ];
				}
				break;

			// Month
			case "M":
			case "L":
				ret = date.getMonth() + 1;
				if ( length > 2 ) {
					ret = properties.months[ chr ][ length ][ ret ];
				}
				break;

			// Week
			case "w":

				// Week of Year.
				// woy = ceil( ( doy + dow of 1/1 ) / 7 ) - minDaysStuff ? 1 : 0.
				// TODO should pad on ww? Not documented, but I guess so.
				ret = dateDayOfWeek( dateStartOf( date, "year" ), properties.firstDay );
				ret = Math.ceil( ( dateDayOfYear( date ) + ret ) / 7 ) -
					( 7 - ret >= properties.minDays ? 0 : 1 );
				break;

			case "W":

				// Week of Month.
				// wom = ceil( ( dom + dow of `1/month` ) / 7 ) - minDaysStuff ? 1 : 0.
				ret = dateDayOfWeek( dateStartOf( date, "month" ), properties.firstDay );
				ret = Math.ceil( ( date.getDate() + ret ) / 7 ) -
					( 7 - ret >= properties.minDays ? 0 : 1 );
				break;

			// Day
			case "d":
				ret = date.getDate();
				break;

			case "D":
				ret = dateDayOfYear( date ) + 1;
				break;

			case "F":

				// Day of Week in month. eg. 2nd Wed in July.
				ret = Math.floor( date.getDate() / 7 ) + 1;
				break;

			// Week day
			case "e":
			case "c":
				if ( length <= 2 ) {

					// Range is [1-7] (deduced by example provided on documentation)
					// TODO Should pad with zeros (not specified in the docs)?
					ret = dateDayOfWeek( date, properties.firstDay ) + 1;
					break;
				}

			/* falls through */
			case "E":
				ret = dateWeekDays[ date.getDay() ];
				ret = properties.days[ chr ][ length ][ ret ];
				break;

			// Period (AM or PM)
			case "a":
				ret = properties.dayPeriods[ date.getHours() < 12 ? "am" : "pm" ];
				break;

			// Hour
			case "h": // 1-12
				ret = ( date.getHours() % 12 ) || 12;
				break;

			case "H": // 0-23
				ret = date.getHours();
				break;

			case "K": // 0-11
				ret = date.getHours() % 12;
				break;

			case "k": // 1-24
				ret = date.getHours() || 24;
				break;

			// Minute
			case "m":
				ret = date.getMinutes();
				break;

			// Second
			case "s":
				ret = date.getSeconds();
				break;

			case "S":
				ret = Math.round( date.getMilliseconds() * Math.pow( 10, length - 3 ) );
				break;

			case "A":
				ret = Math.round( dateMillisecondsInDay( date ) * Math.pow( 10, length - 3 ) );
				break;

			// Zone
			case "z":
			case "O":

				// O: "{gmtFormat}+H;{gmtFormat}-H" or "{gmtZeroFormat}", eg. "GMT-8" or "GMT".
				// OOOO: "{gmtFormat}{hourFormat}" or "{gmtZeroFormat}", eg. "GMT-08:00" or "GMT".
				if ( date.getTimezoneOffset() === 0 ) {
					ret = properties.gmtZeroFormat;
				} else {
					ret = dateTimezoneHourFormat(
						date,
						length < 4 ? "+H;-H" : properties.tzLongHourFormat,
						timeSeparator,
						numberFormatters
					);
					ret = properties.gmtFormat.replace( /\{0\}/, ret );
				}
				break;

			case "X":

				// Same as x*, except it uses "Z" for zero offset.
				if ( date.getTimezoneOffset() === 0 ) {
					ret = "Z";
					break;
				}

			/* falls through */
			case "x":

				// x: hourFormat("+HH;-HH")
				// xx or xxxx: hourFormat("+HHmm;-HHmm")
				// xxx or xxxxx: hourFormat("+HH:mm;-HH:mm")
				ret = length === 1 ? "+HH;-HH" : ( length % 2 ? "+HH:mm;-HH:mm" : "+HHmm;-HHmm" );
				ret = dateTimezoneHourFormat( date, ret, ":" );
				break;

			// timeSeparator
			case ":":
				ret = timeSeparator;
				break;

			// ' literals.
			case "'":
				current = current.replace( /''/, "'" );
				if ( length > 2 ) {
					current = current.slice( 1, -1 );
				}
				ret = current;
				break;

			// Anything else is considered a literal, including [ ,:/.@#], chinese, japonese, and
			// arabic characters.
			default:
				ret = current;
		}
		if ( typeof ret === "number" ) {
			ret = numberFormatters[ length ]( ret );
		}
		return ret;
	});
};

