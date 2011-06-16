/*!
 * GlobalizeJS v@VERSION
 *
 * http://github.com/jquery/jquery-global
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function( window, undefined ) {
	
var Globalize = (function() {

	// Define a local copy of Globalize
	var Globalize = function( culture ) {
		return new Globalize.fn.init( culture );
	};
	
	Globalize.culture = "en";
	
	Globalize.parseInt = function( value, radix, culture ) {
		return Math.floor( Globalize.parseFloat(value, radix, culture) );
	}
	
	Globalize.parseFloat = function( value, radix, culture ) {
		// radix argument is optional
		if ( typeof radix !== "number" ) {
			culture = radix;
			radix = 10;
		}
		culture = culture || this.culture;
		// TODO - globalize
		return parseFloat( value, radix );
	}

	Globalize.fn = Globalize.prototype = {
		constructor: Globalize,
		init: function( culture ) {
			this.culture = culture;
			return this;
		},
		
		parseInt: function( value, radix, culture ) {
			// radix argument is optional
			if ( typeof radix !== "number" ) {
				culture = radix;
				radix = 10;
			}
			culture = culture || this.culture;				
			return Globalize.parseInt( value, radix, culture );
		},
		
		parseFloat: function( value, radix, culture ) {
			// radix argument is optional
			if ( typeof radix !== "number" ) {
				culture = radix;
				radix = 10;
			}
			culture = culture || this.culture;
			return Globalize.parseFloat( value, radix, culture );
		}
	};
	
	Globalize.fn.init.prototype = Globalize.prototype;

	return Globalize;
}());

// Expose the API as global variables, unless an 'exports'
// object exists, in that case we assume we're in CommonJS
if ( typeof exports === "undefined" || typeof require === "undefined" ) {
	window.Globalize = Globalize;
} else {
	exports.Globalize = Globalize;
}

}( this ));
