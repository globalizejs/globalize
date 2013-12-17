define([
	"./first-day-of-week"
], function( dateFirstDayOfWeek ) {

/**
 * dayOfWeek
 *
 * Return the day of the week normalized by the territory's firstDay [0-6].
 * Eg for "mon":
 * - return 0 if territory is GB, or BR, or DE, or FR (week starts on "mon");
 * - return 1 if territory is US (week starts on "sun");
 * - return 2 if territory is EG (week starts on "sat");
 */
return function( date, cldr ) {
	return ( date.getDay() - dateFirstDayOfWeek( cldr ) + 7 ) % 7;
};

});
