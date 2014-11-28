define([
	"../util/string/pad"
], function( stringPad ) {

/**
 * supplementalOverride( currency, pattern, cldr )
 *
 * Return pattern with fraction digits overriden by supplemental currency data.
 */
return function( currency, pattern, cldr ) {
	var digits,
		fraction = cldr.supplemental([ "currencyData/fractions", currency ]) ||
			cldr.supplemental( "currencyData/fractions/DEFAULT" );

	digits = +fraction._digits;

	if ( digits ) {
		fraction = "." + stringPad( "0", digits ).slice( 0, -1 ) + fraction._rounding;
	} else {
		fraction = "";
	}

	return pattern.replace( /\.(#+|0*[0-9]|0+[0-9]?)/g, fraction );
};

});
