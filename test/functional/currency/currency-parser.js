define([
	"globalize",
	"json!cldr-data/main/de/currencies.json",
	"json!cldr-data/main/de/numbers.json",
	"json!cldr-data/main/en/currencies.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/zh/currencies.json",
	"json!cldr-data/main/zh/numbers.json",
	"json!cldr-data/supplemental/currencyData.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/plurals.json",
	"../../util",

	"globalize/currency",
	"globalize/number",
	"globalize/plural"
], function( Globalize, deCurrencies, deNumbers, enCurrencies, enNumbers, zhCurrencies,
	zhNumbers, currencyData, likelySubtags, plurals, util ) {

var teslaS = 69900;

function extraSetup() {
	Globalize.load(
		currencyData,
		deCurrencies,
		deNumbers,
		enCurrencies,
		enNumbers,
		plurals,
		zhCurrencies,
		zhNumbers
	);

}

QUnit.module( ".currencyParser( [options] )", {
	setup: function() {
		Globalize.load( likelySubtags, {
			main: {
				en: {},
				"en-IN": {},
				"tr-CY": {}
			}
		});
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "currency", function() {
		Globalize.currencyParser();
	});

	util.assertCurrencyParameter( assert, "currency", function( invalidValue ) {
		return function() {
			Globalize.currencyParser( invalidValue );
		};
	});

	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.currencyParser( invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.currencyParser();
	});
});

QUnit.test( "should return a currency formatter", function( assert ) {
	var de, zh;

	extraSetup();

	de = Globalize( "de" );
	zh = Globalize( "zh" );

	assert.equal( Globalize.currencyParser()( "$69,900.00" ), teslaS );
	assert.equal( de.currencyParser()( "69.900,00 $" ), teslaS );
	assert.equal( zh.currencyParser()( "US$69,900.00" ), teslaS );

	assert.equal( Globalize.currencyParser()( "-$69,900.00" ), -teslaS );
	assert.equal( de.currencyParser()( "-69.900,00 $" ), -teslaS );
	assert.equal( zh.currencyParser()( "-US$69,900.00" ), -teslaS );

	assert.equal( Globalize.currencyParser()( "69,900.00 USD" ), teslaS );
	assert.equal( de.currencyParser()( "69.900,00 USD" ), teslaS );
	assert.equal( zh.currencyParser()( "69,900.00USD" ), teslaS );

	assert.equal( Globalize.currencyParser()( "69,900.00 US dollars" ), teslaS );
	assert.equal( de.currencyParser()( "69.900,00 US-Dollar" ), teslaS );
	assert.equal( zh.currencyParser()( "69,900.00美元" ), teslaS );

	assert.equal( Globalize.currencyParser()( "($1.00)" ), -1 );
});

// The number of decimal places and the rounding for each currency is not locale-specific data.
// Those values are overriden by Supplemental Currency Data.
QUnit.test( "should return a currency formatter, overriden by Supplemental Currency Data",
			function( assert ) {
	extraSetup();

	assert.equal( Globalize.currencyParser()( "CLF 12,345.0000" ), 12345 );
	assert.equal( Globalize.currencyParser()( "CLF 12,345.6700" ), 12345.67 );
	assert.equal( Globalize.currencyParser()( "ZWD 12,345" ), 12345 );
	assert.equal( Globalize.currencyParser()( "ZWD 12,346" ), 12345.67 );
	assert.equal( Globalize.currencyParser()( "¥12,346" ), 12345.67 );

	assert.equal( Globalize.currencyParser()( "12,345.6700 CLF" ), 12345.67 );

	assert.equal( Globalize.currencyParser()( "12,345.6700 Chilean units of account (UF)" ), 12345.67 );
});

// User options should override everything.
QUnit.test( "should return a currency formatter, overriden by user options",
			function( assert ) {
	extraSetup();

	assert.equal( Globalize.currencyParser({
		minimumFractionDigits: 0
	})( "CLF 12,345" ), 12345 );

	assert.equal( Globalize.currencyParser({
		maximumFractionDigits: 0
	})( "¥12,345" ), 12345 );

	assert.equal( Globalize.currencyParser({
		minimumFractionDigits: 2
	})( "¥12,345.00" ), 12345 );

	assert.equal( Globalize.currencyParser({
		style: "code",
		minimumFractionDigits: 0
	})( "12,345 CLF" ), 12345 );

	assert.equal( Globalize.currencyParser({
		style: "name",
		minimumFractionDigits: 0
	})( "12,345 Chilean units of account (UF)" ), 12345 );
});

});
