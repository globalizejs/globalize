define([
	"./pattern-re",
	"./start-of",
	"../common/create-error/unsupported-feature",
	"../util/out-of-range",
	"../gdate/Gdate", // Question: how can I allow these to be loaded conditionally (as needed?)
	"../gdate/Gregorian-date",
	"../gdate/Hebrew-date",
	"../gdate/Islamic-date"
], function( datePatternRe, dateStartOf,
	createErrorUnsupportedFeature, outOfRange, Gdate ) {

/**
 * parse( value, tokens, properties )
 *
 * @value [String] string date.
 *
 * @tokens [Object] tokens returned by date/tokenizer.
 *
 * @properties [Object] output returned by date/tokenizer-properties.
 *
 * ref: http://www.unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns
 */
return function( value, tokens, properties ) {
	var amPm, daysOfYear, date, gdate, hour12, monthtype, valid,
		era = null, // defaults for date are handled by the gdate constructor
		year = null,
		month = null,
		date  = null,
		hours = 0, // default time is midnight
		minutes = 0,
		seconds = 0,
		ms = 0, // milliseconds
		timezoneOffset = null;
		
		//gdate = new Gdate.calendars[ properties.calendar ]( new Date() ),

	if ( !tokens.length ) {
		return null;
	}

	valid = tokens.every(function( token ) {
		var century, chr, length, gtoday, value;

		if ( token.type === "literal" ) {

			// continue
			return true;
		}

		chr = token.type.charAt( 0 );
		length = token.type.length;

		if ( chr === "j" ) {

			// Locale preferred hHKk.
			// http://www.unicode.org/reports/tr35/tr35-dates.html#Time_Data
			chr = properties.preferredTimeData;
		}

		switch ( chr ) {

			// Era
			case "G":
				era = +token.value;
				break;

			// Year
			case "y":
				value = token.value;
				if ( length === 2 ) {
					if ( outOfRange( value, 0, 99 ) ) {
						return false;
					}

					// mimic dojo/date/locale: choose century to apply, according to a sliding
					// window of 80 years before and 20 years after present year.
					gtoday = new Gdate.calendars[ properties.calendar ]( new Date() ),
					century = Math.floor( gtoday.getYear() / 100 ) * 100;
					value += century;
					if ( value > gtoday.getYear() + 20 ) {
						value -= 100;
					}
				}
				year = value;
				break;

			case "Y": // Year in "Week of Year"
				throw createErrorUnsupportedFeature({
					feature: "year pattern `" + chr + "`"
				});

			// Quarter (skip)
			case "Q":
			case "q":
				break;

			// Month
			case "M":
			case "L":
				month = token.value;
				break;

			// Week (skip)
			case "w": // Week of Year.
			case "W": // Week of Month.
				break;

			// Day
			case "d":
				date = token.value;
				break;

			case "D":
				daysOfYear = token.value;
				break;

			case "F":

				// Day of Week in month. eg. 2nd Wed in July.
				// Skip
				break;

			// Week day
			case "e":
			case "c":
			case "E":

				// Skip.
				// value = arrayIndexOf( dateWeekDays, token.value );
				break;

			// Period (AM or PM)
			case "a":
				amPm = token.value;
				break;

			// Hour
			case "h": // 1-12
				value = token.value;
				if ( outOfRange( value, 1, 12 ) ) {
					return false;
				}
				hour12 = true;
				hours = ( value === 12 ? 0 : value );
				break;

			case "K": // 0-11
				value = token.value;
				if ( outOfRange( value, 0, 11 ) ) {
					return false;
				}
				hour12 = true;
				hours = value;
				break;

			case "k": // 1-24
				value = token.value;
				if ( outOfRange( value, 1, 24 ) ) {
					return false;
				}
				hour12 = false;
				hours = ( value === 24 ? 0 : value );
				break;

			case "H": // 0-23
				value = token.value;
				if ( outOfRange( value, 0, 23 ) ) {
					return false;
				}
				hour12 = false;
				hours = value;
				break;

			// Minute
			case "m":
				value = token.value;
				if ( outOfRange( value, 0, 59 ) ) {
					return false;
				}
				minutes = value;
				break;

			// Second
			case "s":
				value = token.value;
				if ( outOfRange( value, 0, 59 ) ) {
					return false;
				}
				seconds = value;
				break;

			case "A":
			hours = minutes = seconds = 0;

			/* falls through */
			case "S":
				value = Math.round( token.value * Math.pow( 10, 3 - length ) );
				ms = value;
				break;

			// Zone
			case "Z":
			case "z":
			case "O":
			case "X":
			case "x":
				timezoneOffset = token.value;
				break;
		}

		return true;
	});

	if ( !valid ) {
		return null;
	}

	// 12-hour format needs AM or PM, 24-hour format doesn't, ie. return null
	// if amPm && !hour12 || !amPm && hour12.
	if ( amPm && hour12 === false || !amPm && hour12 === true ) {
		return null;
	}

	if ( hour12 && amPm === "pm" ) {
		hours += 12;
	}

	if ( typeof month === "string" ) {
		month = month.split( "-" ); // split out the "leap" part
		monthtype = month[ 1 ];
		month = parseInt( month[0], 10 ); // coerce to number
	}
	gdate = new Gdate.calendars[ properties.calendar ]( era, year, month, date, monthtype );

	if ( daysOfYear !== undefined ) {
		year = gdate.getYear();
		gdate = gdate.startOfYear().nextDate( daysOfYear - 1 );
		if ( gdate.getYear() !== year ) {
			return null;
		}
	}
	if ( isNaN( gdate.getYear() ) ) {
		return null; // invalid date
	}
	if ( date != null && date !== gdate.getDate() ){
		return null; // if the date was coerced to something other than what was set, it's an error
	}
	date = gdate.toDate(); // note: redefining date from a number to a Date!
	
	date.setHours( hours );
	if ( timezoneOffset != null ){
		minutes += timezoneOffset - date.getTimezoneOffset()
	}
	date.setMinutes( minutes);
	date.setSeconds( seconds );
	date.setMilliseconds( ms );

	return date;
};

});
