define(function() {

/**
 * distanceInDays( from, to )
 *
 * Return the distance in days between from and to Dates.
 */
return function( from, to ) {
	var inDays = 864e5;
	return ( to.getTime() - from.getTime() ) / inDays;
};

});
