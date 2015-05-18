define([
	"./distance-in-days",
	"./start-of"
], function( dateDistanceInDays, dateStartOf ) {

/**
 * dayOfYear
 *
 * Return the distance in days of the globalized date to the beginning of the year [0-d].
 */
return function( gdate ) {
  var date = gdate.toDate();
	return Math.floor( dateDistanceInDays( gdate.startOfYear().toDate(), date ) );
};

});
