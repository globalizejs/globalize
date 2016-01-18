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
	setup: function() {
		Globalize.load( enUnitFields, likelySubtags );
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.unitFormatter( "day", { form: "long" } );
	});
});

QUnit.module( ".unitFormatter( unit, options )", {
	setup: function() {
		Globalize.load( enNumbers, deNumbers, enUnitFields, deUnitFields, likelySubtags,
			numberingSystems, plurals );
		Globalize.locale( "en" );
		de = new Globalize( "de" );
		en = new Globalize( "en" );
	},
	teardown: util.resetCldrContent
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

QUnit.test( "should allow for runtime compilation", function( assert ) {
	util.assertRuntimeBind(
		assert,
		Globalize.unitFormatter( "day", { form: "long" } ),
		"b1844277225",
		"Globalize(\"en\").unitFormatter(\"day\",{\"form\":\"long\"})",
		function( runtimeArgs ) {
			util.assertRuntimeBind(
				assert,
				runtimeArgs[ 0 ],
				"b468386326",
				"Globalize(\"en\").numberFormatter({})",
				function() {}
			);
			util.assertRuntimeBind(
				assert,
				runtimeArgs[ 1 ],
				"a1662346136",
				"Globalize(\"en\").pluralGenerator({})",
				function() {}
			);
			assert.deepEqual( runtimeArgs[ 2 ], {
				"compoundUnitPattern": "{0} per {1}",
				"unitProperties": {
					"displayName": "days",
					"one": "{0} day",
					"other": "{0} days",
					"perUnitPattern": "{0} per day"
				}
			});
		}
	);
});

});
