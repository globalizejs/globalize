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

QUnit.test( "should return appropriate properties", function( assert ) {
	assert.deepEqual( format( "1", "one", properties( "USD", en ) ), "1 US dollar" );
	assert.deepEqual( format( "2", "other", properties( "USD", en ) ), "2 US dollars" );

	// Test the fallback to displayNames by the lack of displayNames-count-*.
	assert.deepEqual( format( "1", "something", {
		"displayNames": {
			"displayName": "US Dollar",
		},
		"unitPatterns": {
			"unitPattern-count-other": "{0} {1}"
		}
	}), "1 US Dollar" );

	// Test the fallback to currency by the lack of displayName and displayName-count-*.
	assert.deepEqual( format( "1", "something", {
		"currency": "USD",
		"unitPatterns": {
			"unitPattern-count-other": "{0} {1}"
		}
	}), "1 USD" );

	assert.deepEqual( format( "10", "other", properties( "CNY", zh ) ), "10人民币" );

	// Testing inverted unitPattern {1} {0}.
	assert.deepEqual( format( "1", "other", {
		"currency": "TZS",
		"unitPatterns": {
			"unitPattern-count-other": "{1} {0}"
		}
	}), "TZS 1" );

});

});
