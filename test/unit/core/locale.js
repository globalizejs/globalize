define([
	"cldr",
	"src/core",
	"json!fixtures/cldr/supplemental/likelySubtags.json"
], function( Cldr, Globalize, likelySubtags ) {

Cldr.load( likelySubtags );

QUnit.module( "Globalize.locale" );

QUnit.test( "should allow String locale", function( assert ) {
	var en = Globalize.locale( "en" );
	assert.equal( en.locale, "en" );
	assert.equal( en instanceof Cldr, true );
});

QUnit.test( "should allow Cldr instance to be passed as locale", function( assert ) {
	var en = new Cldr( "en" );
	assert.equal( Globalize.locale( en ).locale, "en" );
});

});
