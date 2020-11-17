define([
	"globalize",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/pt/ca-gregorian.json",
	"json!cldr-data/main/pt/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",
	"../../util",

	"globalize/date"
], function( Globalize, enCaGregorian, enNumbers, ptCaGregorian, ptNumbers, likelySubtags,
	numberingSystems, timeData, weekData, util ) {

function assertParseDate( assert, input, options, output ) {
	assert.deepEqual( Globalize.dateParser( options )( input ), output, JSON.stringify( options ) );
}

function extraSetup() {
	Globalize.load(
		enCaGregorian,
		enNumbers,
		ptCaGregorian,
		ptNumbers,
		numberingSystems,
		timeData,
		weekData
	);
}

QUnit.module( ".dateParser( pattern )", {
	beforeEach: function() {
		Globalize.load( likelySubtags, {
			main: {
				en: {}
			}
		});
		Globalize.locale( "en" );
	},
	afterEach: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.dateParser( invalidValue );
		};
	});

	assert.throws(function() {
		Globalize.dateParser({ date: "invalid-stuff" });
	}, function( error ) {
		return error.code === "E_INVALID_OPTIONS" &&
			error.type === "date" &&
			error.value === "invalid-stuff";
	}, /E_INVALID_OPTIONS.*date.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.dateParser({ time: "invalid-stuff" });
	}, function( error ) {
		return error.code === "E_INVALID_OPTIONS" &&
			error.type === "time" &&
			error.value === "invalid-stuff";
	}, /E_INVALID_OPTIONS.*time.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.dateParser({ datetime: "invalid-stuff" });
	}, function( error ) {
		return error.code === "E_INVALID_OPTIONS" &&
			error.type === "datetime" &&
			error.value === "invalid-stuff";
	}, /E_INVALID_OPTIONS.*datetime.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.dateParser({ skeleton: "invalid-stuff" });
	}, function( error ) {
		return error.code === "E_INVALID_OPTIONS" &&
			error.type === "skeleton" &&
			error.value === "invalid-stuff";
	}, /E_INVALID_OPTIONS.*skeleton.*invalid-stuff/ );
});

QUnit.test( "should validate CLDR content", function( assert ) {
	Globalize.load({
		"main": {
			"en": {
				"dates": {
					"calendars": {
						"gregorian": {
							"dateTimeFormats": {
								"availableFormats": {
									"MMMd": "MMM d"
								}
							}
						}
					}
				}
			}
		}
	});
	util.assertCldrContent( assert, function() {
		Globalize.dateParser({ skeleton: "MMMd" } );
	});
});

QUnit.test( "should un-register event listener", function( assert ) {
	try {
		Globalize.dateParser({ skeleton: "invalid-stuff" });
	} catch ( error ) {
		assert.equal( Globalize.cldr.ee.getListeners( "get" ).length, 0 );
	}
});

QUnit.test( "should return a parser", function( assert ) {
	extraSetup();
	assertParseDate( assert, "Wed, Sep 15, 2010 AD", { skeleton: "GyMMMEd" },
		new Date( 2010, 8, 15 ) );
});

});
