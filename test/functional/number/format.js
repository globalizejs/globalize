define([
	"globalize",
	"json!fixtures/cldr/main/ar/numbers.json",
	"json!fixtures/cldr/main/en/numbers.json",
	"json!fixtures/cldr/main/es/numbers.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"globalize/number"
], function( Globalize, arNumbers, enNumbers, esNumbers, likelySubtags ) {

var pi = 3.14159265359;

Globalize.load( arNumbers );
Globalize.load( enNumbers );
Globalize.load( esNumbers );
Globalize.load( likelySubtags );
Globalize.locale( "en" );

module( "Number Format" );

test( "should format decimal style", function() {
	equal( Globalize.formatNumber( pi ), "3.142" );
	equal( Globalize( "es" ).formatNumber( pi ), "3,142" );
	equal( Globalize( "ar" ).formatNumber( pi ), "3٫142" );
	equal( Globalize.formatNumber( 99999999.99 ), "99,999,999.99" );

	equal( Globalize.formatNumber( pi, {
		minimumIntegerDigits: 2,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}), "03.14" );

	equal( Globalize.formatNumber( pi, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3
	}), "3.14" );

	equal( Globalize.formatNumber( 12345, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3
	}), "12,300" );

	equal( Globalize.formatNumber( 0.00012345, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3
	}), "0.000123" );

	equal( Globalize.formatNumber( 0.00010001, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3
	}), "0.0001" );

	equal( Globalize.formatNumber( 99999999.99, { useGrouping: false } ), "99999999.99" );
});

test( "should format percent style", function() {
	equal( Globalize.formatNumber( pi, { style: "percent" } ), "314%" );
	equal( Globalize( "ar" ).formatNumber( pi, { style: "percent" } ), "314٪" );
});

});
