/**
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
/*!
 * Globalize v@VERSION @DATE Released under the MIT license
 * http://git.io/TrdQbw
 */
(function( root, factory ) {
	if ( typeof define === "function" && define.amd ) {
		define([
			"../globalize"
		], factory );
	} else if ( typeof exports === "object" ) {
		module.exports = factory( require( require( "globalize" ) ) );
	} else {
		factory( root.Globalize );
	}
}(this, function( Globalize ) {

