define([
	"src/core",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"cldr/unresolved",
	"src/message"
], function( Globalize, likelySubtags ) {

Globalize.load( likelySubtags );
Globalize.loadTranslations({
	root: {
		amen: "Amen"
	},
	pt: {
		amen: "Amém"
	},
	zh: {
		amen: "阿门"
	},
	en: {
		greetings: {
			hello: "Hello"
		}
	}
});

QUnit.module( "Translate" );

QUnit.test( "should return the loaded translation", function( assert ) {
	assert.equal( Globalize( "pt" ).translate( "amen" ), "Amém" );
	assert.equal( Globalize( "zh" ).translate( "amen" ), "阿门" );
});

QUnit.test( "should traverse the translation data", function( assert ) {
	assert.equal( Globalize( "en" ).translate( "greetings/hello" ), "Hello" );
	assert.equal( Globalize( "en" ).translate([ "greetings", "hello" ]), "Hello" );
});

QUnit.test( "should return inherited translation if cldr/unresolved is loaded", function( assert ) {
	assert.equal( Globalize( "en" ).translate( "amen" ), "Amen" );
	assert.equal( Globalize( "de" ).translate( "amen" ), "Amen" );
	assert.equal( Globalize( "en-GB" ).translate( "amen" ), "Amen" );
	assert.equal( Globalize( "fr" ).translate( "amen" ), "Amen" );
	assert.equal( Globalize( "pt-PT" ).translate( "amen" ), "Amém" );
});

});
