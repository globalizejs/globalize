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
		"de-CH": {
			"test-bundle": "de-CH"
		},
		en: {
			"test-bundle": "en"
		},
		"en-GB": {
			"test-bundle": "en-GB"
		},
		"pa-Arab": {
			"test-bundle": "pa-Arab"
		},
		"sr-Cyrl": {
			"test-bundle": "sr-Cyrl"
		},
		"sr-Latn": {
			"test-bundle": "sr-Latn"
		},
		"uz-Arab": {
			"test-bundle": "uz-Arab"
		},
		"xx": {
			"test-bundle": "xx"
		},
		"yy-YY": {
			"test-bundle": "yy-YY"
		},
		"zh": {
			"test-bundle": "zh"
		},
		"zh-Hant": {
			"test-bundle": "zh-Hant"
		}
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
	assert.equal( Globalize( "de-Latn-CH" ).cldr.main( "test-bundle" ), "de-CH" );
	assert.equal( Globalize( "en" ).cldr.main( "test-bundle" ), "en" );
	assert.equal( Globalize( "en-GB" ).cldr.main( "test-bundle" ), "en-GB" );
	assert.equal( Globalize( "en-Latn-GB" ).cldr.main( "test-bundle" ), "en-GB" );
	assert.equal( Globalize( "pa-Arab" ).cldr.main( "test-bundle" ), "pa-Arab" );
	assert.equal( Globalize( "pa-PK" ).cldr.main( "test-bundle" ), "pa-Arab" );
	assert.equal( Globalize( "sr" ).cldr.main( "test-bundle" ), "sr-Cyrl" );
	assert.equal( Globalize( "sr-Cyrl" ).cldr.main( "test-bundle" ), "sr-Cyrl" );
	assert.equal( Globalize( "sr-Latn" ).cldr.main( "test-bundle" ), "sr-Latn" );
	assert.equal( Globalize( "sr-Latn-RS" ).cldr.main( "test-bundle" ), "sr-Latn" );
	assert.equal( Globalize( "sr-RS" ).cldr.main( "test-bundle" ), "sr-Cyrl" );
	assert.equal( Globalize( "uz-AF" ).cldr.main( "test-bundle" ), "uz-Arab" );
	assert.equal( Globalize( "uz-Arab" ).cldr.main( "test-bundle" ), "uz-Arab" );
	assert.equal( Globalize( "zh" ).cldr.main( "test-bundle" ), "zh" );
	assert.equal( Globalize( "zh-CN" ).cldr.main( "test-bundle" ), "zh" );
	assert.equal( Globalize( "zh-Hans" ).cldr.main( "test-bundle" ), "zh" );
	assert.equal( Globalize( "zh-Hant" ).cldr.main( "test-bundle" ), "zh-Hant" );
	assert.equal( Globalize( "zh-TW" ).cldr.main( "test-bundle" ), "zh-Hant" );

	// Simulate loading `en` main dataset. Both instances `en` or `en-US` will use
	// `en` bundle.
	assert.equal( Globalize( "xx" ).cldr.main( "test-bundle" ), "xx" );
	assert.equal( Globalize( "xx-XX" ).cldr.main( "test-bundle" ), "xx" );

	// Simulate loading `en-US` main dataset. Both instances `en` or `en-US` will use
	// `en-US` bundle.
	assert.equal( Globalize( "yy" ).cldr.main( "test-bundle" ), "yy-YY" );
	assert.equal( Globalize( "yy-YY" ).cldr.main( "test-bundle" ), "yy-YY" );

	assert.throws(function() {
		Globalize( "xx-XZ" ).cldr.main( "test-bundle" );
	}, function E_MISSING_BUNDLE( error ) {
		return error.code === "E_MISSING_BUNDLE" && error.locale === "xx-XZ";
	});
});

});
