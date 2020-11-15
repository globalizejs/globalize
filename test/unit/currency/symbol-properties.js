define([
	"cldr",
	"src/currency/symbol-properties",
	"json!cldr-data/main/de/currencies.json",
	"json!cldr-data/main/de/numbers.json",
	"json!cldr-data/main/en/currencies.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/zh/currencies.json",
	"json!cldr-data/main/zh/numbers.json",
	"json!cldr-data/supplemental/currencyData.json",
	"json!cldr-data/supplemental/likelySubtags.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, symbolProperties, deCurrencies, deNumbers, enCurrencies, enNumbers, zhCurrencies,
	zhNumbers, currencyData, likelySubtags ) {

var de, en, zh;

Cldr.load(
	currencyData,
	deCurrencies,
	deNumbers,
	enCurrencies,
	enNumbers,
	likelySubtags,
	zhCurrencies,
	zhNumbers
);

de = new Cldr( "de" );
en = new Cldr( "en" );
zh = new Cldr( "zh" );

QUnit.module( "Currency Symbol Properties" );

QUnit.test( "should return pattern replacing `¤` with the appropriate currency symbol literal", function( assert ) {
	assert.deepEqual( symbolProperties( "USD", en, {} ), {
	"pattern": "¤#,##0.00",
	"symbol": "$"
	});
	assert.deepEqual( symbolProperties( "EUR", en, {} ), {
		"pattern": "¤#,##0.00",
		"symbol": "€"
	});
	assert.deepEqual( symbolProperties( "CLF", en, {} ), {
		"pattern": "¤ #,##0.0000",
		"symbol": "CLF"
	});
	assert.deepEqual( symbolProperties( "USD", de, {} ), {
		"pattern": "#,##0.00 ¤",
		"symbol": "$"
	});
	assert.deepEqual( symbolProperties( "EUR", de, {} ), {
		"pattern": "#,##0.00 ¤",
		"symbol": "€"
	});
	assert.deepEqual( symbolProperties( "USD", zh, {} ), {
		"pattern": "¤#,##0.00",
		"symbol": "US$"
	});
	assert.deepEqual( symbolProperties( "EUR", zh, {} ), {
		"pattern": "¤#,##0.00",
		"symbol": "€"
	});
	assert.deepEqual( symbolProperties( "RUB", en, {} ), {
		"pattern": "¤ #,##0.00",
		"symbol": "RUB"
	});

	assert.deepEqual( symbolProperties( "USD", en, {
		style: "accounting"
	}), {
		"pattern": "¤#,##0.00;(¤#,##0.00)",
		"symbol": "$"
	});
});

QUnit.test( "Should use the supplied symbolForm, falling back to standard if none is found", function( assert ) {
	assert.deepEqual(
		symbolProperties( "RUB", en, { symbolForm: "narrow" } ),
		{ "pattern": "¤#,##0.00", "symbol": "₽" }
	);
	assert.deepEqual(
		symbolProperties( "HKD", en, { symbolForm: "narrow" } ),
		{ "pattern": "¤#,##0.00", "symbol": "$" }
	);
	assert.deepEqual(
		symbolProperties( "CHF", en, { symbolForm: "narrow" } ),
		{ "pattern": "¤ #,##0.00", "symbol": "CHF" }
	);
});

});
