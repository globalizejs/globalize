define([
	"cldr",
	"src/date/tokenizer-properties",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/main/en/timeZoneNames.json",
	"json!cldr-data/main/en-GB/ca-gregorian.json",
	"json!cldr-data/main/en-GB/timeZoneNames.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/metaZones.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, tokenizerProperties, enCaGregorian, enTimeZoneNames, enGbCaGregorian,
	enGbTimeZoneNames, likelySubtags, metaZones ) {

var cldr;

Cldr.load(
	enCaGregorian,
	enTimeZoneNames,
	enGbCaGregorian,
	enGbTimeZoneNames,
	likelySubtags,
	metaZones
);

Cldr.load({
	"main": {
		"en": {
			"dates": {
				"timeZoneNames": {
					"zone": {
						"Foo": {
							"Baz": {
								"exemplarCity": "Foo City"
							}
						}
					}
				}
			}
		}
	}
});

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

QUnit.test( "should return properties for period (a)", function( assert ) {
	assert.ok( "gregorian/dayPeriods/format/wide" in tokenizerProperties( "a", cldr ) );
});

/**
 *  Zone
 */

var properties;
QUnit.test( "should return properties for timezone (z)", function( assert ) {
	var enGb = new Cldr( "en-GB" );

	properties = tokenizerProperties( "z", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);
	properties = tokenizerProperties( "zzzz", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);

	properties = tokenizerProperties( "z", cldr, "America/Los_Angeles" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"standardOrDaylightTzName",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);
	properties = tokenizerProperties( "zzzz", cldr, "America/Los_Angeles" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"standardOrDaylightTzName",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);

	properties = tokenizerProperties( "z", enGb, "Europe/London" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"standardOrDaylightTzName",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);
	properties = tokenizerProperties( "zzzz", cldr, "Europe/London" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"standardOrDaylightTzName",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);

	properties = tokenizerProperties( "zzzz", cldr, "Asia/Dubai" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"standardOrDaylightTzName",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);
});

QUnit.test( "should return properties for timezone (Z)", function( assert ) {
	properties = tokenizerProperties( "Z", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);

	properties = tokenizerProperties( "ZZZZ", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);

	properties = tokenizerProperties( "ZZZZZ", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"x"
	]);
});

QUnit.test( "should return properties for timezone (O)", function( assert ) {
	properties = tokenizerProperties( "O", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);

	properties = tokenizerProperties( "OOOO", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);
});

QUnit.test( "should return properties for timezone (v)", function( assert ) {
	properties = tokenizerProperties( "v", cldr, "America/Los_Angeles" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"genericTzName",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);
	properties = tokenizerProperties( "vvvv", cldr, "America/Los_Angeles" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"genericTzName",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);

	// Use metazone.
	properties = tokenizerProperties( "vvvv", cldr, "America/Sao_Paulo" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"genericTzName",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);

	// Fall through 'VVVV' format.
	properties = tokenizerProperties( "v", cldr, "America/Sao_Paulo" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneName",
		"timeZoneNameRe",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);

	properties = tokenizerProperties( "v", cldr, "Foo/Baz" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneName",
		"timeZoneNameRe",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);
	properties = tokenizerProperties( "vvvv", cldr, "Foo/Baz" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneName",
		"timeZoneNameRe",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);

	// Fall through 'O' and 'OOOO' formats.
	properties = tokenizerProperties( "v", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);
	properties = tokenizerProperties( "vvvv", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);
});

QUnit.test( "should return properties for timezone (V)", function( assert ) {
	// FIXME assert.equal( JSON.stringify( properties ), "" );
	properties = tokenizerProperties( "VV", cldr, "America/Los_Angeles" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneName",
		"timeZoneNameRe"
	]);

	properties = tokenizerProperties( "VVV", cldr, "America/Los_Angeles" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneName",
		"timeZoneNameRe",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);

	properties = tokenizerProperties( "VVVV", cldr, "America/Los_Angeles" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneName",
		"timeZoneNameRe",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);

	// Fall through to 'VVV' format with "Unknown" exemplarCity.
	properties = tokenizerProperties( "VVV", cldr, "Foo/Bar" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneName",
		"timeZoneNameRe",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);

	// Fall through 'OOOO' format.
	properties = tokenizerProperties( "VVVV", cldr, "America/Los_Angeles" );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"timeZoneName",
		"timeZoneNameRe",
		"timeZoneNames/gmtZeroFormat",
		"timeZoneNames/hourFormat",
		"timeZoneNames/gmtZeroFormatRe",
		"x"
	]);
});

QUnit.test( "should return properties for timezone (X)", function( assert ) {
	properties = tokenizerProperties( "X", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"x"
	]);

	properties = tokenizerProperties( "XX", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"x"
	]);

	properties = tokenizerProperties( "XXX", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"x"
	]);

	properties = tokenizerProperties( "XXXX", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"x"
	]);

	properties = tokenizerProperties( "XXXXX", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"x"
	]);
});

QUnit.test( "should return properties for timezone (x)", function( assert ) {
	properties = tokenizerProperties( "x", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"x"
	]);

	properties = tokenizerProperties( "xx", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"x"
	]);

	properties = tokenizerProperties( "xxx", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"x"
	]);

	properties = tokenizerProperties( "xxxx", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"x"
	]);

	properties = tokenizerProperties( "xxxxx", cldr );
	assert.deepEqual( Object.keys( properties ), [
		"pattern",
		"digitsRe",
		"x"
	]);
});

});
