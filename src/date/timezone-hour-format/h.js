define(function() {

/**
 * timezoneHourFormatShortH( hourFormat )
 *
 * @hourFormat [String]
 *
 * Unofficial deduction of the short hourFormat given time zone `hourFormat` element.
 * Official spec is pending resolution: http://unicode.org/cldr/trac/ticket/8293
 *
 * Example:
 * - "+HH.mm;-HH.mm" => "+H;-H"
 * - "+HH:mm;-HH:mm" => "+H;-H"
 * - "+HH:mm;−HH:mm" => "+H;−H" (Note MINUS SIGN \u2212)
 * - "+HHmm;-HHmm" => "+H:-H"
 */
return function( hourFormat ) {
	return hourFormat
		.split( ";" )
		.map(function( format ) {
			return format.slice( 0, format.indexOf( "H" ) + 1 );
		})
		.join( ";" );
};

});
