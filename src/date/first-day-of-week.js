define([
	"./week-days",
	"../util/array/index-of"
], function( dateWeekDays, arrayIndexOf ) {

/**
 * firstDayOfWeek
 */
return function( cldr ) {
	return arrayIndexOf( dateWeekDays, cldr.supplemental.weekData.firstDay() );
};

});
