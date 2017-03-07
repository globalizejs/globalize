define([
	"cldr",
	"src/date/parse-properties",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!iana-tz-data.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, parseProperties, enCaGregorian, likelySubtags, timeData, ianaTimezoneData ) {

var cldr;

Cldr.load(
	enCaGregorian,
	likelySubtags,
	timeData
);

// Needed for globalizeDate.
Cldr.load({
	"globalize-iana": ianaTimezoneData
});

cldr = new Cldr( "en" );

QUnit.module( "Date Parse Properties" );

QUnit.test( "should return parse properties", function( assert ) {
	var properties;

	assert.ok( "preferredTimeData" in parseProperties( cldr ) );

	properties = parseProperties( cldr, "America/Los_Angeles" );
	assert.ok( "preferredTimeData" in properties );
	assert.ok( "timeZoneData" in properties );
	assert.ok( "offsets" in properties.timeZoneData );
	assert.ok( "untils" in properties.timeZoneData );
	assert.ok( "isdsts" in properties.timeZoneData );
});

});
