define([
	"cldr",
	"src/currency/code-properties",
	"json!cldr-data/main/de/numbers.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/zh/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json"
], function( Cldr, properties, deNumbers, enNumbers, zhNumbers, likelySubtags ) {

var de, en, zh;

Cldr.load(
	deNumbers,
	enNumbers,
	likelySubtags,
	zhNumbers
);

de = new Cldr( "de" );
en = new Cldr( "en" );
zh = new Cldr( "zh" );

QUnit.module( "Currency Code Properties" );

QUnit.test( "should return appropriate properties", function( assert ) {
	assert.deepEqual( properties( "USD", en ), {
		"currency": "USD",
		"pattern": "#,##0.###",
		"unitPatterns": {
			"unitPattern-count-one": "{0} {1}",
			"unitPattern-count-other": "{0} {1}"
		}
	});
	assert.deepEqual( properties( "EUR", de ), {
		"currency": "EUR",
		"pattern": "#,##0.###",
		"unitPatterns": {
			"unitPattern-count-one": "{0} {1}",
			"unitPattern-count-other": "{0} {1}"
		}
	});
	assert.deepEqual( properties( "CNY", zh ), {
		"currency": "CNY",
		"pattern": "#,##0.###",
		"unitPatterns": {
			"unitPattern-count-other": "{0}{1}"
		}
	});
});

});
