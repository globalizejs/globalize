define([
	"./start_of"
], function( datetimeStartOf ) {

	/**
	 * millisecondsInDay
	 */
	return function( date ) {
		// TODO Handle daylight savings discontinuities
		return date - datetimeStartOf( date, "day" );
	};

});

