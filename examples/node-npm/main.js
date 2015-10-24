var like;
var Globalize = require( "globalize" );

// Before we can use Globalize, we need to feed it on the appropriate I18n content (Unicode CLDR). Read Requirements on Getting Started on the root's README.md for more information.
Globalize.load(
	require( "cldr-data/main/en/ca-gregorian" ),
	require( "cldr-data/main/en/currencies" ),
	require( "cldr-data/main/en/dateFields" ),
	require( "cldr-data/main/en/numbers" ),
	require( "cldr-data/main/en/units" ),
	require( "cldr-data/supplemental/currencyData" ),
	require( "cldr-data/supplemental/likelySubtags" ),
	require( "cldr-data/supplemental/plurals" ),
	require( "cldr-data/supplemental/timeData" ),
	require( "cldr-data/supplemental/weekData" )
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

// Use Globalize to format relative time.
console.log( Globalize.formatRelativeTime( -35, "second" ) );

// Use Globalize to format unit.
console.log( Globalize.formatUnit( 60, "mile/hour", { form: "short" } ) );
