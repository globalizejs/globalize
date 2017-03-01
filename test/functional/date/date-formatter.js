define([
	"globalize",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",
	"../../util",

	"globalize/date"
], function( Globalize, enNumbers, enCaGregorian, likelySubtags, numberingSystems, timeData,
	weekData, util ) {

var date = new Date( 2010, 8, 15, 17, 35, 7, 369 );

function extraSetup() {
	Globalize.load(
		enCaGregorian,
		enNumbers,
		numberingSystems,
		timeData,
		weekData
	);
}

QUnit.module( ".dateFormatter( pattern )", {
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
	util.assertPlainObjectParameter( assert, "options", function( invalidPattern ) {
		return function() {
			Globalize.dateFormatter( invalidPattern );
		};
	});

	assert.throws(function() {
		Globalize.dateFormatter({ date: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*date.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.dateFormatter({ time: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*time.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.dateFormatter({ datetime: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*datetime.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.dateFormatter({ skeleton: "invalid-stuff" });
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
		Globalize.dateFormatter({ skeleton: "MMMd" });
	});
});

QUnit.test( "should return a formatter", function( assert ) {
	extraSetup();

	assert.equal( Globalize.dateFormatter({ skeleton: "GyMMMEd" })( date ), "Wed, Sep 15, 2010 AD" );
	assert.equal( Globalize.dateFormatter({ skeleton: "dhms" })( date ), "15, 5:35:07 PM" );
	assert.equal( Globalize.dateFormatter({ skeleton: "GyMMMEdhms" })( date ), "Wed, Sep 15, 2010 AD, 5:35:07 PM" );
	assert.equal( Globalize.dateFormatter({ skeleton: "Ems" })( date ), "Wed, 35:07" );
	assert.equal( Globalize.dateFormatter({ skeleton: "yQQQhm" })( date ), "Q3 2010, 5:35 PM" );
});

});
