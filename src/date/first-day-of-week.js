define([
	"./week-days"
], function( dateWeekDays ) {

/**
 * firstDayOfWeek
 */
return function( cldr ) {
	return dateWeekDays.indexOf( cldr.supplemental.weekData.firstDay() );
};

});
