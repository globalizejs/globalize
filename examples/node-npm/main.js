#! /usr/bin/node

var cldrData = require( "cldr-data" );
var Globalize = require( "globalize" );

// Before we can use Globalize, we need to feed it on the appropriate I18n content (Unicode CLDR). Read Requirements on Getting Started on the root's README.md for more information.
Globalize.load(
	cldrData( "main/en/ca-gregorian" ),
	cldrData( "main/en/numbers" ),
	cldrData( "supplemental/likelySubtags" ),
	cldrData( "supplemental/plurals" ),
	cldrData( "supplemental/timeData" ),
	cldrData( "supplemental/weekData" )
);

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
