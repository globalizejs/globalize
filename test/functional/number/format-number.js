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

function extraSetup() {
	Globalize.load( arNumbers );
	Globalize.load( enNumbers );
	Globalize.load( esNumbers );
}

QUnit.module( "Number Format", {
	setup: function() {
		Globalize.load( likelySubtags );
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

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

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.formatNumber( pi );
	});
});

QUnit.test( "should validate options", function( assert ) {
	extraSetup();

	util.assertParameterRange( assert, 1, 21, function( num ) {
		Globalize.formatNumber( pi, {
			maximumSignificantDigits: 1,
			minimumSignificantDigits: num
		});
	});
	util.assertParameterRange( assert, 1, 21, function( num ) {
		Globalize.formatNumber( pi, {
			maximumSignificantDigits: num,
			minimumSignificantDigits: 1
		});
	});
	util.assertParameterRange( assert, 1, 21, function( num ) {
		Globalize.formatNumber( pi, { minimumIntegerDigits: num } );
	});
	util.assertParameterRange( assert, 0, 20, function( num ) {
		Globalize.formatNumber( pi, { minimumFractionDigits: num } );
	});
	util.assertParameterRange( assert, 0, 20, function( num ) {
		Globalize.formatNumber( pi, { maximumFractionDigits: num } );
	});
});

QUnit.test( "should format decimal style", function( assert ) {
	extraSetup();

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
		maximumFractionDigits: 0
	}), "3" );

	assert.equal( Globalize.formatNumber( 1.1, {
		minimumFractionDigits: 3
	}), "1.100" );

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
	extraSetup();

	assert.equal( Globalize.formatNumber( pi, { style: "percent" } ), "314%" );
	assert.equal( Globalize( "ar" ).formatNumber( pi, { style: "percent" } ), "314٪" );
});

});
