define([
	"cldr",
	"src/core",
	"json!cldr-data/supplemental/likelySubtags.json",

	"cldr/event"
], function( Cldr, Globalize, likelySubtags ) {

Cldr.load( likelySubtags, {
	supplemental: {
		likelySubtags: {

			// The below are fictitious locales for the purpose of this test.
			// Note to self: don't use zz, Zzzz or ZZ. These are reserved subtags.
			"xx": "xx-Xxxx-XX",
			"yy": "yy-Xxxx-YY"
		}
	},
	main: {
		"de-CH": {},
		en: {},
		"en-GB": {},
		"pa-Arab": {},
		"sr-Cyrl": {},
		"sr-Latn": {},
		"uz-Arab": {},
		"xx": {},
		"yy-YY": {},
		"zh": {},
		"zh-Hant": {}
	}
});

QUnit.module( "Globalize (constructor)" );

QUnit.test( "should allow String locale", function( assert ) {
	var en = new Globalize( "en" );
	assert.ok( en instanceof Globalize );
	assert.equal( en.cldr.locale, "en" );
});

QUnit.test( "should allow Cldr instance to be passed as locale", function( assert ) {
	var en = Globalize( new Cldr( "en" ) );
	assert.ok( en instanceof Globalize );
	assert.equal( en.cldr.locale, "en" );
});

QUnit.test( "should lookup bundle", function( assert ) {
	assert.equal( Globalize( "de-Latn-CH" ).cldr.attributes.bundle, "de-CH" );
	assert.equal( Globalize( "en" ).cldr.attributes.bundle, "en" );
	assert.equal( Globalize( "en-GB" ).cldr.attributes.bundle, "en-GB" );
	assert.equal( Globalize( "en-Latn-GB" ).cldr.attributes.bundle, "en-GB" );
	assert.equal( Globalize( "pa-Arab" ).cldr.attributes.bundle, "pa-Arab" );
	assert.equal( Globalize( "pa-PK" ).cldr.attributes.bundle, "pa-Arab" );
	assert.equal( Globalize( "sr" ).cldr.attributes.bundle, "sr-Cyrl" );
	assert.equal( Globalize( "sr-Cyrl" ).cldr.attributes.bundle, "sr-Cyrl" );
	assert.equal( Globalize( "sr-Latn" ).cldr.attributes.bundle, "sr-Latn" );
	assert.equal( Globalize( "sr-Latn-RS" ).cldr.attributes.bundle, "sr-Latn" );
	assert.equal( Globalize( "sr-RS" ).cldr.attributes.bundle, "sr-Cyrl" );
	assert.equal( Globalize( "uz-AF" ).cldr.attributes.bundle, "uz-Arab" );
	assert.equal( Globalize( "uz-Arab" ).cldr.attributes.bundle, "uz-Arab" );
	assert.equal( Globalize( "zh" ).cldr.attributes.bundle, "zh" );
	assert.equal( Globalize( "zh-CN" ).cldr.attributes.bundle, "zh" );
	assert.equal( Globalize( "zh-Hans" ).cldr.attributes.bundle, "zh" );
	assert.equal( Globalize( "zh-Hant" ).cldr.attributes.bundle, "zh-Hant" );
	assert.equal( Globalize( "zh-TW" ).cldr.attributes.bundle, "zh-Hant" );

	// Simulate loading `en` main dataset. Both instances `en` or `en-US` will use
	// `en` bundle.
	assert.equal( Globalize( "xx" ).cldr.attributes.bundle, "xx" );
	assert.equal( Globalize( "xx-XX" ).cldr.attributes.bundle, "xx" );

	// Simulate loading `en-US` main dataset. Both instances `en` or `en-US` will use
	// `en-US` bundle.
	assert.equal( Globalize( "yy" ).cldr.attributes.bundle, "yy-YY" );
	assert.equal( Globalize( "yy-YY" ).cldr.attributes.bundle, "yy-YY" );
	assert.deepEqual( Globalize( "xx-XZ" ).cldr.attributes.bundle, null );
});

});
