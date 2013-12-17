define(function() {

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

	if ( typeof pattern === "object" ) {

		switch ( true ) {
			case "skeleton" in pattern:
				result = cldr.main([
					"dates/calendars/gregorian/dateTimeFormats/availableFormats",
					pattern.skeleton
				]);
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
					result = result
						.replace( /\{0\}/, cldr.main([
							"dates/calendars/gregorian/timeFormats",
							pattern.datetime
						]))
						.replace( /\{1\}/, cldr.main([
							"dates/calendars/gregorian/dateFormats",
							pattern.datetime
						]));
				}
				break;

			case "pattern" in pattern:
				result = pattern.pattern;
				break;

			default:
				throw new Error( "Invalid pattern" );
		}

	} else {
		throw new Error( "Invalid pattern" );
	}

	if ( !result ) {
		throw new Error( "Pattern not found" );
	}

	return result;
};

});
