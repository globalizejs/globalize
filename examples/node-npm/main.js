#! /usr/bin/node

var like;
var cldrData = require( "cldr-data" );
var Globalize = require( "globalize" );

// Before we can use Globalize, we need to feed it on the appropriate I18n content (Unicode CLDR). Read Requirements on Getting Started on the root's README.md for more information.
Globalize.load(
	cldrData( "main/en/currencies" ),
	cldrData( "main/en/ca-gregorian" ),
	cldrData( "main/en/numbers" ),
	cldrData( "supplemental/currencyData" ),
	cldrData( "supplemental/likelySubtags" ),
	cldrData( "supplemental/plurals" ),
	cldrData( "supplemental/timeData" ),
	cldrData( "supplemental/weekData" )
);
Globalize.loadMessages( require( "./messages/en" ) );

// Set "en" as our default locale.
Globalize.locale( "en" );

// Use Globalize to format dates.
console.log( Globalize.formatDate( new Date(), { datetime: "medium" } ) );

// Use Globalize to format numbers.
console.log( Globalize.formatNumber( 12345.6789 ) );

// Use Globalize to format currencies.
console.log( Globalize.formatCurrency( 69900, "USD" ) );

// Use Globalize to get the plural form of a numeric value.
console.log( Globalize.plural( 12345.6789 ) );

// Use Globalize to format a message with plural inflection.
like = Globalize.messageFormatter( "like" );
console.log( like( 0 ) );
console.log( like( 1 ) );
console.log( like( 2 ) );
console.log( like( 3 ) );
