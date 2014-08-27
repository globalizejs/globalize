define(function() {

/**
 * Differently from native date.setDate(), this function returns a date whose
 * day remains inside the month boundaries. For example:
 *
 * setDate( FebDate, 31 ): a "Feb 28" date.
 * setDate( SepDate, 31 ): a "Sep 30" date.
 */
return function( date, day ) {
	var lastDay = new Date( date.getFullYear(), date.getMonth() + 1, 0 ).getDate();

	date.setDate( day < 1 ? 1 : day < lastDay ? day : lastDay );
};

});
