define([
	"cldr",
	"src/currency/name-properties",
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
], function( Cldr, properties, deCurrencies, deNumbers, enCurrencies, enNumbers, zhCurrencies,
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

QUnit.module( "Currency Name Properties" );

QUnit.test( "should return appropriate properties", function( assert ) {
	assert.deepEqual( properties( "USD", en ), {
		"currency": "USD",
		"displayNames": {
			"displayName": "US Dollar",
			"displayName-count-one": "US dollar",
			"displayName-count-other": "US dollars"
		},
		"pattern": "#,##0.00",
		"unitPatterns": {
			"unitPattern-count-one": "{0} {1}",
			"unitPattern-count-other": "{0} {1}"
		}
	});
	assert.deepEqual( properties( "EUR", de ), {
		"currency": "EUR",
		"displayNames": {
			"displayName": "Euro",
			"displayName-count-one": "Euro",
			"displayName-count-other": "Euro"
		},
		"pattern": "#,##0.00",
		"unitPatterns": {
			"unitPattern-count-one": "{0} {1}",
			"unitPattern-count-other": "{0} {1}"
		}
	});
	assert.deepEqual( properties( "CNY", zh ), {
		"currency": "CNY",
		"displayNames": {
			"displayName": "人民币",
			"displayName-count-other": "人民币"
		},
		"pattern": "#,##0.00",
		"unitPatterns": {
			"unitPattern-count-other": "{0}{1}"
		}
	});

	// The number of decimal places and the rounding for each currency is not locale-specific data.
	// Those values are overriden by Supplemental Currency Data.
	assert.deepEqual( properties( "CLF", en ), {
		"currency": "CLF",
		"displayNames": {
			"displayName": "Chilean Unit of Account (UF)",
			"displayName-count-one": "Chilean unit of account (UF)",
			"displayName-count-other": "Chilean units of account (UF)",
		},
		"pattern": "#,##0.0000",
		"unitPatterns": {
			"unitPattern-count-one": "{0} {1}",
			"unitPattern-count-other": "{0} {1}"
		}
	});
});

});
