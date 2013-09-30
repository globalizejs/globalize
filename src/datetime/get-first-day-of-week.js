define([
	"./week-days",
	"../util/array/index-of"
], function( datetimeWeekDays, arrayIndexOf ) {

	/**
	 * getFirstDayOfWeek
	 */
	return function( cldr ) {
		return arrayIndexOf( datetimeWeekDays, cldr.supplemental.firstDay() );
	};

});
