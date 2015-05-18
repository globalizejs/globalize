define([
	"../common/format-message",
	"../common/create-error/invalid-parameter-value",
	"../gdate/calendar-for-locale",
], function( formatMessage, createErrorInvalidParameterValue, gdateCalendarForLocale ) {

/**
 * expandPattern( options, cldr )
 *
 * @options [Object] if String, it's considered a skeleton. Object accepts:
 * - skeleton: [String] lookup availableFormat;
 * - date: [String] ( "full" | "long" | "medium" | "short" );
 * - time: [String] ( "full" | "long" | "medium" | "short" );
 * - datetime: [String] ( "full" | "long" | "medium" | "short" );
 * - raw: [String] For more info see datetime/format.js.
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
 * - { raw: "dd/mm" } returns "dd/mm";
 */

return function( options, cldr ) {
	var dateSkeleton, result, skeleton, timeSkeleton, type,
		calendar = gdateCalendarForLocale( cldr );

	function combineDateTime( type, datePattern, timePattern ) {
		return formatMessage(
			cldr.main([
				"dates/calendars",
				calendar,
				"dateTimeFormats",
				type
			]),
			[ timePattern, datePattern ]
		);
	}

	switch ( true ) {
		case "skeleton" in options:
			skeleton = options.skeleton;
			result = cldr.main([
				"dates/calendars",
				calendar,
				"dateTimeFormats/availableFormats",
				skeleton
			]);
			if ( !result ) {
				timeSkeleton = skeleton.split( /[^hHKkmsSAzZOvVXx]/ ).slice( -1 )[ 0 ];
				dateSkeleton = skeleton.split( /[^GyYuUrQqMLlwWdDFgEec]/ )[ 0 ];
				if ( /(MMMM|LLLL).*[Ec]/.test( dateSkeleton ) ) {
					type = "full";
				} else if ( /MMMM/g.test( dateSkeleton ) ) {
					type = "long";
				} else if ( /MMM/g.test( dateSkeleton ) || /LLL/g.test( dateSkeleton ) ) {
					type = "medium";
				} else {
					type = "short";
				}
				result = combineDateTime( type,
					cldr.main([
						"dates/calendars",
						calendar,
						"dateTimeFormats/availableFormats",
						dateSkeleton
					]),
					cldr.main([
						"dates/calendars",
						calendar,
						"dateTimeFormats/availableFormats",
						timeSkeleton
					])
				);
			}
			break;

		case "date" in options:
		case "time" in options:
			result = cldr.main([
				"dates/calendars",
				calendar,
				"date" in options ? "dateFormats" : "timeFormats",
				( options.date || options.time )
			]);
			break;

		case "datetime" in options:
			result = combineDateTime( options.datetime,
				cldr.main([ "dates/calendars", calendar, "dateFormats", options.datetime ]),
				cldr.main([ "dates/calendars", calendar, "timeFormats", options.datetime ])
			);
			break;

		case "raw" in options:
			result = options.raw;
			break;

		default:
			throw createErrorInvalidParameterValue({
				name: "options",
				value: options
			});
	}

	return result;
};

});
