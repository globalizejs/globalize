define(function() {

/**
 * currencyFormatter( number, currency, cldr )
 *
 * @number [Number].
 *
 * @currency [String]
 *
 * @cldr [Cldr instance].
 *
 * Return the formatted currency.
 */
return function( number, currency, cldr ) {

	return cldr.main( "currencies");
};

});
