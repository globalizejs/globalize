/*!
 * Globalize v@VERSION
 *
 * http://github.com/jquery/globalize
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: @DATE
 */
(function( root, factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define( [ "cldr", "../globalize" ], factory );
	} else if ( typeof module === "object" && typeof module.exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require( "cldr.js" ), require( "globalize" ) );
	} else {

		// Global
		factory( Cldr, Globalize );
	}
}( this, function( Cldr, Globalize ) {
