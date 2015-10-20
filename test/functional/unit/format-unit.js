define( [
	"globalize",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/de/numbers.json",
	"json!cldr-data/main/en/units.json",
	"json!cldr-data/main/de/units.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"json!cldr-data/supplemental/plurals.json",
	"../../util",

	"globalize/unit"
], function( Globalize, enNumbers, deNumbers, enUnitFields, deUnitFields, likelySubtags,
	numberingSystems, plurals, util ) {

var de, en;

QUnit.module( ".formatUnit( value, unit, options ) - no CLDR", {
	setup: function() {
		Globalize.load( enUnitFields, likelySubtags );
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.formatUnit( 1, "day", { form: "long" } );
	});
});

QUnit.module( ".formatUnit( value, unit, options )", {
	setup: function() {
		Globalize.load( enNumbers, deNumbers, enUnitFields, deUnitFields, likelySubtags,
			numberingSystems, plurals );
		de = new Globalize( "de" );
		en = new Globalize( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate value argument presence", function( assert ) {
	util.assertParameterPresence( assert, "value", function() {
		Globalize.formatUnit();
	});
});

QUnit.test( "should validate value argument is number", function( assert ) {
	util.assertNumberParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.formatUnit( invalidValue, "day" );
		};
	});
});

QUnit.test( "should validate unit argument presence", function( assert ) {
	util.assertParameterPresence( assert, "unit", function() {
		Globalize.formatUnit( 0 );
	});
});

QUnit.test( "should validate unit argument is string", function( assert ) {
	util.assertStringParameter( assert, "unit", function( invalidValue ) {
		return function() {
			Globalize.formatUnit( 0, invalidValue );
		};
	});
});

QUnit.test( "should validate options argument is object", function( assert ) {
	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.formatUnit( 1, "day", invalidValue );
		};
	});
});

QUnit.test( "should format units using default form", function( assert ) {
	assert.equal( en.formatUnit( 1, "day" ), "1 day" );
	assert.equal( en.formatUnit( 100, "day" ), "100 days" );

	assert.equal( de.formatUnit( 1, "day" ), "1 Tag" );
	assert.equal( de.formatUnit( 100, "day" ), "100 Tage" );
});

QUnit.test( "should format long form units", function( assert ) {
	assert.equal( en.formatUnit( 1, "day", { form: "long" } ), "1 day" );
	assert.equal( en.formatUnit( 100, "day", { form: "long" } ), "100 days" );

	assert.equal( de.formatUnit( 1, "day", { form: "long" } ), "1 Tag" );
	assert.equal( de.formatUnit( 100, "day", { form: "long" } ), "100 Tage" );
});

QUnit.test( "should format short form units", function( assert ) {
	assert.equal( en.formatUnit( 1, "second", { form: "short" } ), "1 sec" );
	assert.equal( en.formatUnit( 100, "second", { form: "short" } ), "100 sec" );
});

QUnit.test( "should format narrow form units", function( assert ) {
	assert.equal( en.formatUnit( 1, "second", { form: "narrow" } ), "1s" );
	assert.equal( en.formatUnit( 100, "second", { form: "narrow" } ), "100s" );
});

QUnit.test( "should format precomputed compound units", function( assert ) {
	assert.equal( en.formatUnit( 5, "mile-per-hour", { form: "narrow" } ), "5mph" );
});

QUnit.test( "should format computed compound units", function( assert ) {
	assert.equal( en.formatUnit( 5, "mile-per-second", { form: "narrow" } ), "5mi/s" );
});

QUnit.test( "should format precomputed compound units with '/'", function( assert ) {
	assert.equal( en.formatUnit( 5, "mile/hour", { form: "narrow" } ), "5mph" );
});

QUnit.test( "should format computed compound units with '/'", function( assert ) {
	assert.equal( en.formatUnit( 5, "mile/second", { form: "narrow" } ), "5mi/s" );
});

QUnit.test( "should format numbers correctly", function( assert ) {
	assert.equal( en.formatUnit( 55000, "mile/hour", { form: "short" } ), "55,000 mph" );
	assert.equal( de.formatUnit( 55000, "mile/hour", { form: "short" } ), "55.000 mi/h" );
});

QUnit.test( "should accept custom number formatters", function( assert ) {
	var enCustomFormatter = en.numberFormatter({ useGrouping: false }),
		deCustomFormatter = de.numberFormatter({ useGrouping: false });

	assert.equal( en.formatUnit( 55000, "mile/hour", {
		form: "short",
		numberFormatter: enCustomFormatter
	}), "55000 mph" );
	assert.equal( de.formatUnit( 55000, "mile/hour", {
		form: "short",
		numberFormatter: deCustomFormatter
	}), "55000 mi/h" );
});

});
