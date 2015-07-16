define(function() {

/**
 * lastDayOfMonth( date )
 *
 * @date [Date]
 *
 * Return the last day of the given date's month
 */
return function( date ) {
	return new Date( date.getFullYear(), date.getMonth() + 1, 0 ).getDate();
};

});
