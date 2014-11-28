define([
	"globalize",
	"json!cldr-data/main/de/currencies.json",
	"json!cldr-data/main/de/numbers.json",
	"json!cldr-data/main/en/currencies.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/zh/currencies.json",
	"json!cldr-data/main/zh/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/plurals.json",
	"../../util",
	"globalize/currency",
	"globalize/number",
	"globalize/plural"
], function( Globalize, deCurrencies, deNumbers, enCurrencies, enNumbers, zhCurrencies,
	zhNumbers, likelySubtags, plurals, util ) {

var teslaS = 69900;

function extraSetup() {
	Globalize.load(
		deCurrencies,
		deNumbers,
		enCurrencies,
		enNumbers,
		plurals,
		zhCurrencies,
		zhNumbers
	);

}

QUnit.module( ".currencyFormatter( currency [, options] )", {
	setup: function() {
		Globalize.load( likelySubtags );
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

/*
QUnit.test( "should validate parameters", function( assert ) {
	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.currencyFormatter( invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.currencyFormatter();
	});
});

QUnit.test( "should validate options", function( assert ) {
	extraSetup();

	util.assertParameterRange( assert, 1, 21, function( num ) {
		Globalize.currencyFormatter({
			maximumSignificantDigits: 1,
			minimumSignificantDigits: num
		});
	});
	util.assertParameterRange( assert, 1, 21, function( num ) {
		Globalize.currencyFormatter({
			maximumSignificantDigits: num,
			minimumSignificantDigits: 1
		});
	});
	util.assertParameterRange( assert, 1, 21, function( num ) {
		Globalize.currencyFormatter({ minimumIntegerDigits: num } );
	});
	util.assertParameterRange( assert, 0, 20, function( num ) {
		Globalize.currencyFormatter({ minimumFractionDigits: num } );
	});
	util.assertParameterRange( assert, 0, 20, function( num ) {
		Globalize.currencyFormatter({ maximumFractionDigits: num } );
	});
});
*/

QUnit.test( "should return a formatter", function( assert ) {
	var de, zh;
	extraSetup();

	de = Globalize( "de" );
	zh = Globalize( "zh" );

	assert.equal( Globalize.currencyFormatter( "USD" )( teslaS ), "$69,900.00" );
	assert.equal( de.currencyFormatter( "USD" )( teslaS ), "69.900,00 $" );
	assert.equal( zh.currencyFormatter( "USD" )( teslaS ), "US$ 69,900.00" );

	assert.equal( Globalize.currencyFormatter( "USD", {
		style: "code"
	})( teslaS ), "69,900 USD" );

	assert.equal( de.currencyFormatter( "USD", {
		style: "code"
	})( teslaS ), "69.900 USD" );

	assert.equal( zh.currencyFormatter( "USD", {
		style: "code"
	})( teslaS ), "69,900USD" );

	assert.equal( Globalize.currencyFormatter( "USD", {
		style: "name"
	})( teslaS ), "69,900 US dollars" );

	assert.equal( de.currencyFormatter( "USD", {
		style: "name"
	})( teslaS ), "69.900 US-Dollar" );

	assert.equal( zh.currencyFormatter( "USD", {
		style: "name"
	})( teslaS ), "69,900美元" );
});

});
