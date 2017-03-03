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

QUnit.test( "should allow for runtime compilation", function( assert ) {
	extraSetup();

	function pad1NumberFormatter( formatter ) {
		util.assertRuntimeBind(
			assert,
			formatter,
			"a1378886668",
			"Globalize(\"en\").numberFormatter({\"raw\":\"0\"})",
			function() {}
		);
	}

	function pad2NumberFormatter( formatter ) {
		util.assertRuntimeBind(
			assert,
			formatter,
			"b203855544",
			"Globalize(\"en\").numberFormatter({\"raw\":\"00\"})",
			function() {}
		);
	}

	util.assertRuntimeBind(
		assert,
		Globalize.dateToPartsFormatter({ time: "medium" }),
		"a963207574",
		"Globalize(\"en\").dateToPartsFormatter({\"time\":\"medium\"})",
		function( runtimeArgs ) {
			pad1NumberFormatter( runtimeArgs[ 0 ][ 1 ] );
			pad2NumberFormatter( runtimeArgs[ 0 ][ 2 ] );
			assert.deepEqual( runtimeArgs[ 1 ], {
				"dayPeriods": {
					"am": "AM",
					"pm": "PM"
				},
				"pattern": "h:mm:ss a",
				"timeSeparator": ":"
			});
		}
	);

	util.assertRuntimeBind(
		assert,
		Globalize.dateToPartsFormatter({ date: "full" }),
		"b1543739875",
		"Globalize(\"en\").dateToPartsFormatter({\"date\":\"full\"})",
		function( runtimeArgs ) {
			pad1NumberFormatter( runtimeArgs[ 0 ][ 1 ] );
			assert.deepEqual( runtimeArgs[ 1 ], {
				"pattern": "EEEE, MMMM d, y",
				"timeSeparator": ":",
				"days": {
					"E": {
						"4": {
							"sun": "Sunday",
							"mon": "Monday",
							"tue": "Tuesday",
							"wed": "Wednesday",
							"thu": "Thursday",
							"fri": "Friday",
							"sat": "Saturday"
						}
					}
				},
				"months": {
					"M": {
						"4": {
							"1": "January",
							"2": "February",
							"3": "March",
							"4": "April",
							"5": "May",
							"6": "June",
							"7": "July",
							"8": "August",
							"9": "September",
							"10": "October",
							"11": "November",
							"12": "December"
						}
					}
				}
			});
		}
	);

	util.assertRuntimeBind(
		assert,
		Globalize.dateToPartsFormatter({ skeleton: "GyMMMEdhms" }),
		"a1513632567",
		"Globalize(\"en\").dateToPartsFormatter({\"skeleton\":\"GyMMMEdhms\"})",
		function( runtimeArgs ) {
			pad1NumberFormatter( runtimeArgs[ 0 ][ 1 ] );
			pad2NumberFormatter( runtimeArgs[ 0 ][ 2 ] );
			assert.deepEqual( runtimeArgs[ 1 ], {
				"dayPeriods": {
					"am": "AM",
					"pm": "PM"
				},
				"days": {
					"E": {
						"1": {
							"fri": "Fri",
							"mon": "Mon",
							"sat": "Sat",
							"sun": "Sun",
							"thu": "Thu",
							"tue": "Tue",
							"wed": "Wed"
						}
					}
				},
				"eras": {
					"0": "BC",
					"0-alt-variant": "BCE",
					"1": "AD",
					"1-alt-variant": "CE"
				},
				"months": {
					"M": {
						"3": {
							"1": "Jan",
							"10": "Oct",
							"11": "Nov",
							"12": "Dec",
							"2": "Feb",
							"3": "Mar",
							"4": "Apr",
							"5": "May",
							"6": "Jun",
							"7": "Jul",
							"8": "Aug",
							"9": "Sep"
						}
					}
				},
				"pattern": "E, MMM d, y G, h:mm:ss a",
				"timeSeparator": ":"
			});
		}
	);

	util.assertRuntimeBind(
		assert,
		Globalize.dateToPartsFormatter({ skeleton: "MMM" }),
		"b513287828",
		"Globalize(\"en\").dateToPartsFormatter({\"skeleton\":\"MMM\"})",
		function( runtimeArgs ) {
			assert.deepEqual( runtimeArgs[ 0 ], {} );
			assert.deepEqual( runtimeArgs[ 1 ], {
				"months": {
					"L": {
						"3": {
							"1": "Jan",
							"10": "Oct",
							"11": "Nov",
							"12": "Dec",
							"2": "Feb",
							"3": "Mar",
							"4": "Apr",
							"5": "May",
							"6": "Jun",
							"7": "Jul",
							"8": "Aug",
							"9": "Sep"
						}
					}
				},
				"pattern": "LLL",
				"timeSeparator": ":"
			});
		}
	);

});

});
