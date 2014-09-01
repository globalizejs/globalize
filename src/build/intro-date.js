/*!
 * Globalize v@VERSION
 *
 * http://github.com/jquery/globalize
 *
 * Copyright 2010, 2014 jQuery Foundation, Inc. and other contributors
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
			"../globalize",
			"cldr/event",
			"cldr/supplemental"
		], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require( "cldrjs" ), require( "globalize" ) );
	} else {

		// Extend global
		factory( root.Cldr, root.Globalize );
	}
}(this, function( Cldr, Globalize ) {

var alwaysArray = Globalize._alwaysArray,
	createError = Globalize._createError,
	formatMessage = Globalize._formatMessage,
	isPlainObject = Globalize._isPlainObject,
	validateCldr = Globalize._validateCldr,
	validateDefaultLocale = Globalize._validateDefaultLocale,
	validateParameterPresence = Globalize._validateParameterPresence,
	validateParameterType = Globalize._validateParameterType;
