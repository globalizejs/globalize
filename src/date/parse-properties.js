define([
	"../gdate/calendar-for-locale"
], function( gdateCalendarForLocale ) {

/**
 * parseProperties( cldr )
 *
 * @cldr [Cldr instance].
 *
 * Return parser properties.
 */
return function( cldr ) {
	return {
		preferredTimeData: cldr.supplemental.timeData.preferred(),
		calendar: gdateCalendarForLocale( cldr )
	};
};

});
