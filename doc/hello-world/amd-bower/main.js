/**
 * 1. Configure require.js paths.
 */
require.config({
	paths: {
		// Globalize dependencies paths.
		cldr: "./bower_components/cldrjs/dist/cldr",

		// CLDR JSON content paths. (a) cldr is the JSON content itself, (b) json is the require.js plugin we'll use to fetch CLDR JSON content, (c) text is json's dependency.
		cldrdata: "./cldr",
		json: "./bower_components/requirejs-plugins/src/json",
		text: "./bower_components/requirejs-text/text",

		// Globalize path. Note it's already available on this repository. If it's not, read Usage on Getting Started on the root's README.md.
		globalize: "../../../dist/globalize"
	}
});


/**
 * 2. Require dependencies and run your code.
 */
require([
	"globalize",

	// CLDR content.
	"json!cldrdata/main/en/ca-gregorian.json",
	"json!cldrdata/main/en/numbers.json",
	"json!cldrdata/supplemental/likelySubtags.json",
	"json!cldrdata/supplemental/plurals.json",
	"json!cldrdata/supplemental/timeData.json",
	"json!cldrdata/supplemental/weekData.json",

	// Extend Globalize with Date and Number modules.
	"globalize/date",
	"globalize/number",
	"globalize/plural"
], function( Globalize, enGregorian, enNumbers, likelySubtags, pluralsData, timeData, weekData ) {

	// At this point, we have Globalize loaded. But, before we can use it, we need to feed it on the appropriate I18n content (Unicode CLDR). Read Requirements on Getting Started on the root's README.md for more information.
	Globalize.load( enGregorian );
	Globalize.load( enNumbers );
	Globalize.load( likelySubtags );
	Globalize.load( pluralsData );
	Globalize.load( timeData );
	Globalize.load( weekData );

	// Set "en" as our default locale.
	Globalize.locale( "en" );

	// Use Globalize to format dates.
	console.log( Globalize.formatDate( new Date(), { datetime: "medium" } ) );

	// Use Globalize to format numbers.
	console.log( Globalize.formatNumber( 12345 ) );

	// Use Globalize to format a message with plural inflection.
	console.log( Globalize.formatPlural( 12345, {
		one: "{0} result",
		other: "{0} results"
	}));

});
