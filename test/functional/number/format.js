define([
	"globalize",
	"json!fixtures/cldr/main/ar/numbers.json",
	"json!fixtures/cldr/main/en/numbers.json",
	"json!fixtures/cldr/main/es/numbers.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"../../util",
	"globalize/number"
], function( Globalize, arNumbers, enNumbers, esNumbers, likelySubtags, util ) {

var pi = 3.14159265359;

Globalize.load( arNumbers );
Globalize.load( enNumbers );
Globalize.load( esNumbers );
Globalize.load( likelySubtags );
Globalize.locale( "en" );

QUnit.module( "Number Format" );

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "value", function() {
		Globalize.formatNumber();
	});

	util.assertNumberParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.formatNumber( invalidValue );
		};
	});

	util.assertPlainObjectParameter( assert, "attributes", function( invalidValue ) {
		return function() {
			Globalize.formatNumber( 7, invalidValue );
		};
	});
});

QUnit.test( "should format decimal style", function( assert ) {
	assert.equal( Globalize.formatNumber( pi ), "3.142" );
	assert.equal( Globalize( "es" ).formatNumber( pi ), "3,142" );
	assert.equal( Globalize( "ar" ).formatNumber( pi ), "3٫142" );
	assert.equal( Globalize.formatNumber( 99999999.99 ), "99,999,999.99" );

	assert.equal( Globalize.formatNumber( pi, {
		minimumIntegerDigits: 2,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}), "03.14" );

	assert.equal( Globalize.formatNumber( pi, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3
	}), "3.14" );

	assert.equal( Globalize.formatNumber( 12345, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3
	}), "12,300" );

	assert.equal( Globalize.formatNumber( 0.00012345, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3
	}), "0.000123" );

	assert.equal( Globalize.formatNumber( 0.00010001, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3
	}), "0.0001" );

	assert.equal( Globalize.formatNumber( 99999999.99, { useGrouping: false } ), "99999999.99" );
});

QUnit.test( "should format percent style", function( assert ) {
	assert.equal( Globalize.formatNumber( pi, { style: "percent" } ), "314%" );
	assert.equal( Globalize( "ar" ).formatNumber( pi, { style: "percent" } ), "314٪" );
});

});
