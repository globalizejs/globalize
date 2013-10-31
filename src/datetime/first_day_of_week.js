define([
	"./week_days",
	"../util/array/index_of"
], function( datetimeWeekDays, arrayIndexOf ) {

	/**
	 * firstDayOfWeek
	 */
	return function( cldr ) {
		return arrayIndexOf( datetimeWeekDays, cldr.supplemental.weekData.firstDay() );
	};

});
