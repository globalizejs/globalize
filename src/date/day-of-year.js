define([
	"./distance-in-days",
	"./start-of"
], function( dateDistanceInDays, dateStartOf ) {

/**
 * dayOfYear
 *
 * Return the distance in days of the date to the begin of the year [0-d].
 */
return function( date ) {
	return Math.floor( dateDistanceInDays( dateStartOf( date, "year" ), date ) );
};

});
