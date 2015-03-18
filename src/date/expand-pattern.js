function getDateTime( type, cldr ) {
	var result;
	result = cldr.main([
		"dates/calendars/gregorian/dateTimeFormats",
		type
	]);
	if ( result ) {
		result = formatMessage( result, [
			cldr.main([
				"dates/calendars/gregorian/timeFormats",
				type
			]),
			cldr.main([
				"dates/calendars/gregorian/dateFormats",
				type
			])
		]);
	}
	return result;
}

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
	var result;

	if ( typeof pattern === "string" ) {
		pattern = { skeleton: pattern };
	}

	switch ( true ) {
		case "skeleton" in pattern:
			var flagDate = false, flagTime = false;
			var skeleton = pattern.skeleton;
			for ( var i = 0 ; i < skeleton.length ; i++ ) {
				var ch = skeleton[ i ];
				if ( ch == 'h' || ch == 'H' || ch == 'm' || ch == 's' ) { //Check if skeleton contains Time component
					flagTime = true;
				}
				if ( ch == 'y' || ch == 'M' || ch == 'd' ) { // Check if skeleton contains Date component
					flagDate = true;
				}
			}
			if ( ( flagDate != flagTime ) ) {
				result = cldr.main([
					"dates/calendars/gregorian/dateTimeFormats/availableFormats",
					skeleton
				]);
			}
			else if ( flagDate && flagTime ) {
				if ( skeleton.indexOf( "MMMM" ) > -1 && skeleton.indexOf( "E" ) > -1 ) {
					result = getDateTime( "full", cldr );
				}
				else if ( skeleton.indexOf( "MMMM" ) > -1 ) {
					result = getDateTime( "long", cldr );
				}
				else if ( skeleton.indexOf( "MMM" ) > -1 ) {
					result = getDateTime( "medium", cldr );
				}
				else {
					result = getDateTime( "short", cldr );
				}
			}
			else {
				result = cldr.main([
					"dates/calendars/gregorian/dateTimeFormats/availableFormats",
					skeleton
				]);
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
