define([
	"globalize",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"../../util",

	"globalize/number"
], function( Globalize, arNumbers, likelySubtags, numberingSystems, util ) {

function extraSetup() {
	Globalize.load( arNumbers, numberingSystems );
}

QUnit.module( ".numberShaper( [options] )", {
	setup: function() {
		Globalize.load( likelySubtags, {
			main: {
				ar: {}
			}
		});
		Globalize.locale( "ar" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.numberShaper( invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.numberShaper();
	});
});

QUnit.test( "should return shaper", function( assert ) {
	extraSetup();

	assert.equal( Globalize.numberShaper()( "123" ), "١٢٣" );
	assert.equal( Globalize.numberShaper({
		"shaperType": "National",
		"textDir": "rtl"
	})( "123" ), "١٢٣" );
});

QUnit.test( "should allow for runtime compilation", function( assert ) {
	extraSetup();

	util.assertRuntimeBind(
		assert,
		Globalize.numberShaper(),
		"b2100697309",
		"Globalize(\"ar\").numberShaper({\"shaperType\":\"National\",\"textDir\":\"auto\"," +
				"\"locale\":\"ar\",\"nuDigitsMap\":{\"0\":\"٠\",\"1\":\"١\",\"2\":\"٢\"," +
				"\"3\":\"٣\",\"4\":\"٤\",\"5\":\"٥\",\"6\":\"٦\",\"7\":\"٧\",\"8\":\"٨\",\"9\":\"٩\"}})",
		function( runtimeArgs ) {
			assert.deepEqual( runtimeArgs[ 0 ], {
				"locale": "ar",
				"nuDigitsMap": {
				    "0": "٠",
				    "1": "١",
				    "2": "٢",
				    "3": "٣",
				    "4": "٤",
				    "5": "٥",
				    "6": "٦",
				    "7": "٧",
				    "8": "٨",
				    "9": "٩"
				},
				"shaperType": "National",
				"textDir": "auto"
			});
		}
	);
});

});
