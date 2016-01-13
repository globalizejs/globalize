

/**
 * firstDayOfWeek
 */
var dateFirstDayOfWeek = function( cldr ) {
	return dateWeekDays.indexOf( cldr.supplemental.weekData.firstDay() );
};

