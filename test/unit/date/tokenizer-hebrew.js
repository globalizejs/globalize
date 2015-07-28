define([
	"cldr",
	"src/date/tokenizer",
	"src/date/tokenizer-properties",
	"json!cldr-data/main/en/ca-hebrew.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/weekData.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, tokenizer, tokenizerProperties, enCaHebrew, enNumbers, likelySubtags,
	weekData ) {

var cldr;

// Simple number parser for this test purposes.
function simpleNumberParser( value ) {
	return +value;
}

Cldr.load(
	enCaHebrew,
	enNumbers,
	likelySubtags,
	weekData
);

cldr = new Cldr( "en-u-ca-hebrew" );

QUnit.assert.dateTokenizer = function( value, pattern, cldr, expected ) {
	this.deepEqual(
		tokenizer( value, simpleNumberParser, tokenizerProperties( pattern, cldr ) ),
		expected
	);
};

QUnit.module( "Hebrew Calendar Date Tokenizer" );

/**
 *  Era
 */

QUnit.test( "should tokenize era (G|GG|GGG)", function( assert ) {
	assert.dateTokenizer( "AM", "G", cldr, [{
		type: "G",
		lexeme: "AM",
		value: "0"
	}] );
	assert.dateTokenizer( "AM", "GG", cldr, [{
		type: "GG",
		lexeme: "AM",
		value: "0"
	}] );
	assert.dateTokenizer( "AM", "GGG", cldr, [{
		type: "GGG",
		lexeme: "AM",
		value: "0"
	}] );
});

QUnit.test( "should tokenize era (GGGG)", function( assert ) {
	assert.dateTokenizer( "AM", "GGGG", cldr, [{
		type: "GGGG",
		lexeme: "AM",
		value: "0"
	}] );
});

QUnit.test( "should tokenize era (GGGGG)", function( assert ) {
	assert.dateTokenizer( "AM", "GGGGG", cldr, [{
		type: "GGGGG",
		lexeme: "AM",
		value: "0"
	}] );
});

/**
 *  Year, quarter, week numbers and day are the same as the Gregorian calendar
 */

/**
 *  Month. Numbers are the same as Gregorian
 */

QUnit.test( "should tokenize month (MMM|LLL)", function( assert ) {
	assert.dateTokenizer( "Tishri", "MMM", cldr, [{
		type: "MMM",
		lexeme: "Tishri",
		value: "1"
	}] );
	// check for parsing months correctly
	assert.dateTokenizer( "Adar", "MMM", cldr, [{
		type: "MMM",
		lexeme: "Adar",
		value: "7"
	}] );
	assert.dateTokenizer( "Adar I", "MMM", cldr, [{
		type: "MMM",
		lexeme: "Adar I",
		value: "6"
	}] );
	assert.dateTokenizer( "Adar II", "MMM", cldr, [{
		type: "MMM",
		lexeme: "Adar II",
		value: "7-leap"
	}] );
	assert.dateTokenizer( "Tishri", "LLL", cldr, [{
		type: "LLL",
		lexeme: "Tishri",
		value: "1"
	}] );
});

QUnit.test( "should tokenize month (MMMM|LLLL)", function( assert ) {
	assert.dateTokenizer( "Tishri", "MMMM", cldr, [{
		type: "MMMM",
		lexeme: "Tishri",
		value: "1"
	}] );
	// check for parsing months correctly
	assert.dateTokenizer( "Adar", "MMMM", cldr, [{
		type: "MMMM",
		lexeme: "Adar",
		value: "7"
	}] );
	assert.dateTokenizer( "Adar I", "MMMM", cldr, [{
		type: "MMMM",
		lexeme: "Adar I",
		value: "6"
	}] );
	assert.dateTokenizer( "Adar II", "MMMM", cldr, [{
		type: "MMMM",
		lexeme: "Adar II",
		value: "7-leap"
	}] );
	assert.dateTokenizer( "Tishri", "LLLL", cldr, [{
		type: "LLLL",
		lexeme: "Tishri",
		value: "1"
	}] );
});

QUnit.test( "should tokenize month (MMMMM|LLLLL)", function( assert ) {
	assert.dateTokenizer( "1", "MMMMM", cldr, [{
		type: "MMMMM",
		lexeme: "1",
		value: "1"
	}] );
	assert.dateTokenizer( "1", "LLLLL", cldr, [{
		type: "LLLLL",
		lexeme: "1",
		value: "1"
	}] );
});

});
