define([
	"./normalize-pattern-type",
	"../pattern-re",
	"../../util/string/repeat"
], function( dateExpandPatternNormalizePatternType, datePatternRe, stringRepeat ) {

return function( requestedSkeleton, bestMatchFormat ) {
	var i, j, matchedType, matchedLength, requestedType, requestedLength,

		// Using an easier to read variable.
		normalizePatternType = dateExpandPatternNormalizePatternType;

	requestedSkeleton = requestedSkeleton.match( datePatternRe );
	bestMatchFormat = bestMatchFormat.match( datePatternRe );

	for ( i = 0; i < bestMatchFormat.length; i++ ) {
		matchedType = bestMatchFormat[i].charAt( 0 );
		matchedLength = bestMatchFormat[i].length;
		for ( j = 0; j < requestedSkeleton.length; j++ ) {
			requestedType = requestedSkeleton[j].charAt( 0 );
			requestedLength = requestedSkeleton[j].length;
			if ( normalizePatternType( matchedType ) === normalizePatternType( requestedType ) &&
				matchedLength < requestedLength
			) {
				bestMatchFormat[i] = stringRepeat( matchedType, requestedLength );
			}
		}
	}

	return bestMatchFormat.join( "" );
};

});
