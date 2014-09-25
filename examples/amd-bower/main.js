/**
 * 1. Configure require.js paths.
 */
require.config({
	paths: {
		// Globalize dependencies paths.
		cldr: "./bower_components/cldrjs/dist/cldr",

		// Unicode CLDR JSON data.
		"cldr-data": "./bower_components/cldr-data",

		// require.js plugin we'll use to fetch CLDR JSON content.
		json: "./bower_components/requirejs-plugins/src/json",

		// text is json's dependency.
		text: "./bower_components/requirejs-text/text",

		// Globalize.
		globalize: "./bower_components/globalize/dist/globalize"
	}
});


/**
 * 2. Require dependencies and run your code.
 */
require([
	"globalize",

	// CLDR content.
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/plurals.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",

	// Extend Globalize with Date and Number modules.
	"globalize/date",
	"globalize/number",
	"globalize/plural"
], function( Globalize, enGregorian, enNumbers, likelySubtags, pluralsData, timeData, weekData ) {
	var en, pluralData;

	// At this point, we have Globalize loaded. But, before we can use it, we need to feed it on the appropriate I18n content (Unicode CLDR). Read Requirements on Getting Started on the root's README.md for more information.
	Globalize.load( enGregorian );
	Globalize.load( enNumbers );
	Globalize.load( likelySubtags );
	Globalize.load( pluralsData );
	Globalize.load( timeData );
	Globalize.load( weekData );

	// Instantiate "en".
	en = Globalize( "en" );

	// Use Globalize to format dates.
	document.getElementById( "date" ).innerHTML = en.formatDate( new Date(), {
		datetime: "medium"
	})

	// Use Globalize to format numbers.
	document.getElementById( "number" ).innerHTML = en.formatNumber( 12345.6789 );

	// Use Globalize to format a message with plural inflection.
	pluralData = {
		one: "{0} result",
		other: "{0} results"
	};
	document.getElementById( "plural-0" ).innerHTML = en.formatPlural( 0, pluralData );
	document.getElementById( "plural-1" ).innerHTML = en.formatPlural( 1, pluralData );
	document.getElementById( "plural-2" ).innerHTML = en.formatPlural( 2, pluralData );

	document.getElementById( "requirements" ).style.display = "none";
	document.getElementById( "demo" ).style.display = "block";

});
