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
	"json!cldr-data/supplemental/numberingSystems.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",
	"../../util",

	"globalize/date"
], function( Globalize, startOf, arCaGregorian, arNumbers, arTimeZoneNames, enCaGregorian,
	enNumbers, enTimeZoneNames, ptCaGregorian, ptNumbers, likelySubtags, numberingSystems, timeData,
	weekData, util ) {

var ar, date;

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
}

QUnit.module( ".parseDate( value, options )", {
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

function assertParseDate( assert, input, options, output, globalize ) {
	assert.deepEqual( ( globalize || Globalize ).parseDate( input, options ), output, JSON.stringify( options ) );
}

QUnit.test( "should validate parameters", function( assert ) {
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
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.parseDate( "15" );
	});
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

	date = new Date( 2010, 8, 15 );
	date = startOf( date, "day" );
	assertParseDate( assert, "Wed, Sep 15, 2010 AD", { skeleton: "GyMMMEd" }, date );
	assertParseDate( assert, "9/15/2010", { skeleton: "yMd" }, date );
	assertParseDate( assert, "الأربعاء، ١٥ سبتمبر، ٢٠١٠ م", { skeleton: "GyMMMEd" }, date, ar );

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
	assertParseDate( assert, "٥،٣٥،٠٧ م", { time: "medium" }, date, ar );
	date = startOf( date, "minute" );
	assertParseDate( assert, "5:35 PM", { time: "short" }, date );
	assertParseDate( assert, "٥،٣٥ م", { time: "short" }, date, ar );
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

QUnit.test( "should parse a formatted date (reverse operation test)", function( assert ) {
	extraSetup();

	ar = Globalize( "ar" );

	date = new Date();
	date = startOf( date, "minute" );
	assert.deepEqual( Globalize.parseDate( Globalize.formatDate( date, { datetime: "full" } ), { datetime: "full" } ), date );
	assert.deepEqual( ar.parseDate( ar.formatDate( date, { datetime: "full" } ), { datetime: "full" } ), date );
});

});
