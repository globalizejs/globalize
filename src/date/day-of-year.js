define([
	"./distance-in-days"
], function( dateDistanceInDays ) {

/**
 * dayOfYear
 *
 * Return the distance in days of the globalized date to the beginning of the year [0-d].
 */
return function( gdate ) {
  var date = gdate.toDate();
	return Math.round( dateDistanceInDays( gdate.startOfYear().toDate(), date ) );
};

});
