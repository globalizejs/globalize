define([
	"globalize",
	"json!cldr-data/main/en/currencies.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/supplemental/currencyData.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/plurals.json",
	"../../util",

	"globalize/currency",
	"globalize/number"
], function( Globalize, enCurrencies, enNumbers, currencyData, likelySubtags, plurals, util ) {

var teslaS = 69900;

function extraSetup() {
	Globalize.load(
		currencyData,
		enCurrencies,
		enNumbers,
		plurals
	);
}

QUnit.module( ".formatCurrency( value, currency [, options] )", {
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
		Globalize.formatCurrency();
	});

	util.assertNumberParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.formatCurrency( invalidValue );
		};
	});

	util.assertParameterPresence( assert, "currency", function() {
		Globalize.formatCurrency( 7 );
	});

	util.assertCurrencyParameter( assert, "currency", function( invalidValue ) {
		return function() {
			Globalize.formatCurrency( 7, invalidValue );
		};
	});

	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.formatCurrency( 7, "USD", invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.formatCurrency( 7, "USD" );
	});
});

QUnit.test( "should format currencies", function( assert ) {
	extraSetup();
	assert.equal( Globalize.formatCurrency( teslaS, "USD" ), "$69,900.00" );
});

});
