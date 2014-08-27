define([
	"./start-of"
], function( dateStartOf ) {

/**
 * millisecondsInDay
 */
return function( date ) {
	// TODO Handle daylight savings discontinuities
	return date - dateStartOf( date, "day" );
};

});
