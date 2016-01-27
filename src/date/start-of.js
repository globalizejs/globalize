define([
	"../gdate/Gdate"
], function( gdateGdate ) {

/**
 * startOf changes the input to the beginning of the given unit.
 *
 * For example, starting at the start of a day, resets hours, minutes
 * seconds and milliseconds to 0. Starting at the month does the same, but
 * also sets the date to 1.
 *
 * calendar is the name of the calendar system, to determine what a "year" and "month" are
 *
 * Returns the modified date
 */
return function( date, unit, calendar ) {
	if ( unit === "year" ) {
		date = new gdateGdate.calendars[ calendar ]( date ).startOfYear().toDate();
	} else if ( unit === "month" ) {
		date = new gdateGdate.calendars[ calendar ]( date ).startOfMonth().toDate();
	} else {
		date = new Date( date.getTime() );
	}
	switch ( unit ) {
		case "year":
		case "month":
		case "day":
			date.setHours( 0 );
		/* falls through */
		case "hour":
			date.setMinutes( 0 );
		/* falls through */
		case "minute":
			date.setSeconds( 0 );
		/* falls through */
		case "second":
			date.setMilliseconds( 0 );
	}
	return date;
};

});
