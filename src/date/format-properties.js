define([
	"./first-day-of-week",
	"./pattern-re",
	"../common/create-error/unsupported-feature",
	"../number/symbol",
	"../util/string/pad"
], function( dateFirstDayOfWeek, datePatternRe, createErrorUnsupportedFeature, numberSymbol,
	stringPad ) {

/**
 * properties( pattern, cldr )
 *
 * @pattern [String] raw pattern.
 * ref: http://www.unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns
 *
 * @cldr [Cldr instance].
 *
 * Return the properties given the pattern and cldr.
 *
 * TODO Support other calendar types.
 */
return function( pattern, cldr ) {
	var properties = {
			numberFormatters: {},
			pattern: pattern,
			timeSeparator: numberSymbol( "timeSeparator", cldr )
		},
		widths = [ "abbreviated", "wide", "narrow" ];

	function setNumberFormatterPattern( pad ) {
		properties.numberFormatters[ pad ] = stringPad( "", pad );
	}

	pattern.replace( datePatternRe, function( current ) {
		var formatNumber,
			chr = current.charAt( 0 ),
			length = current.length;

		if ( chr === "j" ) {

			// Locale preferred hHKk.
			// http://www.unicode.org/reports/tr35/tr35-dates.html#Time_Data
			properties.preferredTime = chr = cldr.supplemental.timeData.preferred();
		}

		// ZZZZ: same as "OOOO".
		if ( chr === "Z" && length === 4 ) {
			chr = "O";
			length = 4;
		}

		switch ( chr ) {

			// Era
			case "G":
				properties.eras = cldr.main([
					"dates/calendars/gregorian/eras",
					length <= 3 ? "eraAbbr" : ( length === 4 ? "eraNames" : "eraNarrow" )
				]);
				break;

			// Year
			case "y":

				// Plain year.
				formatNumber = true;
				break;

			case "Y":

				// Year in "Week of Year"
				properties.firstDay = dateFirstDayOfWeek( cldr );
				properties.minDays = cldr.supplemental.weekData.minDays();
				formatNumber = true;
				break;

			case "u": // Extended year. Need to be implemented.
			case "U": // Cyclic year name. Need to be implemented.
				throw createErrorUnsupportedFeature({
					feature: "year pattern `" + chr + "`"
				});

			// Quarter
			case "Q":
			case "q":
				if ( length > 2 ) {
					if ( !properties.quarters ) {
						properties.quarters = {};
					}
					if ( !properties.quarters[ chr ] ) {
						properties.quarters[ chr ] = {};
					}
					properties.quarters[ chr ][ length ] = cldr.main([
						"dates/calendars/gregorian/quarters",
						chr === "Q" ? "format" : "stand-alone",
						widths[ length - 3 ]
					]);
				} else {
					formatNumber = true;
				}
				break;

			// Month
			case "M":
			case "L":
				if ( length > 2 ) {
					if ( !properties.months ) {
						properties.months = {};
					}
					if ( !properties.months[ chr ] ) {
						properties.months[ chr ] = {};
					}
					properties.months[ chr ][ length ] = cldr.main([
						"dates/calendars/gregorian/months",
						chr === "M" ? "format" : "stand-alone",
						widths[ length - 3 ]
					]);
				} else {
					formatNumber = true;
				}
				break;

			// Week - Week of Year (w) or Week of Month (W).
			case "w":
			case "W":
				properties.firstDay = dateFirstDayOfWeek( cldr );
				properties.minDays = cldr.supplemental.weekData.minDays();
				formatNumber = true;
				break;

			// Day
			case "d":
			case "D":
			case "F":
				formatNumber = true;
				break;

			case "g":

				// Modified Julian day. Need to be implemented.
				throw createErrorUnsupportedFeature({
					feature: "Julian day pattern `g`"
				});

			// Week day
			case "e":
			case "c":
				if ( length <= 2 ) {
					properties.firstDay = dateFirstDayOfWeek( cldr );
					formatNumber = true;
					break;
				}

			/* falls through */
			case "E":
				if ( !properties.days ) {
					properties.days = {};
				}
				if ( !properties.days[ chr ] ) {
					properties.days[ chr ] = {};
				}
				if ( length === 6 ) {

					// If short day names are not explicitly specified, abbreviated day names are
					// used instead.
					// http://www.unicode.org/reports/tr35/tr35-dates.html#months_days_quarters_eras
					// http://unicode.org/cldr/trac/ticket/6790
					properties.days[ chr ][ length ] = cldr.main([
							"dates/calendars/gregorian/days",
							chr === "c" ? "stand-alone" : "format",
							"short"
						]) || cldr.main([
							"dates/calendars/gregorian/days",
							chr === "c" ? "stand-alone" : "format",
							"abbreviated"
						]);
				} else {
					properties.days[ chr ][ length ] = cldr.main([
						"dates/calendars/gregorian/days",
						chr === "c" ? "stand-alone" : "format",
						widths[ length < 3 ? 0 : length - 3 ]
					]);
				}
				break;

			// Period (AM or PM)
			case "a":
				properties.dayPeriods = cldr.main(
					"dates/calendars/gregorian/dayPeriods/format/wide"
				);
				break;

			// Hour
			case "h": // 1-12
			case "H": // 0-23
			case "K": // 0-11
			case "k": // 1-24

			// Minute
			case "m":

			// Second
			case "s":
			case "S":
			case "A":
				formatNumber = true;
				break;

			// Zone
			case "z":
			case "O":

				// O: "{gmtFormat}+H;{gmtFormat}-H" or "{gmtZeroFormat}", eg. "GMT-8" or "GMT".
				// OOOO: "{gmtFormat}{hourFormat}" or "{gmtZeroFormat}", eg. "GMT-08:00" or "GMT".
				properties.gmtFormat = cldr.main( "dates/timeZoneNames/gmtFormat" );
				properties.gmtZeroFormat = cldr.main( "dates/timeZoneNames/gmtZeroFormat" );
				properties.tzLongHourFormat = cldr.main( "dates/timeZoneNames/hourFormat" );

			/* falls through */
			case "Z":
			case "X":
			case "x":
				setNumberFormatterPattern( 1 );
				setNumberFormatterPattern( 2 );
				break;

			case "v":
			case "V":
				throw createErrorUnsupportedFeature({
					feature: "timezone pattern `" + chr + "`"
				});
		}

		if ( formatNumber ) {
			setNumberFormatterPattern( length );
		}
	});

	return properties;
};

});
