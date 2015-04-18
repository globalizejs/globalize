define([
	"globalize",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/es/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"../../util",

	"globalize/number"
], function( Globalize, arNumbers, enNumbers, esNumbers, likelySubtags, util ) {

var pi = 3.14159265359;

function extraSetup() {
	Globalize.load(
		arNumbers,
		enNumbers,
		esNumbers
	);
}

QUnit.module( ".numberFormatter( [options] )", {
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
	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.numberFormatter( invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.numberFormatter();
	});
});

QUnit.test( "should validate options", function( assert ) {
	extraSetup();

	util.assertParameterRange( assert, 1, 21, function( num ) {
		Globalize.numberFormatter({
			maximumSignificantDigits: 1,
			minimumSignificantDigits: num
		});
	});
	util.assertParameterRange( assert, 1, 21, function( num ) {
		Globalize.numberFormatter({
			maximumSignificantDigits: num,
			minimumSignificantDigits: 1
		});
	});
	util.assertParameterRange( assert, 1, 21, function( num ) {
		Globalize.numberFormatter({ minimumIntegerDigits: num } );
	});
	util.assertParameterRange( assert, 0, 20, function( num ) {
		Globalize.numberFormatter({ minimumFractionDigits: num } );
	});
	util.assertParameterRange( assert, 0, 20, function( num ) {
		Globalize.numberFormatter({ maximumFractionDigits: num } );
	});
});

QUnit.test( "should return a formatter", function( assert ) {
	extraSetup();

	assert.equal( Globalize.numberFormatter()( pi ), "3.142" );
});

QUnit.test( "should allow for runtime compilation", function( assert ) {
	extraSetup();

	util.assertRuntimeBind(
		assert,
		Globalize.numberFormatter(),
		"b468386326",
		"Globalize(\"en\").numberFormatter({})",
		function( runtimeArgs ) {
			assert.equal( JSON.stringify( runtimeArgs[ 0 ] ), "[\"\",null,1,0,3,null,null," +
				"null,3,null,\"\",\"#,##0.###\",\"-#,##0.###\",\"-\",\"\",null,\"∞\",\"NaN\",{" +
				"\".\":\".\",\",\":\",\",\"%\":\"%\",\"+\":\"+\",\"-\":\"-\",\"E\":\"E\",\"‰\":" +
				"\"‰\"},null]"
			);
			assert.ok( "generatorString" in runtimeArgs[ 0 ][ 15 ] );
			assert.equal( runtimeArgs[ 0 ][ 15 ].generatorString(), "numberRound()" );
		}
	);

	util.assertRuntimeBind(
		assert,
		Globalize.numberFormatter({
			minimumFractionDigits: 2,
			maximumFractionDigits: 5,
			round: "floor"
		}),
		"b533554001",
		"Globalize(\"en\").numberFormatter({\"minimumFractionDigits\":2,\"maximumFractionDigits" +
			"\":5,\"round\":\"floor\"})",
		function( runtimeArgs ) {
			assert.equal( JSON.stringify( runtimeArgs[ 0 ] ), "[\"\",null,1,2,5,null,null,null,3" +
				",null,\"\",\"#,##0.###\",\"-#,##0.###\",\"-\",\"\",null,\"∞\",\"NaN\",{\".\":" +
				"\".\",\",\":\",\",\"%\":\"%\",\"+\":\"+\",\"-\":\"-\",\"E\":\"E\",\"‰\":\"‰\"" +
				"},null]"
			);
			assert.ok( "generatorString" in runtimeArgs[ 0 ][ 15 ] );
			assert.equal( runtimeArgs[ 0 ][ 15 ].generatorString(), "numberRound(\"floor\")" );
		}
	);
});

});
