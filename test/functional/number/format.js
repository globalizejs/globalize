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
	equal( Globalize.formatNumber( pi ), "3.142", "" );
	equal( Globalize.formatNumber( pi, {}, "es" ), "3,142", "" );
	equal( Globalize.formatNumber( pi, {}, "ar" ), "3٫142", "" );
	equal( Globalize.formatNumber( pi, {
		minimumIntegerDigits: 2,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}), "03.14", "" );
});

test( "should format percent style", function() {
	equal( Globalize.formatNumber( pi, { style: "percent" } ), "314%", "" );
	equal( Globalize.formatNumber( pi, { style: "percent" }, "ar" ), "314٪", "" );
});

});
