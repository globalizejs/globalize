define([
	"./week-days",
	"../util/array/index-of"
], function( datetimeWeekDays, arrayIndexOf ) {

	/**
	 * getFirstDayOfWeek
	 */
	return function( cldr ) {
		// FIXME cldr
		return arrayIndexOf( datetimeWeekDays, cldr.firstDay );
	};

});
