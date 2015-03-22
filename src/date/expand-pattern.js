define([
	"../common/format-message",
	"../common/create-error/invalid-parameter-value"
], function( formatMessage, createErrorInvalidParameterValue ) {

/**
 * expandPattern( pattern, cldr )
 *
 * @pattern [String or Object] if String, it's considered a skeleton. Object accepts:
 * - skeleton: [String] lookup availableFormat;
 * - date: [String] ( "full" | "long" | "medium" | "short" );
 * - time: [String] ( "full" | "long" | "medium" | "short" );
 * - datetime: [String] ( "full" | "long" | "medium" | "short" );
 * - pattern: [String] For more info see datetime/format.js.
 *
 * @cldr [Cldr instance].
 *
 * Return the corresponding pattern.
 * Eg for "en":
 * - "GyMMMd" returns "MMM d, y G";
 * - { skeleton: "GyMMMd" } returns "MMM d, y G";
 * - { date: "full" } returns "EEEE, MMMM d, y";
 * - { time: "full" } returns "h:mm:ss a zzzz";
 * - { datetime: "full" } returns "EEEE, MMMM d, y 'at' h:mm:ss a zzzz";
 * - { pattern: "dd/mm" } returns "dd/mm";
 */

function getDateTime( type, dateSkeleton, timeSkeleton, cldr ) {
	var result;
	result = cldr.main([
		"dates/calendars/gregorian/dateTimeFormats",
		type
	]);
	if ( result ) {
		result = formatMessage( result, [
			cldr.main([
				"dates/calendars/gregorian/dateTimeFormats/availableFormats",
				timeSkeleton
			]),
			cldr.main([
				"dates/calendars/gregorian/dateTimeFormats/availableFormats",
				dateSkeleton
			])
		]);
	}
	return result;
}

return function( pattern, cldr ) {
	var result, flagDate, flagTime, skeleton, dateSkeleton, timeSkeleton;

	if ( typeof pattern === "string" ) {
		pattern = { skeleton: pattern };
	}

	switch ( true ) {
		case "skeleton" in pattern:
			flagDate = false, flagTime = false;
			skeleton = pattern.skeleton;
			if ( /[hHms]/.test( skeleton ) ) {
				flagTime = true;
			}
			if ( /[GyQMd]/.test( skeleton ) ) {
				flagDate = true;
			}
			if ( /Ed/g.test( skeleton ) ) {
				flagDate = true;
			} else if ( /Eh/g.test( skeleton ) || /EH/g.test( skeleton ) ||
					/E/g.test( skeleton ) ) {
				flagTime = true;
			}
			if ( ( flagDate !== flagTime ) ) {
				result = cldr.main([
					"dates/calendars/gregorian/dateTimeFormats/availableFormats",
					skeleton
				]);
			} else if ( flagDate && flagTime ) {
				dateSkeleton = "", timeSkeleton = "";
				for ( var i = 0 ; i < skeleton.length ; i++ ) {
					if ( /[hHms]/.test( skeleton[ i ] ) ) {
						timeSkeleton += skeleton[ i ];
					} else if ( /[GyQMd]/.test( skeleton[ i ] ) ) {
						dateSkeleton += skeleton[ i ];
					} else if ( skeleton[ i ] === "E" ) {
						if ( /Ed/g.test( skeleton.slice( i ) ) ) {
							dateSkeleton += "Ed";
							i++;
						} else if ( /Eh/g.test( skeleton.slice( i ) ) ) {
							timeSkeleton += "Eh";
							i++;
						} else if ( /EH/g.test( skeleton.slice( i ) ) ) {
							timeSkeleton += "EH";
							i++;
						} else {
							timeSkeleton += "E";
						}
					}
				}
				if ( /MMMM/g.test( dateSkeleton ) && /[E]/.test( dateSkeleton ) ) {
					result = getDateTime( "full", dateSkeleton, timeSkeleton, cldr );
				} else if ( /MMMM/g.test( dateSkeleton ) ) {
					result = getDateTime( "long", dateSkeleton, timeSkeleton, cldr );
				} else if ( /MMM/g.test( dateSkeleton ) ) {
					result = getDateTime( "medium", dateSkeleton, timeSkeleton, cldr );
					if ( result.indexOf( "G" ) > -1 ) {
						result = result.replace( "G", "" );
						result += " G";
					}
				} else {
					result = getDateTime( "short", dateSkeleton, timeSkeleton, cldr );
					if ( result.indexOf( "G" ) > -1 ) {
						result = result.replace( "G" , "" );
						result += " G";
					}
				}
			}
			break;

		case "date" in pattern:
		case "time" in pattern:
			result = cldr.main([
				"dates/calendars/gregorian",
				"date" in pattern ? "dateFormats" : "timeFormats",
				( pattern.date || pattern.time )
			]);
			break;

		case "datetime" in pattern:
			result = cldr.main([
				"dates/calendars/gregorian/dateTimeFormats",
				pattern.datetime
			]);
			if ( result ) {
				result = formatMessage( result, [
					cldr.main([
						"dates/calendars/gregorian/timeFormats",
						pattern.datetime
					]),
					cldr.main([
						"dates/calendars/gregorian/dateFormats",
						pattern.datetime
					])
				]);
			}
			break;

		case "pattern" in pattern:
			result = pattern.pattern;
			break;

		default:
			throw createErrorInvalidParameterValue({
				name: "pattern",
				value: pattern
			});
	}

	return result;
};

});
