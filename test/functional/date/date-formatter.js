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
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.dateFormatter();
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
		Globalize.dateFormatter({ time: "medium" }),
		"a127047021",
		"Globalize(\"en\").dateFormatter({\"time\":\"medium\"})",
		function( runtimeArgs ) {
			pad1NumberFormatter( runtimeArgs[ 0 ][ 1 ] );
			pad2NumberFormatter( runtimeArgs[ 0 ][ 2 ] );
			assert.deepEqual( runtimeArgs[ 1 ], {
				"dayPeriods": {
					"afternoon1": "in the afternoon",
					"am": "AM",
					"am-alt-variant": "am",
					"evening1": "in the evening",
					"midnight": "midnight",
					"morning1": "in the morning",
					"night1": "at night",
					"noon": "noon",
					"pm": "PM",
					"pm-alt-variant": "pm"
				},
				"pattern": "h:mm:ss a",
				"timeSeparator": ":"
			});
		}
	);

	util.assertRuntimeBind(
		assert,
		Globalize.dateFormatter({ date: "full" }),
		"b641817676",
		"Globalize(\"en\").dateFormatter({\"date\":\"full\"})",
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
		Globalize.dateFormatter({ skeleton: "GyMMMEdhms" }),
		"a385327118",
		"Globalize(\"en\").dateFormatter({\"skeleton\":\"GyMMMEdhms\"})",
		function( runtimeArgs ) {
			pad1NumberFormatter( runtimeArgs[ 0 ][ 1 ] );
			pad2NumberFormatter( runtimeArgs[ 0 ][ 2 ] );
			assert.deepEqual( runtimeArgs[ 1 ], {
				"dayPeriods": {
					"afternoon1": "in the afternoon",
					"am": "AM",
					"am-alt-variant": "am",
					"evening1": "in the evening",
					"midnight": "midnight",
					"morning1": "in the morning",
					"night1": "at night",
					"noon": "noon",
					"pm": "PM",
					"pm-alt-variant": "pm"
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
		Globalize.dateFormatter({ skeleton: "MMM" }),
		"b664461195",
		"Globalize(\"en\").dateFormatter({\"skeleton\":\"MMM\"})",
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
