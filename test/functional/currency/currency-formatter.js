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

var accounting = { style: "accounting" },
	code = { style: "code" },
	name = { style: "name" },
	teslaS = 69900;

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

QUnit.module( ".currencyFormatter( currency [, options] )", {
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
	util.assertParameterPresence( assert, "currency", function() {
		Globalize.currencyFormatter();
	});

	util.assertCurrencyParameter( assert, "currency", function( invalidValue ) {
		return function() {
			Globalize.currencyFormatter( invalidValue );
		};
	});

	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.currencyFormatter( "USD", invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.currencyFormatter( "USD" );
	});
});

QUnit.test( "should return a currency formatter", function( assert ) {
	var de, zh;

	extraSetup();

	de = Globalize( "de" );
	zh = Globalize( "zh" );

	assert.equal( Globalize.currencyFormatter( "USD" )( teslaS ), "$69,900.00" );
	assert.equal( de.currencyFormatter( "USD" )( teslaS ), "69.900,00 $" );
	assert.equal( zh.currencyFormatter( "USD" )( teslaS ), "US$69,900.00" );

	assert.equal( Globalize.currencyFormatter( "USD", code )( teslaS ), "69,900.00 USD" );
	assert.equal( de.currencyFormatter( "USD", code )( teslaS ), "69.900,00 USD" );
	assert.equal( zh.currencyFormatter( "USD", code )( teslaS ), "69,900.00USD" );

	assert.equal( Globalize.currencyFormatter( "USD", name )( teslaS ), "69,900.00 US dollars" );
	assert.equal( de.currencyFormatter( "USD", name )( teslaS ), "69.900,00 US-Dollar" );
	assert.equal( zh.currencyFormatter( "USD", name )( teslaS ), "69,900.00美元" );

	assert.equal( Globalize.currencyFormatter( "USD", accounting )( -1 ), "($1.00)" );
});

// The number of decimal places and the rounding for each currency is not locale-specific data.
// Those values are overriden by Supplemental Currency Data.
QUnit.test( "should return a currency formatter, overriden by Supplemental Currency Data",
			function( assert ) {
	extraSetup();

	assert.equal( Globalize.currencyFormatter( "CLF" )( 12345 ), "CLF 12,345.0000" );
	assert.equal( Globalize.currencyFormatter( "CLF" )( 12345.67 ), "CLF 12,345.6700" );
	assert.equal( Globalize.currencyFormatter( "ZWD" )( 12345 ), "ZWD 12,345" );
	assert.equal( Globalize.currencyFormatter( "ZWD" )( 12345.67 ), "ZWD 12,346" );
	assert.equal( Globalize.currencyFormatter( "JPY" )( 12345.67 ), "¥12,346" );

	assert.equal( Globalize.currencyFormatter( "CLF", code )( 12345.67 ),
		"12,345.6700 CLF" );

	assert.equal( Globalize.currencyFormatter( "CLF", name )( 12345.67 ),
		"12,345.6700 Chilean units of account (UF)" );
});

// User options should override everything.
QUnit.test( "should return a currency formatter, overriden by user options",
			function( assert ) {
	extraSetup();

	assert.equal( Globalize.currencyFormatter( "CLF", {
		minimumFractionDigits: 0
	})( 12345 ), "CLF 12,345" );

	assert.equal( Globalize.currencyFormatter( "CLF", {
		style: "code",
		minimumFractionDigits: 0
	})( 12345 ), "12,345 CLF" );

	assert.equal( Globalize.currencyFormatter( "CLF", {
		style: "name",
		minimumFractionDigits: 0
	})( 12345 ), "12,345 Chilean units of account (UF)" );
});

QUnit.test( "should allow for runtime compilation", function( assert ) {
	extraSetup();

	util.assertRuntimeBind(
		assert,
		Globalize.currencyFormatter( "USD" ),
		"b1223214380",
		"Globalize(\"en\").currencyFormatter(\"USD\",{})",
		function( runtimeArgs ) {
			util.assertRuntimeBind(
				assert,
				runtimeArgs[ 0 ],
				"b957349717",
				"Globalize(\"en\").numberFormatter({\"raw\":\"\'$\'#,##0.00\"})",
				function() {}
			);
		}
	);
});

});
