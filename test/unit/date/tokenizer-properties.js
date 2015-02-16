define([
	"cldr",
	"src/date/tokenizer-properties",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/supplemental/likelySubtags.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, tokenizerProperties, enCaGregorian, likelySubtags ) {

var cldr;

Cldr.load( enCaGregorian, likelySubtags );

cldr = new Cldr( "en" );

QUnit.module( "Date Tokenizer Properties" );

/**
 *  Era
 */

QUnit.test( "should return properties for era (G..GGGGG)", function( assert ) {
	[ "G", "GG", "GGG" ].forEach(function( pattern ) {
		assert.ok( "gregorian/eras/eraAbbr" in tokenizerProperties( pattern, cldr ) );
	});
	assert.ok( "gregorian/eras/eraNames" in tokenizerProperties( "GGGG", cldr ) );
	assert.ok( "gregorian/eras/eraNarrow" in tokenizerProperties( "GGGGG", cldr ) );
});

/**
 *  Quarter
 */

QUnit.test( "should return properties for quarter (QQQ..QQQQQ)", function( assert ) {
	assert.ok( "gregorian/quarters/format/abbreviated" in tokenizerProperties( "QQQ", cldr ) );
	assert.ok( "gregorian/quarters/format/wide" in tokenizerProperties( "QQQQ", cldr ) );
	assert.ok( "gregorian/quarters/format/narrow" in tokenizerProperties( "QQQQQ", cldr ) );
});

QUnit.test( "should return properties for quarter (qqq..qqqqq)", function( assert ) {
	assert.ok( "gregorian/quarters/stand-alone/abbreviated" in tokenizerProperties( "qqq", cldr ) );
	assert.ok( "gregorian/quarters/stand-alone/wide" in tokenizerProperties( "qqqq", cldr ) );
	assert.ok( "gregorian/quarters/stand-alone/narrow" in tokenizerProperties( "qqqqq", cldr ) );
});

/**
 *  Month
 */

QUnit.test( "should return properties for month (MMM..MMMMM)", function( assert ) {
	assert.ok( "gregorian/months/format/abbreviated" in tokenizerProperties( "MMM", cldr ) );
	assert.ok( "gregorian/months/format/wide" in tokenizerProperties( "MMMM", cldr ) );
	assert.ok( "gregorian/months/format/narrow" in tokenizerProperties( "MMMMM", cldr ) );
});

QUnit.test( "should return properties for month (LL..LLLLL)", function( assert ) {
	assert.ok( "gregorian/months/stand-alone/abbreviated" in tokenizerProperties( "LLL", cldr ) );
	assert.ok( "gregorian/months/stand-alone/wide" in tokenizerProperties( "LLLL", cldr ) );
	assert.ok( "gregorian/months/stand-alone/narrow" in tokenizerProperties( "LLLLL", cldr ) );
});

/**
 *  Week day
 */

QUnit.test( "should return properties for day of week (eee..eeeeee)", function( assert ) {
	assert.ok( "gregorian/days/format/abbreviated" in tokenizerProperties( "eee", cldr ) );
	assert.ok( "gregorian/days/format/wide" in tokenizerProperties( "eeee", cldr ) );
	assert.ok( "gregorian/days/format/narrow" in tokenizerProperties( "eeeee", cldr ) );
	assert.ok( "gregorian/days/format/short" in tokenizerProperties( "eeeeee", cldr ) );
});

QUnit.test( "should return properties for day of week (ccc..cccccc)", function( assert ) {
	assert.ok( "gregorian/days/stand-alone/abbreviated" in tokenizerProperties( "ccc", cldr ) );
	assert.ok( "gregorian/days/stand-alone/wide" in tokenizerProperties( "cccc", cldr ) );
	assert.ok( "gregorian/days/stand-alone/narrow" in tokenizerProperties( "ccccc", cldr ) );
	assert.ok( "gregorian/days/stand-alone/short" in tokenizerProperties( "cccccc", cldr ) );
});

QUnit.test( "should return properties for day of week (E..EEEEEE)", function( assert ) {
	[ "E", "EE", "EEE" ].forEach(function( pattern ) {
		assert.ok( "gregorian/days/format/abbreviated" in tokenizerProperties( pattern, cldr ) );
	});
	assert.ok( "gregorian/days/format/wide" in tokenizerProperties( "EEEE", cldr ) );
	assert.ok( "gregorian/days/format/narrow" in tokenizerProperties( "EEEEE", cldr ) );
	assert.ok( "gregorian/days/format/short" in tokenizerProperties( "EEEEEE", cldr ) );
});

/**
 *  Period
 */

QUnit.test( "should tokenize period (a)", function( assert ) {
	assert.ok( "gregorian/dayPeriods/format/wide" in tokenizerProperties( "a", cldr ) );
});

});
