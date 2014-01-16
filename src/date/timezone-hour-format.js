define([
	"../util/string/pad"
], function( stringPad ) {

/**
 * hourFormat( date, format )
 *
 * Return date's timezone offset according to the format passed.
 * Eg for format when timezone offset is 180:
 * - "+H;-H": -3
 * - "+HHmm;-HHmm": -0300
 * - "+HH:mm;-HH:mm": -03:00
 */
return function( date, format ) {
	var offset = date.getTimezoneOffset();

	// Pick the correct sign side (+ or -).
	format = format.split( ";" )[ offset > 0 ? 1 : 0 ];

	// Update hours offset.
	format = format.replace( /HH?/, function( match ) {
		return stringPad( Math.floor( Math.abs( offset ) / 60 ), match.length );
	});

	// Update minutes offset and return.
	return format.replace( /mm/, stringPad( Math.abs( offset ) % 60, 2 ) );
};

});
