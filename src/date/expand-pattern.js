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
	var result, skeleton, dateSkeleton = "", timeSkeleton = "", i;

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
			if ( result === undefined ) {
				for ( i = 0 ; i < skeleton.length ; i++ ) {
					if ( /[hHms]/.test( skeleton[i] ) ) {
						timeSkeleton += skeleton[i];
					} else if ( /[GyQMEd]/.test( skeleton[i] ) ) {
						dateSkeleton += skeleton[i];
					}
				}
				if ( ( /MMMM/g.test( dateSkeleton ) || /LLLL/g.test( dateSkeleton ) ) 
					&& /[Ec]/.test( dateSkeleton ) ) {
					result = getDateTime( "full", dateSkeleton, timeSkeleton, cldr);
				} else if ( /MMMM/g.test( dateSkeleton ) ) {
					result = getDateTime( "long", dateSkeleton, timeSkeleton, cldr);
				} else if ( /MMM/g.test( dateSkeleton ) || /LLL/g.test( dateSkeleton ) ) {
					result = getDateTime( "medium", dateSkeleton, timeSkeleton, cldr);
				} else {
					result = getDateTime( "short", dateSkeleton, timeSkeleton, cldr);
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
