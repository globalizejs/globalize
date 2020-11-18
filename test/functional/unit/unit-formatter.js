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

QUnit.module( ".unitFormatter( unit, options ) - no CLDR", {
	beforeEach: function() {
		Globalize.load( enUnitFields, likelySubtags );
		Globalize.locale( "en" );
	},
	afterEach: util.resetCldrContent
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.unitFormatter( "day", { form: "long" } );
	});
});

QUnit.module( ".unitFormatter( unit, options )", {
	beforeEach: function() {
		Globalize.load( enNumbers, deNumbers, enUnitFields, deUnitFields, likelySubtags,
			numberingSystems, plurals );
		Globalize.locale( "en" );
		de = new Globalize( "de" );
		en = new Globalize( "en" );
	},
	afterEach: util.resetCldrContent
});

QUnit.test( "should validate unit argument presence", function( assert ) {
	util.assertParameterPresence( assert, "unit", function() {
		Globalize.unitFormatter();
	});
});

QUnit.test( "should validate unit argument is string", function( assert ) {
	util.assertStringParameter( assert, "unit", function( invalidValue ) {
		return function() {
			Globalize.unitFormatter( invalidValue );
		};
	});
});

QUnit.test( "should validate options argument is object", function( assert ) {
	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.unitFormatter( "day", invalidValue );
		};
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

QUnit.test( "should format numbers correctly", function( assert ) {
	var enFormatter = en.unitFormatter( "day", { form: "long" } ),
		deFormatter = de.unitFormatter( "day", { form: "long" } );

	assert.equal( enFormatter( 10000 ), "10,000 days" );
	assert.equal( deFormatter( 10000 ), "10.000 Tage" );
});

QUnit.test( "should accept custom number formatter", function( assert ) {
	var enCustomFormatter = en.numberFormatter({ maximumFractionDigits: 2 }),
		deCustomFormatter = de.numberFormatter({ maximumFractionDigits: 2 }),
		enUnitFormatter = en.unitFormatter( "meter", {
			form: "long", numberFormatter: enCustomFormatter
		}),
		deUnitFormatter = de.unitFormatter( "meter", {
			form: "long", numberFormatter: deCustomFormatter
		});

	assert.equal( enUnitFormatter( 3.14159 ), "3.14 meters" );
	assert.equal( deUnitFormatter( 3.14159 ), "3,14 Meter" );
});

QUnit.test( "should generate different runtime key when using different numberFormatter", function( assert ) {
	var formatter1 = Globalize.unitFormatter( "hour", { numberFormatter: Globalize.numberFormatter( { minimumIntegerDigits: 1 } ) });
	var formatter2 = Globalize.unitFormatter( "hour", { numberFormatter: Globalize.numberFormatter( { minimumIntegerDigits: 2 } ) });
	assert.notEqual( formatter1.runtimeKey, formatter2.runtimeKey );
});
});
