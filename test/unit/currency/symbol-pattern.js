define([
	"cldr",
	"src/currency/symbol-pattern",
	"json!cldr-data/main/de/currencies.json",
	"json!cldr-data/main/de/numbers.json",
	"json!cldr-data/main/en/currencies.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/zh/currencies.json",
	"json!cldr-data/main/zh/numbers.json",
	"json!cldr-data/supplemental/currencyData.json",
	"json!cldr-data/supplemental/likelySubtags.json"
], function( Cldr, symbolPattern, deCurrencies, deNumbers, enCurrencies, enNumbers, zhCurrencies,
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

QUnit.module( "Currency Symbol Pattern" );

QUnit.test( "should return pattern replacing `¤` with the appropriate currency symbol literal", function( assert ) {
	assert.equal( symbolPattern( "USD", en, {} ), "'$'#,##0.00" );
	assert.equal( symbolPattern( "EUR", en, {} ), "'€'#,##0.00" );
	assert.equal( symbolPattern( "USD", de, {} ), "#,##0.00 '$'" );
	assert.equal( symbolPattern( "EUR", de, {} ), "#,##0.00 '€'" );
	assert.equal( symbolPattern( "USD", zh, {} ), "'US$' #,##0.00" );
	assert.equal( symbolPattern( "EUR", zh, {} ), "'€' #,##0.00" );

	assert.equal( symbolPattern( "USD", en, {
		style: "accounting"
	}), "'$'#,##0.00;('$'#,##0.00)" );
});

});
