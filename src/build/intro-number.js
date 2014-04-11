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

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define([
			"cldr",
			"../globalize"
		], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require( "cldrjs" ), require( "globalize" ) );
	} else {

		// Global
		factory( root.Cldr, root.Globalize );
	}
}(this, function( Cldr, Globalize ) {
