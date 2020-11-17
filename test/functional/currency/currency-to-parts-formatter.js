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
	narrow = { symbolForm: "narrow" },
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

QUnit.module( ".currencyToPartsFormatter( currency [, options] )", {
	beforeEach: function() {
		Globalize.load( likelySubtags, {
			main: {
				en: {}
			}
		});
		Globalize.locale( "en" );
	},
	afterEach: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "currency", function() {
		Globalize.currencyToPartsFormatter();
	});

	util.assertCurrencyParameter( assert, "currency", function( invalidValue ) {
		return function() {
			Globalize.currencyToPartsFormatter( invalidValue );
		};
	});

	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.currencyToPartsFormatter( "USD", invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.currencyToPartsFormatter( "USD" );
	});
});

QUnit.test( "should un-register event listener", function( assert ) {
	try {
		Globalize.currencyToPartsFormatter( "USD" );
	} catch ( error ) {
		assert.equal( Globalize.cldr.ee.getListeners( "get" ).length, 0 );
	}
});

QUnit.test( "should return a currency formatter", function( assert ) {
	var de, zh;

	extraSetup();

	de = Globalize( "de" );
	zh = Globalize( "zh" );

	assert.deepEqual( Globalize.currencyToPartsFormatter( "USD" )( teslaS ), [
		{
			"type": "currency",
			"value": "$"
		},
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "900"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "00"
		}
	]);
	assert.deepEqual( de.currencyToPartsFormatter( "USD" )( teslaS ), [
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": "."
		},
		{
			"type": "integer",
			"value": "900"
		},
		{
			"type": "decimal",
			"value": ","
		},
		{
			"type": "fraction",
			"value": "00"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "currency",
			"value": "$"
		}
	]);
	assert.deepEqual( zh.currencyToPartsFormatter( "USD" )( teslaS ), [
		{
			"type": "currency",
			"value": "US$"
		},
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "900"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "00"
		}
	]);

	assert.deepEqual( Globalize.currencyToPartsFormatter( "USD" )( -teslaS ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "currency",
			"value": "$"
		},
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "900"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "00"
		}
	]);
	assert.deepEqual( de.currencyToPartsFormatter( "USD" )( -teslaS ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": "."
		},
		{
			"type": "integer",
			"value": "900"
		},
		{
			"type": "decimal",
			"value": ","
		},
		{
			"type": "fraction",
			"value": "00"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "currency",
			"value": "$"
		}
	]);
	assert.deepEqual( zh.currencyToPartsFormatter( "USD" )( -teslaS ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "currency",
			"value": "US$"
		},
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "900"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "00"
		}
	]);

	assert.deepEqual( Globalize.currencyToPartsFormatter( "HKD", narrow )( teslaS ), [
		{
			"type": "currency",
			"value": "$"
		},
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "900"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "00"
		}
	]);

	assert.deepEqual( Globalize.currencyToPartsFormatter( "USD", code )( teslaS ), [
		{
			"type": "currency",
			"value": "USD"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "900"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "00"
		}
	]);
	assert.deepEqual( de.currencyToPartsFormatter( "USD", code )( teslaS ), [
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": "."
		},
		{
			"type": "integer",
			"value": "900"
		},
		{
			"type": "decimal",
			"value": ","
		},
		{
			"type": "fraction",
			"value": "00"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "currency",
			"value": "USD"
		}
	]);
	assert.deepEqual( zh.currencyToPartsFormatter( "USD", code )( teslaS ), [
		{
			"type": "currency",
			"value": "USD"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "900"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "00"
		}
	]);

	assert.deepEqual( Globalize.currencyToPartsFormatter( "USD", name )( teslaS ), [
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "900"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "00"
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
	assert.deepEqual( de.currencyToPartsFormatter( "USD", name )( teslaS ), [
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": "."
		},
		{
			"type": "integer",
			"value": "900"
		},
		{
			"type": "decimal",
			"value": ","
		},
		{
			"type": "fraction",
			"value": "00"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "currency",
			"value": "US-Dollar"
		}
	]);
	assert.deepEqual( zh.currencyToPartsFormatter( "USD", name )( teslaS ), [
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "900"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "00"
		},
		{
			"type": "currency",
			"value": "美元"
		}
	]);

	assert.deepEqual( Globalize.currencyToPartsFormatter( "USD", accounting )( -1 ), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "currency",
			"value": "$"
		},
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "00"
		},
		{
			"type": "literal",
			"value": ")"
		}
	]);
});

// The number of decimal places and the rounding for each currency is not locale-specific data.
// Those values are overriden by Supplemental Currency Data.
QUnit.test( "should return a currency formatter, overriden by Supplemental Currency Data",
			function( assert ) {
	extraSetup();

	assert.deepEqual( Globalize.currencyToPartsFormatter( "CLF" )( 12345 ), [
		{
			"type": "currency",
			"value": "CLF"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "345"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "0000"
		}
	]);
	assert.deepEqual( Globalize.currencyToPartsFormatter( "CLF" )( 12345.67 ), [
		{
			"type": "currency",
			"value": "CLF"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "345"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "6700"
		}
	]);
	assert.deepEqual( Globalize.currencyToPartsFormatter( "ZWD" )( 12345 ), [
		{
			"type": "currency",
			"value": "ZWD"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "345"
		}
	]);
	assert.deepEqual( Globalize.currencyToPartsFormatter( "ZWD" )( 12345.67 ), [
		{
			"type": "currency",
			"value": "ZWD"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "346"
		}
	]);
	assert.deepEqual( Globalize.currencyToPartsFormatter( "JPY" )( 12345.67 ), [
		{
			"type": "currency",
			"value": "¥"
		},
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "346"
		}
	]);

	assert.deepEqual( Globalize.currencyToPartsFormatter( "CLF", code )( 12345.67 ), [
		{
			"type": "currency",
			"value": "CLF"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "345"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "6700"
		}
	]);

	assert.deepEqual( Globalize.currencyToPartsFormatter( "CLF", name )( 12345.67 ), [
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "345"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "6700"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "currency",
			"value": "Chilean units of account (UF)"
		}
	]);
});

// User options should override everything.
QUnit.test( "should return a currency formatter, overriden by user options",
			function( assert ) {
	extraSetup();

	assert.deepEqual( Globalize.currencyToPartsFormatter( "CLF", {
		minimumFractionDigits: 0
	})( 12345 ), [
		{
			"type": "currency",
			"value": "CLF"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "345"
		}
	]);

	assert.deepEqual( Globalize.currencyToPartsFormatter( "JPY", {
		maximumFractionDigits: 0
	})( 12345 ), [
		{
			"type": "currency",
			"value": "¥"
		},
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "345"
		}
	]);

	assert.deepEqual( Globalize.currencyToPartsFormatter( "JPY", {
		minimumFractionDigits: 2
	})( 12345 ), [
		{
			"type": "currency",
			"value": "¥"
		},
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "345"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "00"
		}
	]);

	assert.deepEqual( Globalize.currencyToPartsFormatter( "CLF", {
		style: "code",
		minimumFractionDigits: 0
	})( 12345 ), [
		{
			"type": "currency",
			"value": "CLF"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "345"
		}
	]);

	assert.deepEqual( Globalize.currencyToPartsFormatter( "CLF", {
		style: "name",
		minimumFractionDigits: 0
	})( 12345 ), [
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "345"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "currency",
			"value": "Chilean units of account (UF)"
		}
	]);
});

});
