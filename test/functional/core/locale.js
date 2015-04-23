define([
	"globalize",
	"../../util",

	"globalize/date",
	"globalize/message",
	"globalize/number"
], function( Globalize, util ) {

QUnit.module( "Globalize.locale( [locale|cldr] )" );

QUnit.test( "should validate parameters", function( assert ) {
	util.assertLocaleOrNullParameter( assert, "locale", function( invalidValue ) {
		return function() {
			Globalize.locale( invalidValue );
		};
	});
});

QUnit.test( "should validate whether default locale is defined on static calls", function( assert ) {

	// Ensure default locale is not set.
	delete Globalize.cldr;

	util.assertDefaultLocalePresence( assert, function() {
		Globalize.formatDate( new Date() );
	});

	util.assertDefaultLocalePresence( assert, function() {
		Globalize.parseDate( "15" );
	});

	util.assertDefaultLocalePresence( assert, function() {
		Globalize.formatNumber( 3 );
	});

	util.assertDefaultLocalePresence( assert, function() {
		Globalize.parseNumber( "3" );
	});

	util.assertDefaultLocalePresence( assert, function() {
		Globalize.formatMessage( "amen" );
	});
});

});
