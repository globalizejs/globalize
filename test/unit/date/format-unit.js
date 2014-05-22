define([
	"cldr",
	"globalize/date/format-unit",
	"json!fixtures/cldr/supplemental/units.json",
], function( Cldr, formatUnit, unitsData ) {

var cldr;

Cldr.load( unitsData );

cldr = new Cldr( "en" );

test( "formatUnit without options", function() {
	equal( formatUnit( 1, "millisecond", cldr ), "1 millisecond" );
	equal( formatUnit( 2, "millisecond", cldr ), "2 milliseconds" );
	equal( formatUnit( 1, "second", cldr ), "1 second" );
	equal( formatUnit( 2, "second", cldr ), "2 seconds" );
	equal( formatUnit( 1, "minute", cldr ), "1 minute" );
	equal( formatUnit( 2, "minute", cldr ), "2 minutes" );
	equal( formatUnit( 1, "hour", cldr ), "1 hour" );
	equal( formatUnit( 2, "hours", cldr ), "2 hours" );
	equal( formatUnit( 1, "day", cldr ), "1 day" );
	equal( formatUnit( 2, "day", cldr ), "2 days" );
	equal( formatUnit( 1, "week", cldr ), "1 week" );
	equal( formatUnit( 2, "week", cldr ), "1 weeks" );
	equal( formatUnit( 1, "month", cldr ), "1 month" );
	equal( formatUnit( 2, "month", cldr ), "2 months" );
	equal( formatUnit( 1, "year", cldr ), "1 year" );
	equal( formatUnit( 2, "year", cldr ), "2 years" );
});

test( "formatUnit form: long", function() {
	equal( formatUnit( 1, "millisecond", {form: "long"}, cldr ), "1 millisecond" );
	equal( formatUnit( 2, "millisecond", {form: "long"}, cldr ), "2 milliseconds" );
	equal( formatUnit( 1, "second", {form: "long"}, cldr ), "1 second" );
	equal( formatUnit( 2, "second", {form: "long"}, cldr ), "2 seconds" );
	equal( formatUnit( 1, "minute", {form: "long"}, cldr ), "1 minute" );
	equal( formatUnit( 2, "minute", {form: "long"}, cldr ), "2 minutes" );
	equal( formatUnit( 1, "hour", {form: "long"}, cldr ), "1 hour" );
	equal( formatUnit( 2, "hours", {form: "long"}, cldr ), "2 hours" );
	equal( formatUnit( 1, "day", {form: "long"}, cldr ), "1 day" );
	equal( formatUnit( 2, "day", {form: "long"}, cldr ), "2 days" );
	equal( formatUnit( 1, "week", {form: "long"}, cldr ), "1 week" );
	equal( formatUnit( 2, "week", {form: "long"}, cldr ), "1 weeks" );
	equal( formatUnit( 1, "month", {form: "long"}, cldr ), "1 month" );
	equal( formatUnit( 2, "month", {form: "long"}, cldr ), "2 months" );
	equal( formatUnit( 1, "year", {form: "long"}, cldr ), "1 year" );
	equal( formatUnit( 2, "year", {form: "long"}, cldr ), "2 years" );
});

test( "formatUnit form: narrow", function() {
	equal( formatUnit( 1, "millisecond", {form: "narrow"}, cldr ), "1 ms" );
	equal( formatUnit( 2, "millisecond", {form: "narrow"}, cldr ), "2 ms" );
	equal( formatUnit( 1, "second", {form: "narrow"}, cldr ), "1 sec" );
	equal( formatUnit( 2, "second", {form: "narrow"}, cldr ), "2 secs" );
	equal( formatUnit( 1, "minute", {form: "narrow"}, cldr ), "1 min" );
	equal( formatUnit( 2, "minute", {form: "narrow"}, cldr ), "2 mins" );
	equal( formatUnit( 1, "hour", {form: "narrow"}, cldr ), "1 hr" );
	equal( formatUnit( 2, "hours", {form: "narrow"}, cldr ), "2 hrs" );
	equal( formatUnit( 1, "day", {form: "narrow"}, cldr ), "1 day" );
	equal( formatUnit( 2, "day", {form: "narrow"}, cldr ), "2 days" );
	equal( formatUnit( 1, "week", {form: "narrow"}, cldr ), "1 wk" );
	equal( formatUnit( 2, "week", {form: "narrow"}, cldr ), "1 wks" );
	equal( formatUnit( 1, "month", {form: "narrow"}, cldr ), "1 mth" );
	equal( formatUnit( 2, "month", {form: "narrow"}, cldr ), "2 mths" );
	equal( formatUnit( 1, "year", {form: "narrow"}, cldr ), "1 yr" );
	equal( formatUnit( 2, "year", {form: "narrow"}, cldr ), "2 yrs" );
});

test( "formatUnit form: short", function() {
	equal( formatUnit( 1, "millisecond", {form: "short"}, cldr ), "1ms" );
	equal( formatUnit( 2, "millisecond", {form: "short"}, cldr ), "2ms" );
	equal( formatUnit( 1, "second", {form: "short"}, cldr ), "1s" );
	equal( formatUnit( 2, "second", {form: "short"}, cldr ), "2s" );
	equal( formatUnit( 1, "minute", {form: "short"}, cldr ), "1m" );
	equal( formatUnit( 2, "minute", {form: "short"}, cldr ), "2m" );
	equal( formatUnit( 1, "hour", {form: "short"}, cldr ), "1h" );
	equal( formatUnit( 2, "hours", {form: "short"}, cldr ), "2h" );
	equal( formatUnit( 1, "day", {form: "short"}, cldr ), "1d" );
	equal( formatUnit( 2, "day", {form: "short"}, cldr ), "2d" );
	equal( formatUnit( 1, "week", {form: "short"}, cldr ), "1w" );
	equal( formatUnit( 2, "week", {form: "short"}, cldr ), "1w" );
	equal( formatUnit( 1, "month", {form: "short"}, cldr ), "1m" );
	equal( formatUnit( 2, "month", {form: "short"}, cldr ), "2m" );
	equal( formatUnit( 1, "year", {form: "short"}, cldr ), "1y" );
	equal( formatUnit( 2, "year", {form: "short"}, cldr ), "2y" );
});

});
