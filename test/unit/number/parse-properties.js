define([
	"cldr",
	"src/number/parse-properties",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/es/numbers.json",
	"json!cldr-data/main/fa/numbers.json",
	"json!cldr-data/main/sv/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, properties, arNumbers, enNumbers, esNumbers, faNumbers, svNumbers,
	likelySubtags ) {

var ar, fa, en, es, sv;

Cldr.load(
	arNumbers,
	enNumbers,
	esNumbers,
	faNumbers,
	svNumbers,
	likelySubtags
);

ar = new Cldr( "ar" );
en = new Cldr( "en" );
es = new Cldr( "es" );
fa = new Cldr( "fa" );
sv = new Cldr( "sv" );

QUnit.module( "Number Parse Properties" );

QUnit.test( "should return invertedSymbolMap", function( assert ) {
	assert.deepEqual( properties( "0", es )[ 0 ], {
		"%": "%",
		"+": "+",
		",": ".",
		"-": "-",
		".": ",",
		"E": "E",
		"‰": "‰"
	});

	// Note grouping separator is using regular U+0020 SPACE due to loose matching.
	assert.deepEqual( properties( "0", sv )[ 0 ], {
		"%": "%",
		"+": "+",
		",": ".",
		" ": ",",
		"×10^": "E",
		"‰": "‰",
		"-": "-"
	});
});

QUnit.test( "should return invertedNuDigitsMap", function( assert ) {
	assert.deepEqual( properties( "0", ar )[ 1 ], {
		"٠": "0",
		"١": "1",
		"٢": "2",
		"٣": "3",
		"٤": "4",
		"٥": "5",
		"٦": "6",
		"٧": "7",
		"٨": "8",
		"٩": "9"
	});
});

QUnit.test( "should return infinity tokenizer", function( assert ) {
	assert.deepEqual( properties( "0", en )[ 2 ].infinity, /^∞/ );
});

QUnit.test( "should return NaN tokenizer", function( assert ) {
	assert.deepEqual( properties( "0", en )[ 2 ].nan, /^NaN/ );
	assert.deepEqual( properties( "0", ar )[ 2 ].nan, /^ليس رقم/ );
});

QUnit.test( "should return negativePrefix tokenizer", function( assert ) {
	assert.deepEqual( properties( "0", en )[ 2 ].negativePrefix, /^-/ );
	assert.deepEqual( properties( "0;(0)", en )[ 2 ].negativePrefix, /^\(/ );
	});

QUnit.test( "should return negativeSuffix tokenizer", function( assert ) {
	assert.deepEqual( properties( "0", en )[ 2 ].negativeSuffix, /^/ );
	assert.deepEqual( properties( "0;(0)", en )[ 2 ].negativeSuffix, /^\)/ );
});

QUnit.test( "should return number tokenizer", function( assert ) {
	assert.deepEqual( properties( "0", en )[ 2 ].number, /^\d+/ );
	assert.deepEqual( properties( "0.##", en )[ 2 ].number, /^(\d+(\.\d+|\.)?|(\d+)?\.\d+)/ );

	assert.deepEqual(
		properties( "#,##0.##", en )[ 2 ].number,
		/^((\d{1,3}(,\d{3})+|\d+)(\.\d+|\.)?|((\d{1,3}(,\d{3})+|\d+))?\.\d+)/
	);

	assert.deepEqual(
		properties( "#,##0.##", es )[ 2 ].number,
		/^((\d{1,3}(\.\d{3})+|\d+)(,\d+|,)?|((\d{1,3}(\.\d{3})+|\d+))?,\d+)/
	);

	assert.deepEqual(
		properties( "#,##,##0.##", en )[ 2 ].number,
		/^((\d{1,2}((,\d{2})*(,\d{3}))|\d+)(\.\d+|\.)?|((\d{1,2}((,\d{2})*(,\d{3}))|\d+))?\.\d+)/
	);

	assert.deepEqual(
		properties( "#,##0.##", sv )[ 2 ].number,
		/^((\d{1,3}( \d{3})+|\d+)(,\d+|,)?|((\d{1,3}( \d{3})+|\d+))?,\d+)/
	);
});

QUnit.test( "should return prefix tokenizer", function( assert ) {
	assert.deepEqual( properties( "%0", en )[ 2 ].prefix, /^%/ );
	assert.deepEqual( properties( "'$'0.##", en )[ 2 ].prefix, /^\$/ );
	assert.deepEqual( properties( "'$ '0.##", en )[ 2 ].prefix, /^\$ / );
	assert.deepEqual( properties( "'foo''bar'0.##", en )[ 2 ].prefix, /^foo'bar/ );
	assert.deepEqual( properties( "-'foo''bar'0.##", en )[ 2 ].prefix, /^-foo'bar/ );
});

QUnit.test( "should return suffix tokenizer", function( assert ) {
	assert.deepEqual( properties( "#,##0%", en )[ 2 ].suffix, /^%/ );
	assert.deepEqual( properties( "#,##0 %", ar )[ 2 ].suffix, /^ ٪/ );
});

});
