define([
	"globalize",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/plurals.json",
	"json!cldr-data/supplemental/ordinals.json",
	"../../util",

	"globalize/plural"
], function( Globalize, likelySubtags, plurals, ordinals, util ) {

function extraSetup() {
	Globalize.load( plurals );
	Globalize.load( ordinals );

	// Temporary fix due to CLDR v26 regression about pt_BR plural
	// http://unicode.org/cldr/trac/ticket/7178
	Globalize.load({
		"supplemental": {
			"plurals-type-cardinal": {
				pt: {
					"pluralRule-count-one": "i = 0,1",
					"pluralRule-count-other": ""
				}
			}
		}
	});

}

QUnit.module( ".plural( value )", {
	setup: function() {
		Globalize.load( likelySubtags, {
			main: {
				en: {}
			}
		});
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "value", function() {
		Globalize.plural();
	});

	util.assertNumberParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.plural( invalidValue );
		};
	});

	util.assertPlainObjectParameter( assert, "options", function( invalidOptions ) {
		return function() {
			Globalize.plural( 0, invalidOptions );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.plural( 1 );
	});
});

QUnit.test( "should return plural form", function( assert ) {
	extraSetup();
	assert.equal( Globalize.plural( 0 ), "other" );
	assert.equal( Globalize.plural( 0.14 ), "other" );

	assert.equal( Globalize( "en" ).plural( 0 ), "other" );
	assert.equal( Globalize( "en" ).plural( 1 ), "one" );
	assert.equal( Globalize( "en" ).plural( 2 ), "other" );
	assert.equal( Globalize( "en" ).plural( 1412 ), "other" );
	assert.equal( Globalize( "en" ).plural( 0.14 ), "other" );
	assert.equal( Globalize( "en" ).plural( 3.14 ), "other" );

	assert.equal( Globalize( "en" ).plural( 0, { type: "ordinal" } ), "other" );
	assert.equal( Globalize( "en" ).plural( 1, { type: "ordinal" } ), "one" );
	assert.equal( Globalize( "en" ).plural( 2, { type: "ordinal" } ), "two" );
	assert.equal( Globalize( "en" ).plural( 3, { type: "ordinal" } ), "few" );
	assert.equal( Globalize( "en" ).plural( 1412, { type: "ordinal" } ), "other" );
	assert.equal( Globalize( "en" ).plural( 0.14, { type: "ordinal" } ), "other" );
	assert.equal( Globalize( "en" ).plural( 3.14, { type: "ordinal" } ), "other" );

	assert.equal( Globalize( "ar" ).plural( 0 ), "zero" );
	assert.equal( Globalize( "ar" ).plural( 1 ), "one" );
	assert.equal( Globalize( "ar" ).plural( 2 ), "two" );
	assert.equal( Globalize( "ar" ).plural( 3 ), "few" );
	assert.equal( Globalize( "ar" ).plural( 6 ), "few" );
	assert.equal( Globalize( "ar" ).plural( 9 ), "few" );
	assert.equal( Globalize( "ar" ).plural( 10 ), "few" );
	assert.equal( Globalize( "ar" ).plural( 11 ), "many" );
	assert.equal( Globalize( "ar" ).plural( 15 ), "many" );
	assert.equal( Globalize( "ar" ).plural( 21 ), "many" );
	assert.equal( Globalize( "ar" ).plural( 70 ), "many" );
	assert.equal( Globalize( "ar" ).plural( 99 ), "many" );
	assert.equal( Globalize( "ar" ).plural( 100 ), "other" );
	assert.equal( Globalize( "ar" ).plural( 101 ), "other" );
	assert.equal( Globalize( "ar" ).plural( 102 ), "other" );
	assert.equal( Globalize( "ar" ).plural( 103 ), "few" );
	assert.equal( Globalize( "ar" ).plural( 111 ), "many" );
	assert.equal( Globalize( "ar" ).plural( 199 ), "many" );
	assert.equal( Globalize( "ar" ).plural( 3.14 ), "other" );

	[ 0, 1, 2, 3, 9, 10, 11, 99, 100, 101, 3.14 ].forEach(function( value ) {
		assert.equal( Globalize( "ar" ).plural( value, { type: "ordinal" } ), "other" );
	});

	assert.equal( Globalize( "ja" ).plural( 0 ), "other" );
	assert.equal( Globalize( "ja" ).plural( 1 ), "other" );
	assert.equal( Globalize( "ja" ).plural( 2 ), "other" );
	assert.equal( Globalize( "ja" ).plural( 3.14 ), "other" );

	assert.equal( Globalize( "pt" ).plural( 0 ), "one" );
	assert.equal( Globalize( "pt" ).plural( 1 ), "one" );
	assert.equal( Globalize( "pt" ).plural( 2 ), "other" );
	assert.equal( Globalize( "pt" ).plural( 0.1 ), "one" );
	assert.equal( Globalize( "pt" ).plural( 3.14 ), "other" );

	assert.equal( Globalize( "ru" ).plural( 0 ), "many" );
	assert.equal( Globalize( "ru" ).plural( 1 ), "one" );
	assert.equal( Globalize( "ru" ).plural( 2 ), "few" );
	assert.equal( Globalize( "ru" ).plural( 3 ), "few" );
	assert.equal( Globalize( "ru" ).plural( 4 ), "few" );
	assert.equal( Globalize( "ru" ).plural( 5 ), "many" );
	assert.equal( Globalize( "ru" ).plural( 6 ), "many" );
	assert.equal( Globalize( "ru" ).plural( 9 ), "many" );
	assert.equal( Globalize( "ru" ).plural( 11 ), "many" );
	assert.equal( Globalize( "ru" ).plural( 12 ), "many" );
	assert.equal( Globalize( "ru" ).plural( 19 ), "many" );
	assert.equal( Globalize( "ru" ).plural( 21 ), "one" );
	assert.equal( Globalize( "ru" ).plural( 22 ), "few" );
	assert.equal( Globalize( "ru" ).plural( 29 ), "many" );
	assert.equal( Globalize( "ru" ).plural( 3.14 ), "other" );

	assert.equal( Globalize( "zh" ).plural( 0 ), "other" );
	assert.equal( Globalize( "zh" ).plural( 1 ), "other" );
	assert.equal( Globalize( "zh" ).plural( 2 ), "other" );
	assert.equal( Globalize( "zh" ).plural( 3.14 ), "other" );
});

});
