define([
	"./pattern-re"
], function( datePatternRe ) {

/**
 * tokenizer( value, pattern )
 *
 * Returns an Array of tokens, eg. value "5 o'clock PM", pattern "h 'o''clock' a":
 * [{
 *   type: "h",
 *   lexeme: "5"
 * }, {
 *   type: "literal",
 *   lexeme: " "
 * }, {
 *   type: "literal",
 *   lexeme: "o'clock"
 * }, {
 *   type: "literal",
 *   lexeme: " "
 * }, {
 *   type: "a",
 *   lexeme: "PM",
 *   value: "pm"
 * }]
 *
 * OBS: lexeme's are always String and may return invalid ranges depending of the token type.
 * Eg. "99" for month number.
 *
 * Return an empty Array when not successfully parsed.
 */
return function( value, pattern, cldr ) {
	var valid,
		tokens = [],
		widths = [ "abbreviated", "wide", "narrow" ];

	valid = pattern.match( datePatternRe ).every(function( current ) {
		var chr, length, tokenRe,
			token = {};

		function oneDigitIfLengthOne() {
			if ( length === 1 ) {
				return tokenRe = /\d/;
			}
		}

		function oneOrTwoDigitsIfLengthOne() {
			if ( length === 1 ) {
				return tokenRe = /\d\d?/;
			}
		}

		function twoDigitsIfLengthTwo() {
			if ( length === 2 ) {
				return tokenRe = /\d\d/;
			}
		}

		// Brute-force test every locale entry in an attempt to match the given value.
		// Return the first found one (and set token accordingly), or null.
		function lookup( path ) {
			var i, re,
				data = cldr.main( path );
			for ( i in data ) {
				re = new RegExp( "^" + data[ i ] );
				if ( re.test( value ) ) {
					token.value = i;
					return tokenRe = new RegExp( data[ i ] );
				}
			}
			return null;
		}

		token.type = current;
		chr = current.charAt( 0 ),
		length = current.length;

		switch ( chr ) {

			// Era
			case "G":
				lookup([
					"dates/calendars/gregorian/eras",
					length <= 3 ? "eraAbbr" : ( length === 4 ? "eraNames" : "eraNarrow" )
				]);
				break;

			// Year
			case "y":
			case "Y":
				// number l=1:+, l=2:{2}, l=3:{3,}, l=4:{4,}, ...
				if ( length === 1 ) {
					tokenRe = /\d+/;
				} else if ( length === 2 ) {
					tokenRe = /\d\d/;
				} else {
					tokenRe = new RegExp( "\\d{" + length + ",}" );
				}
				break;

			case "u": // Extended year. Need to be implemented.
			case "U": // Cyclic year name. Need to be implemented.
				throw new Error( "Not implemented" );

			// Quarter
			case "Q":
			case "q":
				// number l=1:{1}, l=2:{2}.
				// lookup l=3...
				oneDigitIfLengthOne() || twoDigitsIfLengthTwo() || lookup([
					"dates/calendars/gregorian/quarters",
					chr === "Q" ? "format" : "stand-alone",
					widths[ length - 3 ]
				]);
				break;

			// Month
			case "M":
			case "L":
				// number l=1:{1,2}, l=2:{2}.
				// lookup l=3...
				oneOrTwoDigitsIfLengthOne() || twoDigitsIfLengthTwo() || lookup([
					"dates/calendars/gregorian/months",
					chr === "M" ? "format" : "stand-alone",
					widths[ length - 3 ]
				]);
				break;

			// Day (see d below)
			case "D":
				// number {l,3}.
				if ( length <= 3 ) {
					tokenRe = new RegExp( "\\d{" + length + ",3}" );
				}
				break;

			case "W":
			case "F":
				// number l=1:{1}.
				oneDigitIfLengthOne();
				break;

			case "g+":
				// Modified Julian day. Need to be implemented.
				throw new Error( "Not implemented" );

			// Week day
			case "e":
			case "c":
				// number l=1:{1}, l=2:{2}.
				// lookup for length >=3.
				if ( length <= 2 ) {
					oneDigitIfLengthOne() || twoDigitsIfLengthTwo();
					break;
				}

			/* falls through */
			case "E":
				if ( length === 6 ) {
					// Note: if short day names are not explicitly specified, abbreviated day
					// names are used instead http://www.unicode.org/reports/tr35/tr35-dates.html#months_days_quarters_eras
					lookup([
						"dates/calendars/gregorian/days",
						[ chr === "c" ? "stand-alone" : "format" ],
						"short"
					]) || lookup([
						"dates/calendars/gregorian/days",
						[ chr === "c" ? "stand-alone" : "format" ],
						"abbreviated"
					]);
				} else {
					lookup([
						"dates/calendars/gregorian/days",
						[ chr === "c" ? "stand-alone" : "format" ],
						widths[ length < 3 ? 0 : length - 3 ]
					]);
				}
				break;

			// Period (AM or PM)
			case "a":
				lookup([
					"dates/calendars/gregorian/dayPeriods/format/wide"
				]);
				break;

			// Week, Day, Hour, Minute, or Second
			case "w":
			case "d":
			case "h":
			case "H":
			case "K":
			case "k":
			case "j":
			case "m":
			case "s":
				// number l1:{1,2}, l2:{2}.
				oneOrTwoDigitsIfLengthOne() || twoDigitsIfLengthTwo();
				break;

			case "S":
				// number {l}.
					tokenRe = new RegExp( "\\d{" + length + "}" );
				break;

			case "A":
				// number {l+5}.
					tokenRe = new RegExp( "\\d{" + ( length + 5 ) + "}" );
				break;

			// Zone
			// see http://www.unicode.org/reports/tr35/tr35-dates.html#Using_Time_Zone_Names ?
			// Need to be implemented.
			case "z":
			case "Z":
			case "O":
			case "v":
			case "V":
			case "X":
			case "x":
				throw new Error( "Not implemented" );

			case "'":
				token.type = "literal";
				if ( current.charAt( 1 ) === "'" ) {
					tokenRe = /'/;
				} else {
					tokenRe = /'[^']+'/;
				}
				break;

			default:
				token.type = "literal";
				tokenRe = /./;
		}

		if ( !tokenRe ) {
			return false;
		}

		// Get lexeme and consume it.
		value = value.replace( new RegExp( "^" + tokenRe.source ), function( lexeme ) {
			token.lexeme = lexeme;
			return "";
		});

		if ( !token.lexeme ) {
			return false;
		}

		tokens.push( token );
		return true;
	});

	return valid ? tokens : [];
};

});
