// jscs:disable validateLineBreaks
define( [], function() {
return {
	/**
	* Arabic and many other languages have classical shapes for digits (National Digits)
	* That are different from the conventional Western Digits (European).
	* Arabic digits have the same semantic meaning as the European digits. The difference is
	* Only a difference in glyphs.
	* This module is used to shape the digits contained in any string from Arabic to European
	* And vice versa.
	*/

	/**
	* As of Unicode 7.0, the Arabic script is contained in the following blocks:
	* Arabic (0600—06FF, 255 characters)Arabic Supplement (0750—077F, 48 characters)
	* Arabic Extended-A (08A0—08FF, 39 characters)
	* Arabic Presentation Forms-A (FB50—FDFF, 608characters)
	* Arabic Presentation Forms-B (FE70—FEFF, 140 characters)
	*/

	/**
	* strongArabic: /[\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5-\u06E6
	* \u06EE-\u06EF\u06FA-\u06FF\u0750-\u077F\u08A0-\u08E3\u200F\u202B\u202E\u2067
	* \uFB50-\uFD3D\uFD40-\uFDCF\uFDF0-\uFDFC\uFDFE-\uFDFF\uFE70-\uFEFE]/,
	*/

	/**
	* weakArabic: /[\u0600-\u0607\u0609-\u060A\u060C\u060E-\u061A\u064B-\u066C\u0670
	* \u06D6-\u06E4\u06E7-\u06ED\u06F0-\u06F9\u08E4-\u08FF\uFD3E-\uFD3F\uFDD0-\uFDEF\uFDFD\uFEFF]/,
	*/

	/**
	* As of Unicode 7.0, the Latin script is contained in the following blocks:
	* Basic Latin, 0000–007F.
	* Latin Extended-A, 0100–017F
	* Latin Extended-B, 0180–024F
	* IPA Extensions, 0250–02AF
	* Spacing Modifier Letters, 02B0–02FF
	* Phonetic Extensions, 1D00–1D7F
	* Phonetic Extensions Supplement, 1D80–1DBF
	* Latin Extended Additional, 1E00–1EFF
	* Superscripts and Subscripts, 2070-209F
	* Letter-like Symbols, 2100–214F
	* Number Forms, 2150–218F
	* Latin Extended-C, 2C60–2C7F
	* LatinExtended-D, A720–A7FF
	* Latin Extended-E, AB30–AB6F
	* Alphabetic Presentation Forms (Latin ligatures) FB00–FB4F
	* Half-width and Full-width Forms (fullwidthLatin letters) FF00–FFEF
	*/

	/**
	* weakLatin: /[\u0000-\u0040\u005B-\u0060\u007B-\u007F\u0080-\u00A9\u00AB-\u00B4
	* \u00B6-\u00B9\u00BB-\u00BF\u00D7\u00F7\u02B9-\u02BA\u02C2-\u02CF\u02D2-\u02DF
	* \u02E5-\u02ED\u02EF-\u02FF\u2070\u2074-\u207E\u2080-\u208E\u2100-\u2101\u2103-\u2106
	* \u2108-\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A-\u213B
	* \u2140-\u2144\u214A-\u214D\u2150-\u215F\u2189\uA720-\uA721\uA788\uFF01-\uFF20
	* \uFF3B-\uFF40\uFF5B-\uFF65\uFFE0-\uFFE6\uFFE8-\uFFEE]/
	*/

	/**
	* @regex [Regex]
	* To detect (Latin digit) | (Arabic digit) | (strong Arabic letter) | (strong Latin letter).
	* Strong Latin letter is a letter which is not Arabic/Latin digit & not weak Arabic/Latin letter
	* & not strong Arabic letter.
	*/
	regex: /([0-9])|([\u0660-\u0669])|([\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FF\u0750-\u077F\u08A0-\u08E3\u200F\u202B\u202E\u2067\uFB50-\uFD3D\uFD40-\uFDCF\uFDF0-\uFDFC\uFDFE-\uFDFF\uFE70-\uFEFE]+)|([^0-9\u0660-\u0669\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FF\u0750-\u077F\u08A0-\u08E3\u200F\u202B\u202E\u2067\uFB50-\uFD3D\uFD40-\uFDCF\uFDF0-\uFDFC\uFDFE-\uFDFF\uFE70-\uFEFE\u0600-\u0607\u0609-\u060A\u060C\u060E-\u061A\u064B-\u066C\u0670\u06D6-\u06E4\u06E7-\u06ED\u06F0-\u06F9\u08E4-\u08FF\uFD3E-\uFD3F\uFDD0-\uFDEF\uFDFD\uFEFF\u0000-\u0040\u005B-\u0060\u007B-\u007F\u0080-\u00A9\u00AB-\u00B4\u00B6-\u00B9\u00BB-\u00BF\u00D7\u00F7\u02B9-\u02BA\u02C2-\u02CF\u02D2-\u02DF\u02E5-\u02ED\u02EF-\u02FF\u2070\u2074-\u207E\u2080-\u208E\u2100-\u2101\u2103-\u2106\u2108-\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A-\u213B\u2140-\u2144\u214A-\u214D\u2150-\u215F\u2189\uA720-\uA721\uA788\uFF01-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFE0-\uFFE6\uFFE8-\uFFEE]+)/g,

	/**
	* shape ( text, shaperType, textDir )
	*
	* @text [String]
	* The text to be shaped.
	*
	* @shaperType [String]
	* The type of the shaper to be used.
	* Allowed values:
	* 1."National"
	* 2."Nominal"
	* 3."Contextual"
	*
	* @textDir [String] optional
	* The direction of the input text.
	* Allowed values:
	* 1. "ltr"
	* 2. "rtl"
	* 3. "auto"
	*
	* Converts the digits in the text to European or Arabic digits according to
	* The shaperType & the textDir.
	* This function is intended to convert the digits in the input text from European
	* To Arabic & vice versa according to the shaperType & the textDir as the following:
	* 1-Arabic: if shaperType = "National".
	* 2-Arabic: if shaperType = "Contextual" & the preceding character is Arabic.
	* 3-Arabic: if shaperType = "Contextual" & textDir="rtl" & no preceding strong character.
	* 4-European: if shaperType = "Nominal".
	* 5-European: if shaperType = "Contextual" & the preceding character is English.
	* 6-European: if shaperType = "Contextual" & textDir="ltr" & no preceding strong character.
	*
	* Return The shaped string.
	*/
	shape: function( text, shaperType, textDir ) {
		if ( !text ) {
			return text;
		}

		switch ( shaperType ) {
		case "National":
			return this._shapeArabic( text );
		case "Nominal":
			return this._shapeEuropean( text );
		case "Contextual":
			return this._shapeContextual( text, textDir === "rtl" ? 2 : 1 );
		default: return text;
		}

	},

	/**
	* _shapeEuropean ( text )
	*
	* @text [String]
	* The text to be shaped.
	*
	* Converts the digits in the text to European digits.
	*
	* Return the shaped string in European format.
	* @private
	*/
	_shapeEuropean: function( text ) {
		return text.replace( /[\u0660-\u0669]/g, function( c ) {
			return c.charCodeAt( 0 ) - 1632;
		});
	},

	/**
	* _shapeArabic ( text )
	*
	* text [String]
	* The text to be shaped.
	*
	* Converts the digits in the text to Arabic digits.
	*
	* Return the shaped string in Arabic format.
	* @private
	*/
	_shapeArabic: function( text ) {
		return text.replace( /[0-9]/g, function( c ) {
			return String.fromCharCode( parseInt( c ) + 1632 );
		});
	},

	/**
	* _shapeContextual ( text, context )
	*
	* @text [String]
	* The text to be shaped.
	*
	* @context [integer]
	* The current effective context.
	* If the value is 1, the digits will shaped to European.
	* If the value is 2, the digits will shaped to Arabic.
	* Allowed values:
	* "1": European context
	* "2": Arabic context
	*
	* Converts the digits in the text to European or Arabic digits
	* According to the type of the preceding strong character.
	*
	* Return the shaped string.
	* @private
	*/
	_shapeContextual: function( text, context ) {
		return text.replace( this.regex, function( match, latinDigit, arabicDigit,
													strongArabic, strongLatin ) {
			if ( latinDigit ) {
				return context === 2 ?
						String.fromCharCode( parseInt( latinDigit ) + 1632 ) : latinDigit;
			}else if ( arabicDigit ) {
				return context === 1 ? arabicDigit.charCodeAt( 0 ) - 1632 : arabicDigit;
			}else if ( strongArabic ) {
				context = 2;
			}else if ( strongLatin ) {
				context = 1;
			}
			return match;
		});
	}
};

});
