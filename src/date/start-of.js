define(function() {

/**
 * startOf changes the input to the beginning of the given unit.
 *
 * For example, starting at the start of a day, resets hours, minutes
 * seconds and milliseconds to 0. Starting at the month does the same, but
 * also sets the date to 1.
 *
 * Returns the modified date
 */
return function( date, unit, gdate ) {
  // gdate is the globalized date for date. if unit is not 'year' or 'month', then it is not needed
	// passing it in is ugly; it should take a calendar constructor or cldr object
  if (unit === "year"){
    // no choice but to go through each month one at a time
    for (var lastMonth = gdate.nextMonth(-1); lastMonth.getYear() === gdate.getYear();){
      gdate = lastMonth;
			lastMonth = gdate.nextMonth(-1);
    }
  }
	date = new Date( date.getTime() );
	switch ( unit ) {
		case "year":
		/* falls through */
		case "month":
			date = gdate.nextDate(1 - gdate.getDate()).toDate();
		/* falls through */
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
