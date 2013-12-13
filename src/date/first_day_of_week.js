define([
	"./week_days",
	"../util/array/index_of"
], function( dateWeekDays, arrayIndexOf ) {

	/**
	 * firstDayOfWeek
	 */
	return function( cldr ) {
		return arrayIndexOf( dateWeekDays, cldr.supplemental.weekData.firstDay() );
	};

});
