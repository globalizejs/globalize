define([
	"./get-first-day-of-week"
], function( datetimeGetFirstDayOfWeek ) {

	/**
	 * weekDay
	 *
	 * Return the day of the week normalized by the territory's firstDay [0-6].
	 * Eg for "mon":
	 * - returns 0 if territory is GB, or BR, or DE, or FR (week starts on "mon");
	 * - returns 1 if territory is US (week starts on "sun");
	 * - returns 2 if territory is EG (week starts on "sat");
	 */
	return function( date, cldr ) {
		return ( date.getDay() - datetimeGetFirstDayOfWeek( cldr ) + 7 ) % 7;
	};

});
