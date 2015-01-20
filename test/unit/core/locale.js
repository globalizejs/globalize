define([
	"cldr",
	"src/core",
	"json!cldr-data/supplemental/likelySubtags.json",

	"cldr/event"
], function( Cldr, Globalize, likelySubtags ) {

Cldr.load( likelySubtags );

QUnit.module( "Globalize.locale" );

QUnit.test( "should allow String locale", function( assert ) {
	Globalize.locale( "en" );
	assert.ok( Globalize.cldr instanceof Cldr );
	assert.equal( Globalize.cldr.locale, "en" );
});

QUnit.test( "should allow Cldr instance to be passed as locale", function( assert ) {
	Globalize.locale( new Cldr( "pt" ) );
	assert.ok( Globalize.cldr instanceof Cldr );
	assert.equal( Globalize.cldr.locale, "pt" );
});

});
