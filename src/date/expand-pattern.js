define([
	"../common/create-error/invalid-parameter-value",
	"../common/format-message",
	"../common/validate/skeleton",
	"./expand-pattern/get-best-match-pattern"
], function( createErrorInvalidParameterValue, formatMessage, validateSkeleton,
	dateExpandPatternGetBestMatchPattern ) {

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

		// Using easier to read variables.
		getBestMatchPattern = dateExpandPatternGetBestMatchPattern;

	function combineDateTime( type, datePattern, timePattern ) {
		return formatMessage(
			cldr.main([
				"dates/calendars/gregorian/dateTimeFormats",
				type
			]),
			[ timePattern, datePattern ]
		);
	}

	switch ( true ) {
		case "skeleton" in options:
			skeleton = options.skeleton;

			// Preferred hour (j).
			skeleton = skeleton.replace( /j/g, function() {
				return cldr.supplemental.timeData.preferred();
			});

			validateSkeleton( skeleton );

			// Try direct map (note that getBestMatchPattern handles it).
			// ... or, try to "best match" the whole skeleton.
			result = getBestMatchPattern(
				cldr,
				skeleton
			);
			if ( result ) {
				break;
			}

			// ... or, try to "best match" the date and time parts individually.
			timeSkeleton = skeleton.split( /[^hHKkmsSAzZOvVXx]/ ).slice( -1 )[ 0 ];
			dateSkeleton = skeleton.split( /[^GyYuUrQqMLlwWdDFgEec]/ )[ 0 ];
			dateSkeleton = getBestMatchPattern(
				cldr,
				dateSkeleton
			);
			timeSkeleton = getBestMatchPattern(
				cldr,
				timeSkeleton
			);

			if ( /(MMMM|LLLL).*[Ec]/.test( dateSkeleton ) ) {
				type = "full";
			} else if ( /MMMM|LLLL/.test( dateSkeleton ) ) {
				type = "long";
			} else if ( /MMM|LLL/.test( dateSkeleton ) ) {
				type = "medium";
			} else {
				type = "short";
			}

			if ( dateSkeleton && timeSkeleton ) {
				result = combineDateTime( type, dateSkeleton, timeSkeleton );
			} else {
				result = dateSkeleton || timeSkeleton;
			}

			break;

		case "date" in options:
		case "time" in options:
			result = cldr.main([
				"dates/calendars/gregorian",
				"date" in options ? "dateFormats" : "timeFormats",
				( options.date || options.time )
			]);
			break;

		case "datetime" in options:
			result = combineDateTime( options.datetime,
				cldr.main([ "dates/calendars/gregorian/dateFormats", options.datetime ]),
				cldr.main([ "dates/calendars/gregorian/timeFormats", options.datetime ])
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
