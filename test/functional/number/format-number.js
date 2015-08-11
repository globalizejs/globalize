define([
	"globalize",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/es/numbers.json",
	"json!cldr-data/main/zh/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"../../util",

	"globalize/number"
], function( Globalize, arNumbers, enNumbers, esNumbers, zhNumbers, likelySubtags, numberingSystems,
	util ) {

var pi = 3.14159265359;

function extraSetup() {
	Globalize.load(
		arNumbers,
		enNumbers,
		esNumbers,
		zhNumbers,
		numberingSystems
	);
}

QUnit.module( ".formatNumber( value [, options] )", {
	setup: function() {
		Globalize.load( likelySubtags, {
			main: {
				en: {}
			}
		});
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

	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
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

QUnit.test( "should format decimal style", function( assert ) {
	extraSetup();

	assert.equal( Globalize.formatNumber( pi ), "3.142" );
	assert.equal( Globalize( "es" ).formatNumber( pi ), "3,142" );
	assert.equal( Globalize( "ar" ).formatNumber( pi ), "٣٫١٤٢" );
	assert.equal( Globalize( "zh-u-nu-native" ).formatNumber( pi ), "三.一四二" );
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
	assert.equal( Globalize( "ar" ).formatNumber( pi, { style: "percent" } ), "٣١٤٪" );
});

});
