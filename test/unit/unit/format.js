define([
	"cldr",
	"src/core",
	"src/unit/format",
	"json!fixtures/cldr/main/en/units.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"src/plural"
], function( Cldr, Globalize, formatUnit, enUnits, likelySubtags ) {

var cldr, globalize;

Cldr.load( enUnits );
Cldr.load( likelySubtags );

globalize = new Globalize( "en" );
cldr = globalize.cldr;

QUnit.module( "Unit Format" );

QUnit.test( "Default form (long)", function( assert ) {
	assert.equal( formatUnit( 1, "millisecond", {}, cldr, globalize ), "1 millisecond" );
	assert.equal( formatUnit( 2, "millisecond", {}, cldr, globalize ), "2 milliseconds" );
	assert.equal( formatUnit( 1, "second", {}, cldr, globalize ), "1 second" );
	assert.equal( formatUnit( 2, "second", {}, cldr, globalize ), "2 seconds" );
	assert.equal( formatUnit( 1, "minute", {}, cldr, globalize ), "1 minute" );
	assert.equal( formatUnit( 2, "minute", {}, cldr, globalize ), "2 minutes" );
	assert.equal( formatUnit( 1, "hour", {}, cldr, globalize ), "1 hour" );
	assert.equal( formatUnit( 2, "hour", {}, cldr, globalize ), "2 hours" );
	assert.equal( formatUnit( 1, "day", {}, cldr, globalize ), "1 day" );
	assert.equal( formatUnit( 2, "day", {}, cldr, globalize ), "2 days" );
	assert.equal( formatUnit( 1, "week", {}, cldr, globalize ), "1 week" );
	assert.equal( formatUnit( 2, "week", {}, cldr, globalize ), "2 weeks" );
	assert.equal( formatUnit( 1, "month", {}, cldr, globalize ), "1 month" );
	assert.equal( formatUnit( 2, "month", {}, cldr, globalize ), "2 months" );
	assert.equal( formatUnit( 1, "year", {}, cldr, globalize ), "1 year" );
	assert.equal( formatUnit( 2, "year", {}, cldr, globalize ), "2 years" );
});

QUnit.test( "Long form", function( assert ) {
	assert.equal( formatUnit( 1, "millisecond", { form: "long" }, cldr, globalize ), "1 millisecond" );
	assert.equal( formatUnit( 2, "millisecond", { form: "long" }, cldr, globalize ), "2 milliseconds" );
	assert.equal( formatUnit( 1, "second", { form: "long" }, cldr, globalize ), "1 second" );
	assert.equal( formatUnit( 2, "second", { form: "long" }, cldr, globalize ), "2 seconds" );
	assert.equal( formatUnit( 1, "minute", { form: "long" }, cldr, globalize ), "1 minute" );
	assert.equal( formatUnit( 2, "minute", { form: "long" }, cldr, globalize ), "2 minutes" );
	assert.equal( formatUnit( 1, "hour", { form: "long" }, cldr, globalize ), "1 hour" );
	assert.equal( formatUnit( 2, "hour", { form: "long" }, cldr, globalize ), "2 hours" );
	assert.equal( formatUnit( 1, "day", { form: "long" }, cldr, globalize ), "1 day" );
	assert.equal( formatUnit( 2, "day", { form: "long" }, cldr, globalize ), "2 days" );
	assert.equal( formatUnit( 1, "week", { form: "long" }, cldr, globalize ), "1 week" );
	assert.equal( formatUnit( 2, "week", { form: "long" }, cldr, globalize ), "2 weeks" );
	assert.equal( formatUnit( 1, "month", { form: "long" }, cldr, globalize ), "1 month" );
	assert.equal( formatUnit( 2, "month", { form: "long" }, cldr, globalize ), "2 months" );
	assert.equal( formatUnit( 1, "year", { form: "long" }, cldr, globalize ), "1 year" );
	assert.equal( formatUnit( 2, "year", { form: "long" }, cldr, globalize ), "2 years" );
});

QUnit.test( "Short form", function( assert ) {
	assert.equal( formatUnit( 1, "millisecond", { form: "short" }, cldr, globalize ), "1 ms" );
	assert.equal( formatUnit( 2, "millisecond", { form: "short" }, cldr, globalize ), "2 ms" );
	assert.equal( formatUnit( 1, "second", { form: "short" }, cldr, globalize ), "1 sec" );
	assert.equal( formatUnit( 2, "second", { form: "short" }, cldr, globalize ), "2 secs" );
	assert.equal( formatUnit( 1, "minute", { form: "short" }, cldr, globalize ), "1 min" );
	assert.equal( formatUnit( 2, "minute", { form: "short" }, cldr, globalize ), "2 mins" );
	assert.equal( formatUnit( 1, "hour", { form: "short" }, cldr, globalize ), "1 hr" );
	assert.equal( formatUnit( 2, "hour", { form: "short" }, cldr, globalize ), "2 hrs" );
	assert.equal( formatUnit( 1, "day", { form: "short" }, cldr, globalize ), "1 day" );
	assert.equal( formatUnit( 2, "day", { form: "short" }, cldr, globalize ), "2 days" );
	assert.equal( formatUnit( 1, "week", { form: "short" }, cldr, globalize ), "1 wk" );
	assert.equal( formatUnit( 2, "week", { form: "short" }, cldr, globalize ), "2 wks" );
	assert.equal( formatUnit( 1, "month", { form: "short" }, cldr, globalize ), "1 mth" );
	assert.equal( formatUnit( 2, "month", { form: "short" }, cldr, globalize ), "2 mths" );
	assert.equal( formatUnit( 1, "year", { form: "short" }, cldr, globalize ), "1 yr" );
	assert.equal( formatUnit( 2, "year", { form: "short" }, cldr, globalize ), "2 yrs" );
});

QUnit.test( "Narrow form", function( assert ) {
	assert.equal( formatUnit( 1, "millisecond", { form: "narrow" }, cldr, globalize ), "1ms" );
	assert.equal( formatUnit( 2, "millisecond", { form: "narrow" }, cldr, globalize ), "2ms" );
	assert.equal( formatUnit( 1, "second", { form: "narrow" }, cldr, globalize ), "1s" );
	assert.equal( formatUnit( 2, "second", { form: "narrow" }, cldr, globalize ), "2s" );
	assert.equal( formatUnit( 1, "minute", { form: "narrow" }, cldr, globalize ), "1m" );
	assert.equal( formatUnit( 2, "minute", { form: "narrow" }, cldr, globalize ), "2m" );
	assert.equal( formatUnit( 1, "hour", { form: "narrow" }, cldr, globalize ), "1h" );
	assert.equal( formatUnit( 2, "hour", { form: "narrow" }, cldr, globalize ), "2h" );
	assert.equal( formatUnit( 1, "day", { form: "narrow" }, cldr, globalize ), "1d" );
	assert.equal( formatUnit( 2, "day", { form: "narrow" }, cldr, globalize ), "2d" );
	assert.equal( formatUnit( 1, "week", { form: "narrow" }, cldr, globalize ), "1w" );
	assert.equal( formatUnit( 2, "week", { form: "narrow" }, cldr, globalize ), "2w" );
	assert.equal( formatUnit( 1, "month", { form: "narrow" }, cldr, globalize ), "1m" );
	assert.equal( formatUnit( 2, "month", { form: "narrow" }, cldr, globalize ), "2m" );
	assert.equal( formatUnit( 1, "year", { form: "narrow" }, cldr, globalize ), "1y" );
	assert.equal( formatUnit( 2, "year", { form: "narrow" }, cldr, globalize ), "2y" );
});

});
