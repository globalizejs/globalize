define([
	"cldr",
	"src/currency/name-format",
	"src/currency/name-properties",
	"json!cldr-data/main/en/currencies.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/zh/currencies.json",
	"json!cldr-data/main/zh/numbers.json",
	"json!cldr-data/supplemental/currencyData.json",
	"json!cldr-data/supplemental/likelySubtags.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, format, properties, enCurrencies, enNumbers, zhCurrencies, zhNumbers,
	currencyData, likelySubtags ) {

var en, zh;

Cldr.load(
	currencyData,
	enCurrencies,
	enNumbers,
	likelySubtags,
	zhCurrencies,
	zhNumbers
);

en = new Cldr( "en" );
zh = new Cldr( "zh" );

QUnit.module( "Currency Name Format" );

QUnit.test( "should format currencies", function( assert ) {
	assert.deepEqual( format( [{ type: "integer", value: "1" }], "one", properties( "USD", en ) ), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "currency",
			"value": "US dollar"
		}
	]);

	assert.deepEqual( format( [{ type: "integer", value: "2" }], "other", properties( "USD", en ) ), [
		{
			"type": "integer",
			"value": "2"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "currency",
			"value": "US dollars"
		}
	]);

	// Test the fallback to displayNames by the lack of displayNames-count-*.
	assert.deepEqual( format( [{ type: "integer", value: "1" }], "something", {
		"displayNames": {
			"displayName": "US Dollar",
		},
		"unitPatterns": {
			"unitPattern-count-other": "{0} {1}"
		}
	}), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "currency",
			"value": "US Dollar"
		}
	]);

	// Test the fallback to currency by the lack of displayName and displayName-count-*.
	assert.deepEqual( format( [{ type: "integer", value: "1" }], "something", {
		"currency": "USD",
		"unitPatterns": {
			"unitPattern-count-other": "{0} {1}"
		}
	}), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "currency",
			"value": "USD"
		}
	]);

	assert.deepEqual( format( [{ type: "integer", value: "10" }], "other", properties( "CNY", zh ) ), [
		{
			"type": "integer",
			"value": "10"
		},
		{
			"type": "currency",
			"value": "人民币"
		}
	]);

	// Testing inverted unitPattern {1} {0}.
	assert.deepEqual( format( [{ type: "integer", value: "1" }], "other", {
		"currency": "TZS",
		"unitPatterns": {
			"unitPattern-count-other": "{1} {0}"
		}
	}), [
		{
			"type": "currency",
			"value": "TZS"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "integer",
			"value": "1"
		}
	]);

});

});
