define([
	"../common/format-message",
	"../common/create-error/invalid-parameter-value",
	"./pattern-re"
], function( formatMessage, createErrorInvalidParameterValue, datePatternRe ) {

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
	var dateSkeleton, result, skeleton, timeSkeleton, type;

	function combineDateTime( type, datePattern, timePattern ) {
		return formatMessage(
			cldr.main([
				"dates/calendars/gregorian/dateTimeFormats",
				type
			]),
			[ timePattern, datePattern ]
		);
	}

	function getBestMatchPattern( path, skeleton ) {
		var availableFormats, ratedFormats, format, pattern;

		pattern = cldr.main([ path, skeleton ]);

		if ( skeleton && !pattern ) {
			availableFormats = cldr.main([ path ]);
			ratedFormats = [];

			for ( format in availableFormats ) {
				ratedFormats.push({
					format: format,
					pattern: availableFormats[format],
					rate: compareFormats( skeleton, format )
				});
			}

			ratedFormats.sort( function( formatA, formatB ) {
				return formatA.rate - formatB.rate;
			});

			if ( ratedFormats.length ) {
				pattern = augmentFormat( skeleton, ratedFormats[0].pattern );
			}
		}

		return pattern;
	}

	function compareFormats( formatA, formatB ) {
		var distance, maxLength, minLength, index;

		maxLength = Math.max( formatA.length, formatB.length );
		minLength = Math.min( formatA.length, formatB.length );
		distance = maxLength / minLength;

		formatA = formatA.match( datePatternRe );
		formatB = formatB.match( datePatternRe );
		maxLength = Math.max( formatA.length, formatB.length );
		minLength = Math.min( formatA.length, formatB.length );

		for ( index = 0; index < minLength; index++ ) {
			if ( formatA[index].charAt( 0 ) === formatB[index].charAt( 0 ) ) {
				if ( formatA[index].length === formatB[index].length ) {
					distance *= 0.25;
				} else {
					distance *= 0.75;
				}
			} else {
				distance *= 1.25;
			}
		}

		distance *= 1.25 * ( maxLength - minLength + 1 );

		if ( formatA.length === formatB.length ) {
			distance *= 0.5;
		}

		return distance;
	}

	function augmentFormat( requestedSkeleton, bestMatchFormat ) {
		var originalBestMatchFormat, index, type, tempIndex;

		originalBestMatchFormat = bestMatchFormat;
		requestedSkeleton = requestedSkeleton.match( datePatternRe );
		bestMatchFormat = bestMatchFormat.match( datePatternRe );

		for ( index in bestMatchFormat ) {
			type = bestMatchFormat[index].charAt( 0 );

			for ( tempIndex in requestedSkeleton ) {
				if ( type === requestedSkeleton[tempIndex].charAt( 0 ) ) {
					bestMatchFormat[index] = requestedSkeleton[tempIndex];
					break;
				}
			}
		}

		bestMatchFormat = bestMatchFormat.join( "" );

		if ( bestMatchFormat === originalBestMatchFormat ) {
			bestMatchFormat = requestedSkeleton.join( "" );
		}

		return bestMatchFormat;
	}

	switch ( true ) {
		case "skeleton" in options:
			skeleton = options.skeleton;
			result = cldr.main([
				"dates/calendars/gregorian/dateTimeFormats/availableFormats",
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
				dateSkeleton = getBestMatchPattern(
					"dates/calendars/gregorian/dateTimeFormats/availableFormats",
					dateSkeleton
				);
				timeSkeleton = getBestMatchPattern(
					"dates/calendars/gregorian/dateTimeFormats/availableFormats",
					timeSkeleton
				);

				if ( dateSkeleton && timeSkeleton ) {
					result = combineDateTime( type, dateSkeleton, timeSkeleton );
				} else {
					result = dateSkeleton || timeSkeleton;
				}
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
