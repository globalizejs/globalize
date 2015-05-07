define([
	"../core",
	"./pattern-re",
	"./start-of",
	"../common/create-error/unsupported-feature",
	"../util/out-of-range"
], function( Globalize, datePatternRe, dateStartOf,
	createErrorUnsupportedFeature, outOfRange ) {

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
	var amPm, daysOfYear, hour, hour12, timezoneOffset, valid,
    date, gdate, ret, todayYear, startOfYear,
		YEAR = 0,
		MONTH = 1,
		DAY = 2,
		HOUR = 3,
		MINUTE = 4,
		SECOND = 5,
		MILLISECONDS = 6,
    calendar = Globalize.calendars[properties.calendar],
		truncateAt = [],
		units = [ "year", "month", "day", "hour", "minute", "second", "milliseconds" ];

	// Assumptions:
	// If only times are set, use today's date.
	// If era is not set, use today's era
	// If year is not set, use today's year
	// If neither month nor date are set, use the beginning of the year
	//   Using the beginning of the year is an exception to all these other
	//   rules. Why not today's date? The technical report
	//   http://www.unicode.org/reports/tr35/tr35-dates.html doesn't specify
	// If month is not set but date is, use today's month

	date = new Date();
	gdate = new calendar( date );
	ret = {
		era: gdate.getEra(),
		year: gdate.getYear(),
		month: undefined,
		date: undefined,
		hour: date.getHours(),
		minute: date.getMinutes(),
		second: date.getSeconds(),
		milliseconds: 0
	};

	if ( !tokens.length ) {
		return null;
	}

	valid = tokens.every(function( token ) {
		var century, chr, value, length;

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
				truncateAt.push( YEAR );
				ret.era = +token.value;
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
          todayYear = (new calendar(date)).getYear();
					century = Math.floor( todayYear / 100 ) * 100;
					value += century;
					if ( value > todayYear + 20 ) {
						value -= 100;
					}
				}
        ret.year = value;
				truncateAt.push( YEAR );
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
				ret.month = token.value;
				truncateAt.push( MONTH );
				break;

			// Week (skip)
			case "w": // Week of Year.
			case "W": // Week of Month.
				break;

			// Day
			case "d":
				ret.date = token.value;
				truncateAt.push( DAY );
				break;

			case "D":
				daysOfYear = token.value;
				truncateAt.push( DAY );
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
				hour = hour12 = true;
				ret.hour = ( value === 12 ? 0 : value );
				truncateAt.push( HOUR );
				break;

			case "K": // 0-11
				value = token.value;
				if ( outOfRange( value, 0, 11 ) ) {
					return false;
				}
				hour = hour12 = true;
				ret.hour = value;
				truncateAt.push( HOUR );
				break;

			case "k": // 1-24
				value = token.value;
				if ( outOfRange( value, 1, 24 ) ) {
					return false;
				}
				hour = true;
				ret.hour =( value === 24 ? 0 : value );
				truncateAt.push( HOUR );
				break;

			case "H": // 0-23
				value = token.value;
				if ( outOfRange( value, 0, 23 ) ) {
					return false;
				}
				hour = true;
        ret.hour = value;
				truncateAt.push( HOUR );
				break;

			// Minute
			case "m":
				value = token.value;
				if ( outOfRange( value, 0, 59 ) ) {
					return false;
				}
				ret.minute = value;
				truncateAt.push( MINUTE );
				break;

			// Second
			case "s":
				value = token.value;
				if ( outOfRange( value, 0, 59 ) ) {
					return false;
				}
				ret.second = value;
				truncateAt.push( SECOND );
				break;

			case "A":
        ret.hour = 0;
        ret.minute = 0;
        ret.second = 0;

			/* falls through */
			case "S":
				value = Math.round( token.value * Math.pow( 10, 3 - length ) );
        ret.milliseconds = value;
				truncateAt.push( MILLISECONDS );
				break;

			// Zone
			case "Z":
			case "z":
			case "O":
			case "X":
			case "x":
				timezoneOffset = token.value - (new Date()).getTimezoneOffset();
				break;
		}

		return true;
	});

	if ( !valid ) {
		return null;
	}

	// 12-hour format needs AM or PM, 24-hour format doesn't, ie. return null
	// if amPm && !hour12 || !amPm && hour12.
	if ( hour && !( !amPm ^ hour12 ) ) {
		return null;
	}

	if ( ret.month == null && ret.date == null && truncateAt.indexOf( YEAR ) !== -1) {
		// year was defined but month was not
		gdate = new calendar( dateStartOf ( date, "year", gdate ) );
		ret.month = gdate.getMonth();
		ret.date = gdate.getDate();
	}
	if ( ret.month == null ) {
		ret.month = gdate.getMonth();
	}
	if ( ret.date == null && truncateAt.indexOf( MONTH ) !== -1) {
		// month was defined but date was not
		ret.date = 1; // gdate assumes 1 is the first date of the month
	}
	if ( ret.date == null ) {
		ret.date = gdate.getDate();
	}

  gdate = new calendar(ret.era, ret.year, ret.month, ret.date);

	if ( daysOfYear !== undefined ) {
    startOfYear = dateStartOf(gdate.toDate(), "year", gdate);
    gdate = new calendar( startOfYear ).nextDate(daysOfYear - 1);
		if ( gdate.getYear() !== startOfYear.getFullYear() ) {
			return null;
		}
	}else if ( gdate.getDate() !== ret.date ) {
		// if the date was invalid and gdate corrected it (like turning 31 Sep into 30 Sep),
		// we want to reject it.
		return null;
	}

  date = gdate.toDate();
  date.setHours(ret.hour);
  date.setMinutes(ret.minute);
  date.setSeconds(ret.second);
  date.setMilliseconds(ret.milliseconds);

	if ( hour12 && amPm === "pm" ) {
		date.setHours( date.getHours() + 12 );
	}

	if ( timezoneOffset ) {
		date.setMinutes( date.getMinutes() + timezoneOffset );
	}

	// Truncate date at the most precise unit defined. Eg.
	// If value is "12/31", and pattern is "MM/dd":
	// => new Date( <current Year>, 12, 31, 0, 0, 0, 0 );
	truncateAt = Math.max.apply( null, truncateAt );
	date = dateStartOf( date, units[ truncateAt ], gdate );

	return date;
};

});
