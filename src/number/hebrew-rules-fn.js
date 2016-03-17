define(function() {
/**
 * HebrewRules( fnName )
 *
 * Return Hebrew number conversion algorithmic rule
 * Parameters:
 * value - number to be formatted/parsed
 * isReversedConversion - has true value on evokation from numberParser,
 * false when called fromn umberFormatter
 *
 * Return Hebrew number conversion algorithmic rule
 */
return function( value, isReversedConversion ) {
		var APOSTROPHE = "\u0027", ret, idx = 0;
		var DIGITS	= [ [ "\u05d0", "\u05d1", "\u05d2", "\u05d3", "\u05d4", "\u05d5",
						"\u05d6", "\u05d7", "\u05d8" ],
					[ "\u05d9", "\u05db", "\u05dc", "\u05de", "\u05e0", "\u05e1",
						"\u05e2", "\u05e4", "\u05e6" ],
					[ "\u05e7", "\u05e8", "\u05e9", "\u05ea", "\u05ea\u05e7", "\u05ea\u05e8",
						"\u05ea\u05e9", "\u05ea\u05ea", "\u05ea\u05ea\u05e7",
						"\u05ea\u05ea\u05e8" ] ];

		if ( !isReversedConversion && value > 1 ) {
			var QUOTATION = "\u0022", digit;
			ret = "";
			value = value | 0;
			while ( value ) {
				digit = value % 10;
				if ( idx === 0 ) {
					ret = APOSTROPHE + " " + ret;
				}
				if ( digit ) {
					ret = DIGITS[idx][digit - 1] + ret;
				}
				idx = ( idx + 1 ) % 3;
				value = ( value / 10 ) | 0;
			}
			ret = ret.substring( 0, ret.length - 2 );
			ret = ret.replace( DIGITS[1][0] + DIGITS[0][4], DIGITS[0][8] + DIGITS[0][5] )
					.replace( DIGITS[1][0] + DIGITS[0][5], DIGITS[0][8] + DIGITS[0][6] );

			var parts = ret.split( " " );
			parts = parts[parts.length - 1];
			if ( parts && parts.length > 1 ) {
				ret = ret.substring( 0, ret.length - 1 ) + QUOTATION + ret.charAt( ret.length - 1 );
			} else {
				ret += APOSTROPHE;
			}
			return ret;
		} else if ( isReversedConversion && !RegExp( "[^\u05d0-\u065f \x27\x22]" ).test( value ) ) {
				var ch, pos;
				ret = 0;
				value = value.replace( "\"", "" );
				value = value.replace( /'$/, "" ).replace( /[ \"]/g, "" );
				while ( ch = value.charAt( idx++ ) ) {
					for ( var i = 0; i < 3; i++ ) {
						pos = DIGITS[i].indexOf( ch );
						if ( pos !== -1 ) {
							ret += ( pos + 1 ) * Math.pow( 10, i );
							break;
						} else if ( ch === APOSTROPHE ) {
							ret *= 1000;
							break;
						}
					}
				}
				return ret;
		}
		return value;
};
});
