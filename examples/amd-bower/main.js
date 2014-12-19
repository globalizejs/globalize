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
	"json!cldr-data/main/en/currencies.json",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/supplemental/currencyData.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/plurals.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",
	"json!messages/en.json",

	// Extend Globalize with Date and Number modules.
	"globalize/currency",
	"globalize/date",
	"globalize/message",
	"globalize/number",
	"globalize/plural"
], function( Globalize, enCurrencies, enGregorian, enNumbers, currencyData, likelySubtags,
	pluralsData, timeData, weekData, messages ) {

	var en, like, number;

	// At this point, we have Globalize loaded. But, before we can use it, we need to feed it on the appropriate I18n content (Unicode CLDR). Read Requirements on Getting Started on the root's README.md for more information.
	Globalize.load(
		currencyData,
		enCurrencies,
		enGregorian,
		enNumbers,
		likelySubtags,
		pluralsData,
		timeData,
		weekData
	);
	Globalize.loadMessages( messages );

	// Instantiate "en".
	en = Globalize( "en" );

	// Use Globalize to format dates.
	document.getElementById( "date" ).innerHTML = en.formatDate( new Date(), {
		datetime: "medium"
	})

	// Use Globalize to format numbers.
	number = en.numberFormatter();
	document.getElementById( "number" ).innerHTML = number( 12345.6789 );

	// Use Globalize to format currencies.
	document.getElementById( "currency" ).innerHTML = en.formatCurrency( 69900, "USD" );

	// Use Globalize to get the plural form of a numeric value.
	document.getElementById( "plural-number" ).innerHTML = number( 12345.6789 )
	document.getElementById( "plural-form" ).innerHTML = en.plural( 12345.6789 );

	// Use Globalize to format a message with plural inflection.
	like = en.messageFormatter( "like" );
	document.getElementById( "message-0" ).innerHTML = like( 0 );
	document.getElementById( "message-1" ).innerHTML = like( 1 );
	document.getElementById( "message-2" ).innerHTML = like( 2 );
	document.getElementById( "message-3" ).innerHTML = like( 3 );

	document.getElementById( "requirements" ).style.display = "none";
	document.getElementById( "demo" ).style.display = "block";

});
