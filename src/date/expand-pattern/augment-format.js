define([
	"./normalize-pattern-type",
	"../pattern-re",
	"../../util/string/repeat"
], function( dateExpandPatternNormalizePatternType, datePatternRe, stringRepeat ) {

// See: http://www.unicode.org/reports/tr35/tr35-dates.html#Matching_Skeletons
return function( requestedSkeleton, bestMatchFormat, decimalSeparator ) {
	var i, j, bestMatchFormatParts, countOfFractionalSeconds, fractionalSecondMatch, matchedType,
		matchedLength, requestedType, requestedLength, requestedSkeletonParts,
		skeletonWithoutFractionalSeconds,

		// Using an easier to read variable.
		normalizePatternType = dateExpandPatternNormalizePatternType;

	fractionalSecondMatch = requestedSkeleton.match( /S/g );
	countOfFractionalSeconds = fractionalSecondMatch ? fractionalSecondMatch.length : 0;
	skeletonWithoutFractionalSeconds = requestedSkeleton.replace( /S/g, "" );

	requestedSkeletonParts = skeletonWithoutFractionalSeconds.match( datePatternRe );
	bestMatchFormatParts = bestMatchFormat.match( datePatternRe );

	for ( i = 0; i < bestMatchFormatParts.length; i++ ) {
		matchedType = bestMatchFormatParts[i].charAt( 0 );
		matchedLength = bestMatchFormatParts[i].length;
		for ( j = 0; j < requestedSkeletonParts.length; j++ ) {
			requestedType = requestedSkeletonParts[j].charAt( 0 );
			requestedLength = requestedSkeletonParts[j].length;
			if ( normalizePatternType( matchedType ) === normalizePatternType( requestedType ) &&
				matchedLength < requestedLength
			) {
				bestMatchFormatParts[i] = stringRepeat( matchedType, requestedLength );
			}
		}

		if ( matchedType === "s" && countOfFractionalSeconds !== 0 ) {
			bestMatchFormatParts[i] +=
				decimalSeparator + stringRepeat( "S", countOfFractionalSeconds );
		}
	}

	return bestMatchFormatParts.join( "" );
};

});
