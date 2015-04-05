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

return function( pattern, cldr ) {
	var result, getDateTime, skeleton, dateSkeleton = "", timeSkeleton = "", type;

	getDateTime = function( type, dateSkeleton, timeSkeleton, datePath, timePath, cldr ) {
		var result;
		result = cldr.main([
			"dates/calendars/gregorian/dateTimeFormats",
			type
		]);
		if ( result ) {
			result = formatMessage( result, [
				cldr.main([
					timePath,
					timeSkeleton
				]),
				cldr.main([
					datePath,
					dateSkeleton
				])
			]);
		}
		return result;
	};

	if ( typeof pattern === "string" ) {
		pattern = { skeleton: pattern };
	}

	switch ( true ) {
		case "skeleton" in pattern:
			skeleton = pattern.skeleton;
			result = cldr.main([
				"dates/calendars/gregorian/dateTimeFormats/availableFormats",
				skeleton
			]);
			if ( !result ) {
				timeSkeleton = skeleton.split( /[^hHKkmsSAzZOvVXx]/ ).slice( -1 )[ 0 ];
				dateSkeleton = skeleton.split( /[^GyYuUrQqMLlwWdDFgEec]/ )[ 0 ];
				if (  /(MMMM|LLLL).*[Ec]/.test( dateSkeleton ) ) {
					type = "full";
				} else if ( /MMMM/g.test( dateSkeleton ) ) {
					type = "long";
				} else if ( /MMM/g.test( dateSkeleton ) || /LLL/g.test( dateSkeleton ) ) {
					type = "medium";
				} else {
					type = "short";
				}
				result = getDateTime( type, dateSkeleton, timeSkeleton,
						"dates/calendars/gregorian/dateTimeFormats/availableFormats",
						"dates/calendars/gregorian/dateTimeFormats/availableFormats", cldr );
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
			result = getDateTime( pattern.datetime, pattern.datetime, pattern.datetime,
					"dates/calendars/gregorian/dateFormats",
					"dates/calendars/gregorian/timeFormats", cldr );
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
