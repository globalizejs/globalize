define(function() {

	/**
	 * getMillisecondsInDay
	 */
	return function( date ) {
		// TODO Handle daylight savings discontinuities
		// TODO there must be an easier way.
		var truncated = new Date( date );
		truncated.setMilliseconds( 0 );
		truncated.setSeconds( 0 );
		truncated.setMinutes( 0 );
		truncated.setHours( 0 );
		// TODO Does the below subtraction work on all supported browsers?
		return date - truncated;
	};

});

