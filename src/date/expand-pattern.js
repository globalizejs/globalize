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
	var dateSkeleton, result, skeleton, timeSkeleton, type, dateTimeSkeleton;

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

			ratedFormats = ratedFormats
				.filter( function( format ) {
					return format.rate > -1;
				} )
				.sort( function( formatA, formatB ) {
					return formatA.rate - formatB.rate;
				});

			if ( ratedFormats.length ) {
				pattern = augmentFormat( skeleton, ratedFormats[0].pattern );
			}
		}

		return pattern;
	}

	function repeatStr( str, count ) {
		var i, result = "";
		for ( i = 0; i < count; i++ ) {
			result = result + str;
		}
		return result;
	}

	function normalizePatternType( char ) {
		switch ( char ) {
			case "e":
			case "E":
			case "c":
				return "e";

			case "M":
			case "L":
				return "L";

			default:
				return char;
		}
	}

	function compareFormats( formatA, formatB ) {
		var distance,
			typeA,
			typeB,
			matchFound,
			i,
			j;

		if ( formatA === formatB ) {
			return 0;
		}

		formatA = formatA.match( datePatternRe );
		formatB = formatB.match( datePatternRe );
		if ( formatA.length === formatB.length ) {
			distance = 1;
			for ( i = 0; i < formatA.length; i++ ) {
				typeA = normalizePatternType( formatA[i].charAt( 0 ) );
				typeB = null;
				matchFound = false;
				for ( j = 0; j < formatB.length; j++ ) {
					typeB = normalizePatternType( formatB[j].charAt( 0 ) );
					if ( typeA === typeB ) {
						break;
					} else {
						typeB = null;
					}
				}
				if ( null === typeB ) {
					return -1;
				}
				distance = distance + Math.abs( formatA[i].length - formatB[j].length );
				if ( formatA[i].charAt( 0 ) !== formatB[j].charAt( 0 ) ) {
					distance = distance + 1;
				}
			}
			return distance;
		}
		return -1;
	}

	function augmentFormat( requestedSkeleton, bestMatchFormat ) {
		var i, j, matchedType, matchedLength, requestedType, requestedLength;

		requestedSkeleton = requestedSkeleton.match( datePatternRe );
		bestMatchFormat = bestMatchFormat.match( datePatternRe );

		for ( i = 0; i < bestMatchFormat.length; i++ ) {
			matchedType = bestMatchFormat[i].charAt( 0 );
			matchedLength = bestMatchFormat[i].length;
			for ( j = 0; j < requestedSkeleton.length; j++ ) {
				requestedType = requestedSkeleton[j].charAt( 0 );
				requestedLength = requestedSkeleton[j].length;
				if (
					normalizePatternType( matchedType ) === normalizePatternType( requestedType ) &&
					matchedLength < requestedLength
				) {
					bestMatchFormat[i] = repeatStr( matchedType, requestedLength );
				}
			}
		}

		return bestMatchFormat.join( "" );
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
				dateTimeSkeleton = getBestMatchPattern(
					"dates/calendars/gregorian/dateTimeFormats/availableFormats",
					skeleton
				);
				if ( dateTimeSkeleton ) {
					result = dateTimeSkeleton;
				} else {
					dateSkeleton = getBestMatchPattern(
						"dates/calendars/gregorian/dateTimeFormats/availableFormats",
						dateSkeleton
					);
					timeSkeleton = getBestMatchPattern(
						"dates/calendars/gregorian/dateTimeFormats/availableFormats",
						timeSkeleton
					);

					if ( /(MMMM|LLLL).*[Ec]/.test( dateSkeleton ) ) {
						type = "full";
					} else if ( /MMMM/g.test( dateSkeleton ) ) {
						type = "long";
					} else if ( /MMM/g.test( dateSkeleton ) || /LLL/g.test( dateSkeleton ) ) {
						type = "medium";
					} else {
						type = "short";
					}

					if ( dateSkeleton && timeSkeleton ) {
						result = combineDateTime( type, dateSkeleton, timeSkeleton );
					} else {
						result = dateSkeleton || timeSkeleton;
					}
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
