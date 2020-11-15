define([
	"./normalize-pattern-type",
	"../pattern-re",
	"../../util/string/repeat"
], function( dateExpandPatternNormalizePatternType, datePatternRe, stringRepeat ) {

function expandBestMatchFormat( skeletonWithoutFractionalSeconds, bestMatchFormat ) {
	var i, j, bestMatchFormatParts, matchedType, matchedLength, requestedType,
		requestedLength, requestedSkeletonParts,

		// Using an easier to read variable.
		normalizePatternType = dateExpandPatternNormalizePatternType;

	requestedSkeletonParts = skeletonWithoutFractionalSeconds.match( datePatternRe );
	bestMatchFormatParts = bestMatchFormat.match( datePatternRe );

	for ( i = 0; i < bestMatchFormatParts.length; i++ ) {
		matchedType = bestMatchFormatParts[ i ].charAt( 0 );
		matchedLength = bestMatchFormatParts[ i ].length;
		for ( j = 0; j < requestedSkeletonParts.length; j++ ) {
			requestedType = requestedSkeletonParts[ j ].charAt( 0 );
			requestedLength = requestedSkeletonParts[ j ].length;
			if ( normalizePatternType( matchedType ) === normalizePatternType( requestedType ) &&
				matchedLength < requestedLength
			) {
				bestMatchFormatParts[ i ] = stringRepeat( matchedType, requestedLength );
			}
		}
	}

	return bestMatchFormatParts.join( "" );
}

// See: http://www.unicode.org/reports/tr35/tr35-dates.html#Matching_Skeletons
return function( requestedSkeleton, bestMatchFormat, decimalSeparator ) {
	var countOfFractionalSeconds, fractionalSecondMatch, lastSecondIdx,
		skeletonWithoutFractionalSeconds;

	fractionalSecondMatch = requestedSkeleton.match( /S/g );
	countOfFractionalSeconds = fractionalSecondMatch ? fractionalSecondMatch.length : 0;
	skeletonWithoutFractionalSeconds = requestedSkeleton.replace( /S/g, "" );

	bestMatchFormat = expandBestMatchFormat( skeletonWithoutFractionalSeconds, bestMatchFormat );

	lastSecondIdx = bestMatchFormat.lastIndexOf( "s" );
	if ( lastSecondIdx !== -1 && countOfFractionalSeconds !== 0 ) {
		bestMatchFormat =
			bestMatchFormat.slice( 0, lastSecondIdx + 1 ) +
			decimalSeparator +
			stringRepeat( "S", countOfFractionalSeconds ) +
			bestMatchFormat.slice( lastSecondIdx + 1 );
	}
	return bestMatchFormat;
};

});
