define([
	"./pattern-re",
	"../util/regexp/escape",
	"../util/regexp/n",
	"../util/remove-literal-quotes"
], function( datePatternRe, regexpEscape, regexpN, removeLiteralQuotes ) {

/**
 * tokenizer( value, pattern, properties )
 *
 * @value [String] string date.
 *
 * @properties [Object] output returned by date/tokenizer-properties.
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
return function( value, numberParser, properties ) {
	var valid,
		timeSeparator = properties.timeSeparator,
		tokens = [],
		widths = [ "abbreviated", "wide", "narrow" ];

	valid = properties.pattern.match( datePatternRe ).every(function( current ) {
		var chr, length, numeric, tokenRe,
			token = {};

		function hourFormatParse( tokenRe, numberParser ) {
			var aux = value.match( tokenRe );
			numberParser = numberParser || function( value ) {
				return +value;
			};

			if ( !aux ) {
				return false;
			}

			// hourFormat containing H only, e.g., `+H;-H`
			if ( aux.length < 8 ) {
				token.value =
					( aux[ 1 ] ? -numberParser( aux[ 1 ] ) : numberParser( aux[ 4 ] ) ) * 60;

			// hourFormat containing H and m, e.g., `+HHmm;-HHmm`
			} else {
				token.value =
					( aux[ 1 ] ? -numberParser( aux[ 1 ] ) : numberParser( aux[ 7 ] ) ) * 60 +
					( aux[ 1 ] ? -numberParser( aux[ 4 ] ) : numberParser( aux[ 10 ] ) );
			}

			return true;
		}

		// Transform:
		// - "+H;-H" -> /\+(\d\d?)|-(\d\d?)/
		// - "+HH;-HH" -> /\+(\d\d)|-(\d\d)/
		// - "+HHmm;-HHmm" -> /\+(\d\d)(\d\d)|-(\d\d)(\d\d)/
		// - "+HH:mm;-HH:mm" -> /\+(\d\d):(\d\d)|-(\d\d):(\d\d)/
		//
		// If gmtFormat is GMT{0}, the regexp must fill {0} in each side, e.g.:
		// - "+H;-H" -> /GMT\+(\d\d?)|GMT-(\d\d?)/
		function hourFormatRe( hourFormat, gmtFormat, timeSeparator ) {
			var re;

			if ( !gmtFormat ) {
				gmtFormat = "{0}";
			}

			re = hourFormat
				.replace( "+", "\\+" )

				// Unicode equivalent to (\\d\\d)
				.replace( /HH|mm/g, "((" + regexpN.source + ")(" + regexpN.source + "))" )

				// Unicode equivalent to (\\d\\d?)
				.replace( /H|m/g, "((" + regexpN.source + ")(" + regexpN.source + ")?)" );

			if ( timeSeparator ) {
				re = re.replace( /:/g, timeSeparator );
			}

			re = re.split( ";" ).map(function( part ) {
				return gmtFormat.replace( "{0}", part );
			}).join( "|" );

			return new RegExp( re );
		}

		function oneDigitIfLengthOne() {
			if ( length === 1 ) {

				// Unicode equivalent to /\d/
				numeric = true;
				return tokenRe = regexpN;
			}
		}

		function oneOrTwoDigitsIfLengthOne() {
			if ( length === 1 ) {

				// Unicode equivalent to /\d\d?/
				numeric = true;
				return tokenRe = new RegExp( "(" + regexpN.source + "){1,2}" );
			}
		}

		function oneOrTwoDigitsIfLengthOneOrTwo() {
			if ( length === 1 || length === 2 ) {

				// Unicode equivalent to /\d\d?/
				numeric = true;
				return tokenRe = new RegExp( "(" + regexpN.source + "){1,2}" );
			}
		}

		function twoDigitsIfLengthTwo() {
			if ( length === 2 ) {

				// Unicode equivalent to /\d\d/
				numeric = true;
				return tokenRe = new RegExp( "(" + regexpN.source + "){2}" );
			}
		}

		// Brute-force test every locale entry in an attempt to match the given value.
		// Return the first found one (and set token accordingly), or null.
		function lookup( path ) {
			var i, re,
				data = properties[ path.join( "/" ) ];

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

		if ( chr === "Z" ) {

			// Z..ZZZ: same as "xxxx".
			if ( length < 4 ) {
				chr = "x";
				length = 4;

			// ZZZZ: same as "OOOO".
			} else if ( length < 5 ) {
				chr = "O";
				length = 4;

			// ZZZZZ: same as "XXXXX"
			} else {
				chr = "X";
				length = 5;
			}
		}

		switch ( chr ) {

			// Era
			case "G":
				lookup([
					"gregorian/eras",
					length <= 3 ? "eraAbbr" : ( length === 4 ? "eraNames" : "eraNarrow" )
				]);
				break;

			// Year
			case "y":
			case "Y":
				numeric = true;

				// number l=1:+, l=2:{2}, l=3:{3,}, l=4:{4,}, ...
				if ( length === 1 ) {

					// Unicode equivalent to /\d+/.
					tokenRe = new RegExp( "(" + regexpN.source + ")+" );
				} else if ( length === 2 ) {

					// Lenient parsing: there's no year pattern to indicate non-zero-padded 2-digits
					// year, so parser accepts both zero-padded and non-zero-padded for `yy`.
					//
					// Unicode equivalent to /\d\d?/
					tokenRe = new RegExp( "(" + regexpN.source + "){1,2}" );
				} else {

					// Unicode equivalent to /\d{length,}/
					tokenRe = new RegExp( "(" + regexpN.source + "){" + length + ",}" );
				}
				break;

			// Quarter
			case "Q":
			case "q":

				// number l=1:{1}, l=2:{2}.
				// lookup l=3...
				oneDigitIfLengthOne() || twoDigitsIfLengthTwo() ||
					lookup([
						"gregorian/quarters",
						chr === "Q" ? "format" : "stand-alone",
						widths[ length - 3 ]
					]);
				break;

			// Month
			case "M":
			case "L":

				// number l=1:{1,2}, l=2:{2}.
				// lookup l=3...
				//
				// Lenient parsing: skeleton "yMd" (i.e., one M) may include MM for the pattern,
				// therefore parser accepts both zero-padded and non-zero-padded for M and MM.
				// Similar for L.
				oneOrTwoDigitsIfLengthOneOrTwo() || lookup([
					"gregorian/months",
					chr === "M" ? "format" : "stand-alone",
					widths[ length - 3 ]
				]);
				break;

			// Day
			case "D":

				// number {l,3}.
				if ( length <= 3 ) {

					// Equivalent to /\d{length,3}/
					numeric = true;
					tokenRe = new RegExp( "(" + regexpN.source + "){" + length + ",3}" );
				}
				break;

			case "W":
			case "F":

				// number l=1:{1}.
				oneDigitIfLengthOne();
				break;

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
						"gregorian/days",
						[ chr === "c" ? "stand-alone" : "format" ],
						"short"
					]) || lookup([
						"gregorian/days",
						[ chr === "c" ? "stand-alone" : "format" ],
						"abbreviated"
					]);
				} else {
					lookup([
						"gregorian/days",
						[ chr === "c" ? "stand-alone" : "format" ],
						widths[ length < 3 ? 0 : length - 3 ]
					]);
				}
				break;

			// Period (AM or PM)
			case "a":
				lookup([
					"gregorian/dayPeriods/format/wide"
				]);
				break;

			// Week
			case "w":

				// number l1:{1,2}, l2:{2}.
				oneOrTwoDigitsIfLengthOne() || twoDigitsIfLengthTwo();
				break;

			// Day, Hour, Minute, or Second
			case "d":
			case "h":
			case "H":
			case "K":
			case "k":
			case "j":
			case "m":
			case "s":

				// number l1:{1,2}, l2:{2}.
				//
				// Lenient parsing:
				// - skeleton "hms" (i.e., one m) always includes mm for the pattern, i.e., it's
				//   impossible to use a different skeleton to parse non-zero-padded minutes,
				//   therefore parser accepts both zero-padded and non-zero-padded for m. Similar
				//   for seconds s.
				// - skeleton "hms" (i.e., one h) may include h or hh for the pattern, i.e., it's
				//   impossible to use a different skeleton to parser non-zero-padded hours for some
				//   locales, therefore parser accepts both zero-padded and non-zero-padded for h.
				//   Similar for d (in skeleton yMd).
				oneOrTwoDigitsIfLengthOneOrTwo();
				break;

			case "S":

				// number {l}.

				// Unicode equivalent to /\d{length}/
				numeric = true;
				tokenRe = new RegExp( "(" + regexpN.source + "){" + length + "}" );
				break;

			case "A":

				// number {l+5}.

				// Unicode equivalent to /\d{length+5}/
				numeric = true;
				tokenRe = new RegExp( "(" + regexpN.source + "){" + ( length + 5 ) + "}" );
				break;

			// Zone
			case "z":
			case "O":

				// O: "{gmtFormat}+H;{gmtFormat}-H" or "{gmtZeroFormat}", eg. "GMT-8" or "GMT".
				// OOOO: "{gmtFormat}{hourFormat}" or "{gmtZeroFormat}", eg. "GMT-08:00" or "GMT".
				if ( value === properties[ "timeZoneNames/gmtZeroFormat" ] ) {
					token.value = 0;
					tokenRe = new RegExp( properties[ "timeZoneNames/gmtZeroFormat" ] );
				} else {
					tokenRe = hourFormatRe(
						length < 4 ? "+H;-H" : properties[ "timeZoneNames/hourFormat" ],
						properties[ "timeZoneNames/gmtFormat" ],
						timeSeparator
					);
					if ( !hourFormatParse( tokenRe, numberParser ) ) {
						return null;
					}
				}
				break;

			case "X":

				// Same as x*, except it uses "Z" for zero offset.
				if ( value === "Z" ) {
					token.value = 0;
					tokenRe = /Z/;
					break;
				}

			/* falls through */
			case "x":

				// x: hourFormat("+HH;-HH")
				// xx or xxxx: hourFormat("+HHmm;-HHmm")
				// xxx or xxxxx: hourFormat("+HH:mm;-HH:mm")
				tokenRe = hourFormatRe(
					length === 1 ? "+HH;-HH" : ( length % 2 ? "+HH:mm;-HH:mm" : "+HHmm;-HHmm" )
				);
				if ( !hourFormatParse( tokenRe ) ) {
					return null;
				}
				break;

			case "'":
				token.type = "literal";
				tokenRe = new RegExp( regexpEscape( removeLiteralQuotes( current ) ) );
				break;

			default:
				token.type = "literal";
				tokenRe = new RegExp( regexpEscape( current ) );
		}

		if ( !tokenRe ) {
			return false;
		}

		// Get lexeme and consume it.
		value = value.replace( new RegExp( "^" + tokenRe.source ), function( lexeme ) {
			token.lexeme = lexeme;
			if ( numeric ) {
				token.value = numberParser( lexeme );
			}
			return "";
		});

		if ( !token.lexeme ) {
			return false;
		}

		tokens.push( token );
		return true;
	});

	if ( value !== "" ) {
		valid = false;
	}

	return valid ? tokens : [];
};

});
