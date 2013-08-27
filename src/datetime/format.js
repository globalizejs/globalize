define([
	"./get-day-of-year",
	"./get-first-day-of-week",
	"./get-milliseconds-in-day",
	"./pattern-re",
	"../util/string/pad"
], function( datetimeGetDayOfYear, datetimeGetFirstDayOfWeek, datetimeGetMillisecondsInDay, datetimePatternRe, stringPad ) {

	/**
	 * format( date, pattern, cldr )
	 *
	 * @date [Date instance].
	 *
	 * @pattern [String] raw pattern.
	 * ref: http://www.unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns
	 *
	 * @cldr [Cldr instance].
	 *
	 * TODO Support other calendar types.
	 *
	 * Disclosure: this function borrows excerpts of dojo/date/locale.
	 */
	return function( date, pattern, cldr ) {
		var widths = [ "abbreviated", "wide", "narrow" ];
		return pattern.replace( datetimePatternRe, function( current ) {
			var pad, ret,
				chr = current.charAt( 0 ),
				length = current.length;

			switch ( chr ) {

				// Era
				case "G":
					if ( length <= 3 ) {
						// abbreviated form
					} else if ( length === 4 ) {
						// long form
					} else {
						// narrow form
					}
					// TODO
					break;

				// Year (the length specifies the padding, but for two letters it also specifies the maximum length)
				case "y":
					// TODO handle era
					ret = String( date.getFullYear() );
					pad = true;
					if ( length === 2 ) {
						ret = ret.substr( ret.length - 2 );
					}
					break;

				case "Y": // Need to be implemented. See http://www.unicode.org/reports/tr35/tr35-dates.html#Week_Data

				case "u": // Extended year. Need to be implemented.
				case "U": // Cyclic year name. Need to be implemented.

				// Quarter
				case "Q":
				case "q":
					ret = Math.ceil( ( date.getMonth() + 1 ) / 3 );
					if ( length <= 2 ) {
						pad = true;
					} else {
						// TODO documentation does not mention narrow, although narrow data is present.
						// FIXME cldr
						ret = cldr.dates.calendars.gregorian.quarters[ chr === "Q" ? "format" : "stand-alone" ][ widths[ length - 3 ] ];
					}
					break;

				// Month
				case "M":
				case "L":
					var month = date.getMonth();
					if ( length <= 2 ) {
						ret = month + 1;
						pad = true;
					} else {
						// FIXME cldr
						ret = cldr.dates.calendars.gregorian.months[ chr === "M" ? "format" : "stand-alone" ][ widths[ length - 3 ] ];
					}
					break;

				// Week
				case "w": // Week of Year. Need to be implemented.
				case "W": // Week of Month. Need to be implemented.

				// Day
				case "d":
					ret = date.getDate();
					pad = true;
					break;

				case "D":
					// FIXME getDayOfYear
					ret = datetimeGetDayOfYear( date );
					pad = true;
					break;

				case "F": // Day of Week in month. eg. 2nd Wed in July. Need to be implemented.
				case "g+": // Modified Julian day. Need to be implemented.

				// Week day
				case "e":
				case "c":
					if ( length <= 2 ) {
						// FIXME cldr.firstDay http://www.unicode.org/reports/tr35/tr35-dates.html#Week_Data
						// FIXME Is it [0-6] or [1-7] (picked)?
						// FIXME Should pad with zeros (not specified in the docs)?
						ret = ( date.getDay() - datetimeGetFirstDayOfWeek( cldr ) + 8 ) % 7;
						pad = true;
						break;
					}

				case "E":
					ret = date.getDay();
					// FIXME cldr
					if ( length === 6 ) {
						// FIXME what's the diff between "short day" and "short name (EEEEEE)"???
						// -> Guess this is abbreviated. Docs are wrong.
						// Note: if short day names are not explicitly specified, abbreviated day names are used instead http://www.unicode.org/reports/tr35/tr35-dates.html#months_days_quarters_eras
						ret = (
							cldr.dates.calendars.gregorian.days[ chr === "c" ? "stand-alone" : "format" ].short ||
							cldr.dates.calendars.gregorian.days[ chr === "c" ? "stand-alone" : "format" ].abbreviated
						)[ widths[ length - 3 ] ];
					} else {
						ret = cldr.dates.calendars.gregorian.days[ chr === "c" ? "stand-alone" : "format" ][ widths[ length - 3 ] ];
					}
					break;

				// Period (AM or PM)
				case "a":
					// TODO Anything related with this http://www.unicode.org/reports/tr35/tr35-dates.html#Day_Period_Rules ?
					// TODO What about the other calendar types?
					// FIXME cldr
					// -> On CLDR, make cldr.dates.calendar point to cldr.dates.calendars[default calendar for that territory]
					ret = cldr.dates.calendars.gregorian.dayPeriods.format.wide[ date.getHours() < 12 ? "am" : "pm" ];
					break;

				// Hour
				case "h": // 1-12
					// TODO When used in skeleton data or in a skeleton passed in an API for flexible date pattern generation, it should match the 12-hour-cycle format preferred by the locale
					ret = ( date.getHours() % 12 ) || 12;
					pad = true;
					break;

				case "H": // 0-23
					// TODO When used in skeleton data or in a skeleton passed in an API for flexible date pattern generation, it should match the 12-hour-cycle format preferred by the locale
					ret = date.getHours();
					pad = true;
					break;

				case "K": // 0-11
					ret = date.getHours() % 12;
					pad = true;
					break;

				case "k": // 1-24
					ret = date.getHours() || 24;
					pad = true;
					break;

				case "j": // Locale preferred hHKk. Need to be implemented. See http://www.unicode.org/reports/tr35/tr35-dates.html#Time_Data

				// Minute
				case "m":
					ret = date.getMinutes();
					pad = true;
					break;

				// Second
				case "s":
					ret = date.getSeconds();
					pad = true;
					break;

				case "S":
					ret = Math.round( date.getMilliseconds() * Math.pow( 10, length - 3 ) );
					pad = true;
					break;

				case "A":
					ret = Math.round( datetimeGetMillisecondsInDay( date ) * Math.pow( 10, length - 3 ) );
					pad = true;
					break;

				// Zone
				// see http://www.unicode.org/reports/tr35/tr35-dates.html#Using_Time_Zone_Names ?
				// Need to be implemented.
				case "z":
				case "Z":
				case "O":
				case "v":
				case "V":
				case "X":
				case "x":

				default:
					throw new Error( "Invalid date format pattern \"" + chr + "\"." );
			}
			if ( pad ) {
				ret = stringPad( ret, length );
			}
			return ret;
		});
	};

});
