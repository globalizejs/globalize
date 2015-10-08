define( [
	"globalize",
	"json!cldr-data/main/en/units.json",
	"json!cldr-data/main/de/units.json",
	"json!cldr-data/supplemental/plurals.json",
	"../../util",

	"globalize/unit"
], function( Globalize, enUnitFields, deUnitFields, plurals, util ) {

var de, en;

QUnit.module( ".unitFormatter( unit, options ) - no CLDR", {
	setup: function( ) {
		Globalize.load( plurals );
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function( ) {
		Globalize.unitFormatter( "day", { form: "long" } );
	});
});

QUnit.module( ".unitFormatter( unit, options )", {
	setup: function( ) {
		Globalize.load( enUnitFields, deUnitFields, plurals );
		de = new Globalize( "de" );
		en = new Globalize( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate unit argument presence", function( assert ) {
	util.assertParameterPresence( assert, "unit", function( ) {
		Globalize.unitFormatter();
	});
});

QUnit.test( "should validate unit argument is string", function( assert ) {
	util.assertStringParameter( assert, "unit", function( invalidValue ) {
		return function( ) {
			Globalize.unitFormatter( invalidValue );
		};
	});
});

QUnit.test( "should validate options argument presence", function( assert ) {
	util.assertParameterPresence( assert, "options", function( ) {
		Globalize.unitFormatter( "day" );
	});
});

QUnit.test( "should validate options argument is object", function( assert ) {
	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		Globalize.unitFormatter( "day", invalidValue );
	});
});

QUnit.test( "should format long form units", function( assert ) {
	var enFormatter = en.unitFormatter( "day", { form: "long" } ),
			deFormatter = de.unitFormatter( "day", { form: "long" } );

	assert.equal( enFormatter( 1 ), "1 day" );
	assert.equal( enFormatter( 100 ), "100 days" );

	assert.equal( deFormatter( 1 ), "1 Tag" );
	assert.equal( deFormatter( 100 ), "100 Tage" );
});

});
