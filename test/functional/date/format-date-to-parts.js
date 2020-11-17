define([
	"globalize",
	"json!cldr-data/main/ar/ca-gregorian.json",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/main/ar/timeZoneNames.json",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/en/timeZoneNames.json",
	"json!cldr-data/main/pt/ca-gregorian.json",
	"json!cldr-data/main/pt/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",
	"json!iana-tz-data.json",
	"../../util",

	"globalize/date"
], function( Globalize, arCaGregorian, arNumbers, arTimeZoneNames, enCaGregorian, enNumbers,
	enTimeZoneNames, ptCaGregorian, ptNumbers, likelySubtags, numberingSystems, timeData, weekData,
	ianaTimezoneData, util ) {

var ar,
	date = new Date( 2010, 8, 15, 17, 35, 7, 369 );

function extraSetup() {
	Globalize.load(
		arCaGregorian,
		arNumbers,
		arTimeZoneNames,
		enCaGregorian,
		enNumbers,
		enTimeZoneNames,
		numberingSystems,
		ptCaGregorian,
		ptNumbers,
		timeData,
		weekData
	);
	Globalize.loadTimeZone( ianaTimezoneData );
}

QUnit.module( ".formatDateToParts( value, options )", {
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

QUnit.test( "should validate parameters (1/2)", function( assert ) {
	util.assertParameterPresence( assert, "value", function() {
		Globalize.formatDateToParts();
	});

	util.assertDateParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.formatDateToParts( invalidValue, "GyMMMEd" );
		};
	});

	util.assertPlainObjectParameter( assert, "options", function( invalidPattern ) {
		return function() {
			Globalize.formatDateToParts( date, invalidPattern );
		};
	});

	assert.throws(function() {
		Globalize.formatDateToParts(date, { date: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*date.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.formatDateToParts(date, { time: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*time.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.formatDateToParts(date, { datetime: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*datetime.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.formatDateToParts(date, { skeleton: "invalid-stuff" });
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
		Globalize.formatDateToParts( date, { skeleton: "MMMd" });
	});
});

QUnit.test( "should un-register event listener", function( assert ) {
	try {
		Globalize.formatDateToParts( date, { skeleton: "invalid-stuff" } );
	} catch ( error ) {
		assert.equal( Globalize.cldr.ee.getListeners( "get" ).length, 0 );
	}
});

QUnit.test( "should validate parameters (2/2)", function( assert ) {
	extraSetup();

	// Use the default style when passing {timeZone} only.
	assert.deepEqual( Globalize.formatDateToParts( new Date( "2010-09-15T08:00:00Z" ), { timeZone: "America/Los_Angeles" } ), [
		{ type: "month", value: "9" },
		{ type: "literal", value: "/" },
		{ type: "day", value: "15" },
		{ type: "literal", value: "/" },
		{ type: "year", value: "2010" }
	]);

	assert.throws(function() {
		Globalize.formatDateToParts( date, { timeZone: "invalid-time-zone" });
	}, /E_MISSING_IANA_TZ.*Missing required IANA timezone content.*invalid-time-zone/ );
});

QUnit.test( "should format skeleton to parts", function( assert ) {
	extraSetup();

	ar = Globalize( "ar" );

	assert.deepEqual( Globalize.formatDateToParts( date, { skeleton: "d" } ), [
		{
			"type": "day",
			"value": "15"
		}
	]);

	assert.deepEqual( Globalize.formatDateToParts( date, { skeleton: "Ed" } ), [
		{
			"type": "day",
			"value": "15"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "weekday",
			"value": "Wed"
		}
	]);

	assert.deepEqual( Globalize.formatDateToParts( date, { skeleton: "Ehms" } ), [
		{
			"type": "weekday",
			"value": "Wed"
		},
		{
			"type": "literal",
			"value": " "
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

	assert.deepEqual( Globalize.formatDateToParts( date, { skeleton: "GyMMMEd" } ), [
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

	assert.deepEqual( Globalize.formatDateToParts( date, { skeleton: "yMd" } ), [
		{
			"type": "month",
			"value": "9"
		},
		{
			"type": "literal",
			"value": "/"
		},
		{
			"type": "day",
			"value": "15"
		},
		{
			"type": "literal",
			"value": "/"
		},
		{
			"type": "year",
			"value": "2010"
		}
	]);

	assert.deepEqual( Globalize.formatDateToParts( date, { skeleton: "yQQQ" } ), [
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
		}
	]);

	assert.deepEqual( ar.formatDateToParts( date, { skeleton: "yQQQ" } ), [
		{
			"type": "quarter",
			"value": "الربع الثالث"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "year",
			"value": "٢٠١٠"
		}
	]);

	// Via instance .formatDateToParts().
	assert.deepEqual( Globalize( "pt" ).formatDateToParts( date, { skeleton: "Ehms" } ), [
		{
			"type": "weekday",
			"value": "qua"
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

	assert.deepEqual( Globalize( "pt" ).formatDateToParts( date, { skeleton: "GyMMMEd" } ), [
		{
			"type": "weekday",
			"value": "qua"
		},
		{
			"type": "literal",
			"value": ", "
		},
		{
			"type": "day",
			"value": "15"
		},
		{
			"type": "literal",
			"value": " de "
		},
		{
			"type": "month",
			"value": "set"
		},
		{
			"type": "literal",
			"value": " de "
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
			"value": "d.C."
		}
	]);
});

QUnit.test( "should format time presets", function( assert ) {
	extraSetup();

	ar = Globalize( "ar" );

	assert.deepEqual( Globalize.formatDateToParts( date, { time: "medium" } ), [
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

	assert.deepEqual( ar.formatDateToParts( date, { time: "medium" } ), [
		{
			"type": "hour",
			"value": "٥"
		},
		{
			"type": "literal",
			"value": ":"
		},
		{
			"type": "minute",
			"value": "٣٥"
		},
		{
			"type": "literal",
			"value": ":"
		},
		{
			"type": "second",
			"value": "٠٧"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "dayperiod",
			"value": "م"
		}
	]);

	assert.deepEqual( Globalize.formatDateToParts( date, { time: "short" } ), [
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

	assert.deepEqual( ar.formatDateToParts( date, { time: "short" } ), [
		{
			"type": "hour",
			"value": "٥"
		},
		{
			"type": "literal",
			"value": ":"
		},
		{
			"type": "minute",
			"value": "٣٥"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "dayperiod",
			"value": "م"
		}
	]);
});

QUnit.test( "should format date presets", function( assert ) {
	extraSetup();

	assert.deepEqual( Globalize.formatDateToParts( date, { date: "full" } ),
	[
		{
			"type": "weekday",
			"value": "Wednesday"
		},
		{
			"type": "literal",
			"value": ", "
		},
		{
			"type": "month",
			"value": "September"
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
		}
	]);

	assert.deepEqual( Globalize.formatDateToParts( date, { date: "long" } ),
	[
		{
			"type": "month",
			"value": "September"
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
		}
	]);

	assert.deepEqual( Globalize.formatDateToParts( date, { date: "medium" } ),
	[
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
		}
	]);

	assert.deepEqual( Globalize.formatDateToParts( date, { date: "short" } ), [
		{
			"type": "month",
			"value": "9"
		},
		{
			"type": "literal",
			"value": "/"
		},
		{
			"type": "day",
			"value": "15"
		},
		{
			"type": "literal",
			"value": "/"
		},
		{
			"type": "year",
			"value": "10"
		}
	]);
});

QUnit.test( "should format datetime presets", function( assert ) {
	extraSetup();

	assert.deepEqual( Globalize.formatDateToParts( date, { datetime: "medium" } ), [
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
});

QUnit.test( "should format raw patterns", function( assert ) {
	extraSetup();

	assert.deepEqual( Globalize.formatDateToParts( date, { raw: "E, MMM d, y G" } ), [
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
});

});
