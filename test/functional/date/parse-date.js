define([
	"globalize",
	"src/date/start-of",
	"json!cldr-data/main/ar/ca-gregorian.json",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/main/ar/timeZoneNames.json",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/en/timeZoneNames.json",
	"json!cldr-data/main/pt/ca-gregorian.json",
	"json!cldr-data/main/pt/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/metaZones.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",
	"json!iana-tz-data.json",
	"../../util",

	"globalize/date"
], function( Globalize, startOf, arCaGregorian, arNumbers, arTimeZoneNames, enCaGregorian,
	enNumbers, enTimeZoneNames, ptCaGregorian, ptNumbers, likelySubtags, metaZones,
	numberingSystems, timeData, weekData, ianaTimezoneData, util ) {

var ar, date;

function extraSetup() {
	Globalize.load(
		arCaGregorian,
		arNumbers,
		arTimeZoneNames,
		enCaGregorian,
		enNumbers,
		enTimeZoneNames,
		ptCaGregorian,
		ptNumbers,
		metaZones,
		numberingSystems,
		timeData,
		weekData
	);
	Globalize.loadTimeZone( ianaTimezoneData );
}

QUnit.module( ".parseDate( value, options )", {
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

function assertParseDate( assert, input, options, output, globalize ) {
	assert.deepEqual( ( globalize || Globalize ).parseDate( input, options ), output, JSON.stringify( options ) );
}

QUnit.test( "should validate parameters (1/2)", function( assert ) {
	util.assertParameterPresence( assert, "value", function() {
		Globalize.parseDate();
	});

	util.assertStringParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.parseDate( invalidValue );
		};
	});

	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.parseDate( "15 Wed", invalidValue );
		};
	});

	assert.throws(function() {
		Globalize.parseDate( "15", { date: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*date.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.parseDate( "15", { time: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*time.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.parseDate( "15", { datetime: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*datetime.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.parseDate( "15", { skeleton: "invalid-stuff" });
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
		Globalize.parseDate( "Jan 15", { skeleton: "MMMd" } );
	});
});

QUnit.test( "should validate parameters (2/2)", function( assert ) {
	extraSetup();

	// Use the default style when passing {timeZone} only.
	assert.deepEqual( Globalize.parseDate( "5/17/2017", { timeZone: "America/Los_Angeles" } ), new Date( "2017-05-17T07:00:00.000Z" ) );

	assert.throws(function() {
		Globalize.parseDate( "15", { timeZone: "invalid-time-zone" });
	}, /E_MISSING_IANA_TZ.*Missing required IANA timezone content.*invalid-time-zone/ );
});

QUnit.test( "should parse skeleton", function( assert ) {
	extraSetup();

	ar = Globalize( "ar" );

	date = new Date();
	date.setDate( 15 );
	date = startOf( date, "day" );
	assertParseDate( assert, "15", { skeleton: "d" }, date );
	assertParseDate( assert, "15 Wed", { skeleton: "Ed" }, date );

	date = new Date();
	date.setHours( 17 );
	date.setMinutes( 35 );
	date.setSeconds( 7 );
	date = startOf( date, "second" );
	assertParseDate( assert, "Wed 5:35:07 PM", { skeleton: "Ehms" }, date );

	date = new Date();
	date.setHours( 17 );
	date.setMinutes( 35 );
	date.setSeconds( 7 );
	date.setMilliseconds(734);
	assertParseDate( assert, "Wed 5:35:07.734 PM", { skeleton: "EhmsSSS" }, date );

	date = new Date( 2010, 8, 15 );
	date = startOf( date, "day" );
	assertParseDate( assert, "Wed, Sep 15, 2010 AD", { skeleton: "GyMMMEd" }, date );
	assertParseDate( assert, "9/15/2010", { skeleton: "yMd" }, date );
	assertParseDate( assert, "الأربعاء، ١٥ سبتمبر، ٢٠١٠ م", { skeleton: "GyMMMEd" }, date, ar );

	// Loose matching: ignore control characters.
	assertParseDate( assert, "١٥/٩/٢٠١٠", { skeleton: "yMd" }, date, ar );

	date = new Date( 2010, 0 );
	date = startOf( date, "year" );
	assertParseDate( assert, "Q3 2010", { skeleton: "yQQQ" }, date );
	assertParseDate( assert, "الربع الثالث ٢٠١٠", { skeleton: "yQQQ" }, date, ar );

	// Via instance globalize.parseDate().
	assert.deepEqual( Globalize( "pt" ).parseDate( "2010 T3", { skeleton: "yQQQ" } ), date, "{ skeleton: \"yQQQ\" }" );
});

QUnit.test( "should parse time presets", function( assert ) {
	extraSetup();

	ar = Globalize( "ar" );

	date = new Date();
	date.setHours( 17 );
	date.setMinutes( 35 );
	date.setSeconds( 7 );
	date = startOf( date, "second" );
	assertParseDate( assert, "5:35:07 PM", { time: "medium" }, date );
	assertParseDate( assert, "٥:٣٥:٠٧ م", { time: "medium" }, date, ar );
	date = startOf( date, "minute" );
	assertParseDate( assert, "5:35 PM", { time: "short" }, date );
	assertParseDate( assert, "٥:٣٥ م", { time: "short" }, date, ar );
});

QUnit.test( "should parse date presets", function( assert ) {
	extraSetup();

	date = new Date( 2010, 8, 15 );
	date = startOf( date, "day" );
	assertParseDate( assert, "Wednesday, September 15, 2010", { date: "full" }, date );
	assertParseDate( assert, "September 15, 2010", { date: "long" }, date );
	assertParseDate( assert, "Sep 15, 2010", { date: "medium" }, date );
	assertParseDate( assert, "9/15/10", { date: "short" }, date );
});

QUnit.test( "should parse datetime presets", function( assert ) {
	extraSetup();

	date = new Date( 2010, 8, 15 );
	date = startOf( date, "day" );
	assertParseDate( assert, "Wednesday, September 15, 2010", { date: "full" }, date );

	date = new Date( 2010, 8, 15, 17, 35, 7 );
	date = startOf( date, "second" );
	assertParseDate( assert, "Sep 15, 2010, 5:35:07 PM", { datetime: "medium" }, date );
});

QUnit.test( "should parse raw pattern", function( assert ) {
	extraSetup();

	date = new Date( 2010, 8, 15 );
	date = startOf( date, "day" );
	assertParseDate( assert, "Wed, Sep 15, 2010 AD", { raw: "E, MMM d, y G" }, date );
});

QUnit.test( "should parse date in various timezones", function( assert ) {
	var date = new Date( "2010-09-15T16:35:07.000Z" );
	extraSetup();

	assert.deepEqual(
		Globalize.parseDate( "September 15, 2010 at 1:35:07 PM GMT-3", { datetime: "long", timeZone: "America/Sao_Paulo" } ),
		date
	);
	assert.deepEqual(
		Globalize.parseDate( "September 15, 2010 at 9:35:07 AM PDT", { datetime: "long", timeZone: "America/Los_Angeles" } ),
		date
	);
});

QUnit.test( "should parse a formatted date (reverse operation test)", function( assert ) {
	var OrigDate;

	extraSetup();

	ar = Globalize( "ar" );

	date = new Date();
	date = startOf( date, "minute" );
	assert.deepEqual( Globalize.parseDate( Globalize.formatDate( date, { datetime: "full" } ), { datetime: "full" } ), date );
	assert.deepEqual( ar.parseDate( ar.formatDate( date, { datetime: "full" } ), { datetime: "full" } ), date );

	assert.deepEqual(
		Globalize.parseDate(
			Globalize.formatDate( date, { datetime: "full", timeZone: "America/Los_Angeles" } ),
			{ datetime: "full", timeZone: "America/Los_Angeles" }
		),
		date
	);
	assert.deepEqual(
		Globalize.parseDate(
			Globalize.formatDate( date, { datetime: "long", timeZone: "America/New_York" } ),
			{ datetime: "long", timeZone: "America/New_York" }
		),
		date
	);
	assert.deepEqual(
		ar.parseDate(
			ar.formatDate( date, { datetime: "full", timeZone: "Africa/Cairo" } ),
			{ datetime: "full", timeZone: "Africa/Cairo" }
		),
		date
	);

	// Testing DST edge cases...
	// Note we can't reliably parse overlapping times (daylight to standard cases). For example, we
	// can't reliably parse "2/18/2017 11:00 PM" for America/Sao_Paulo into
	// "2017-02-19T01:00:00.000Z" or "2017-02-19T02:00:00.000Z" without providing the zone string,
	// e.g., 11:00 PM BRT or 11:00 PM BRST (both times are valid). Therefore, formatting either one
	// should return back the parsed string.
	assert.deepEqual(
		Globalize.formatDate(
			Globalize.parseDate( "2/18/2017 11:00 PM", { raw: "M/d/y h:mm a", timeZone: "America/Sao_Paulo" } ),
			{ raw: "M/d/y h:mm a", timeZone: "America/Sao_Paulo" }
		),
		"2/18/2017 11:00 PM"
	);

	// Test #689 - special test when target date and today are in different DST rules.
	// Note it was arbitrarily chosen O, other timezone patterns are supposed to pass too.
	// date1 = a DST date (or vice-versa depending on the running environment).
	// FakeDate.today = a standard time date (or vice-versa depending on the running environment).
	/* globals Date:true */
	OrigDate = Date;
	Date = util.FakeDate;
	date = new Date( 2017, 6, 1, 12, 0 );
	util.FakeDate.today = new Date( 2017, 0, 1 );
	assert.deepEqual( Globalize.parseDate( Globalize.formatDate( date, { datetime: "full" } ), { datetime: "full" } ), date );
	Date = OrigDate;
});

});
