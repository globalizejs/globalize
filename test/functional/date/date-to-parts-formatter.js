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

QUnit.module( ".dateToPartsFormatter( pattern )", {
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
			Globalize.dateToPartsFormatter( invalidPattern );
		};
	});

	assert.throws(function() {
		Globalize.dateToPartsFormatter({ date: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*date.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.dateToPartsFormatter({ time: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*time.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.dateToPartsFormatter({ datetime: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*datetime.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.dateToPartsFormatter({ skeleton: "invalid-stuff" });
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
		Globalize.dateToPartsFormatter({ skeleton: "MMMd" });
	});
});

QUnit.test( "should return a formatter", function( assert ) {
	extraSetup();

	assert.deepEqual( Globalize.dateToPartsFormatter({ skeleton: "GyMMMEd" })( date ), [
		{
			"type": "weekday",
			"value": "Wed"
		},
		{
			"type": "literal",
			"value": ", "
		},
		{
			"type": "month",
			"value": "Sep"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "day",
			"value": "15"
		},
		{
			"type": "literal",
			"value": ", "
		},
		{
			"type": "year",
			"value": "2010"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "era",
			"value": "AD"
		}
	]); 
	 assert.deepEqual( Globalize.dateToPartsFormatter({ skeleton: "dhms" })( date ), [
		{
			"type": "day",
			"value": "15"
		},
		{
			"type": "literal",
			"value": ", "
		},
		{
			"type": "hour",
			"value": "5"
		},
		{
			"type": "literal",
			"value": ":"
		},
		{
			"type": "minute",
			"value": "35"
		},
		{
			"type": "literal",
			"value": ":"
		},
		{
			"type": "second",
			"value": "07"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "dayperiod",
			"value": "PM"
		}
	]);   
	assert.deepEqual( Globalize.dateToPartsFormatter({ skeleton: "GyMMMEdhms" })( date ), [
		{
			"type": "weekday",
			"value": "Wed"
		},
		{
			"type": "literal",
			"value": ", "
		},
		{
			"type": "month",
			"value": "Sep"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "day",
			"value": "15"
		},
		{
			"type": "literal",
			"value": ", "
		},
		{
			"type": "year",
			"value": "2010"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "era",
			"value": "AD"
		},
		{
			"type": "literal",
			"value": ", "
		},
		{
			"type": "hour",
			"value": "5"
		},
		{
			"type": "literal",
			"value": ":"
		},
		{
			"type": "minute",
			"value": "35"
		},
		{
			"type": "literal",
			"value": ":"
		},
		{
			"type": "second",
			"value": "07"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "dayperiod",
			"value": "PM"
		}
	]);
	assert.deepEqual( Globalize.dateToPartsFormatter({ skeleton: "Ems" })( date ), [
		{
			"type": "weekday",
			"value": "Wed"
		},
		{
			"type": "literal",
			"value": ", "
		},
		{
			"type": "minute",
			"value": "35"
		},
		{
			"type": "literal",
			"value": ":"
		},
		{
			"type": "second",
			"value": "07"
		}
	]);
	assert.deepEqual( Globalize.dateToPartsFormatter({ skeleton: "yQQQhm" })( date ), [
		{
			"type": "quarter",
			"value": "Q3"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "year",
			"value": "2010"
		},
		{
			"type": "literal",
			"value": ", "
		},
		{
			"type": "hour",
			"value": "5"
		},
		{
			"type": "literal",
			"value": ":"
		},
		{
			"type": "minute",
			"value": "35"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "dayperiod",
			"value": "PM"
		}
	]);
});

});
