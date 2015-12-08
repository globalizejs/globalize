define([
	"globalize",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"../../util",

	"globalize/digit-shaper"
], function( Globalize, arNumbers, likelySubtags, numberingSystems, util ) {

function extraSetup() {
	Globalize.load( arNumbers, numberingSystems );
}

QUnit.module( ".digitShaper( [options] )", {
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
			Globalize.digitShaper( invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.digitShaper();
	});
});

QUnit.test( "should return shaper", function( assert ) {
	extraSetup();

	assert.equal( Globalize.digitShaper()( "123" ), "١٢٣" );
	assert.equal( Globalize.digitShaper({
		"shaperType": "National",
		"textDir": "rtl"
	})( "123" ), "١٢٣" );
});

QUnit.test( "should allow for runtime compilation", function( assert ) {
	extraSetup();

	util.assertRuntimeBind(
		assert,
		Globalize.digitShaper(),
		"b1657750362",
		"Globalize(\"ar\").digitShaper({\"shaperType\":\"National\",\"textDir\":\"auto\",\"locale\":\"ar\"," +
		"\"nuDigitsMap\":{\"0\":\"٠\",\"٠\":\"0\",\"1\":\"١\",\"١\":\"1\",\"2\":\"٢\",\"٢\":\"2\"," +
		"\"3\":\"٣\",\"٣\":\"3\",\"4\":\"٤\",\"٤\":\"4\",\"5\":\"٥\",\"٥\":\"5\",\"6\":\"٦\",\"٦\":\"6\"," +
		"\"7\":\"٧\",\"٧\":\"7\",\"8\":\"٨\",\"٨\":\"8\",\"9\":\"٩\",\"٩\":\"9\"},\"nationalDigitsRegex\":{}})",
		function( runtimeArgs ) {
			assert.deepEqual( runtimeArgs[ 0 ], {
				"locale": "ar",
				"nationalDigitsRegex": /[٠١٢٣٤٥٦٧٨٩]/g,
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
					"9": "٩",
					"٠": "0",
					"١": "1",
					"٢": "2",
					"٣": "3",
					"٤": "4",
					"٥": "5",
					"٦": "6",
					"٧": "7",
					"٨": "8",
					"٩": "9"
				},
				"shaperType": "National",
				"textDir": "auto"
			});
		}
	);
});

});
