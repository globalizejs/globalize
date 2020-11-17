define([
	"globalize",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/es/numbers.json",
	"json!cldr-data/main/zh/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"../../util",

	"globalize/number"
], function( Globalize, arNumbers, enNumbers, esNumbers, zhNumbers, likelySubtags, numberingSystems,
	util ) {

var pi = 3.14159265359;

function extraSetup() {
	Globalize.load(
		arNumbers,
		enNumbers,
		esNumbers,
		zhNumbers,
		numberingSystems
	);
}

QUnit.module( ".formatNumberToParts( value [, options] )", {
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
	util.assertParameterPresence( assert, "value", function() {
		Globalize.formatNumberToParts();
	});

	util.assertNumberParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.formatNumberToParts( invalidValue );
		};
	});

	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.formatNumberToParts( 7, invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.formatNumberToParts( pi );
	});
});

QUnit.test( "should un-register event listener", function( assert ) {
	try {
		Globalize.formatNumberToParts( pi );
	} catch ( error ) {
		assert.equal( Globalize.cldr.ee.getListeners( "get" ).length, 0 );
	}
});

QUnit.test( "should format decimal style", function( assert ) {
	extraSetup();

	assert.deepEqual( Globalize.formatNumberToParts( pi ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "142"
		}
	]);
	assert.deepEqual( Globalize( "es" ).formatNumberToParts( pi ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": ","
		},
		{
			"type": "fraction",
			"value": "142"
		}
	]);
	assert.deepEqual( Globalize( "ar" ).formatNumberToParts( pi ), [
		{
			"type": "integer",
			"value": "٣"
		},
		{
			"type": "decimal",
			"value": "٫"
		},
		{
			"type": "fraction",
			"value": "١٤٢"
		}
	]);
	assert.deepEqual( Globalize( "zh-u-nu-native" ).formatNumberToParts( pi ), [
		{
			"type": "integer",
			"value": "三"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "一四二"
		}
	]);
	assert.deepEqual( Globalize.formatNumberToParts( 99999999.99 ), [
		{
			"type": "integer",
			"value": "99"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "999"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "999"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "99"
		}
	]);

	assert.deepEqual( Globalize.formatNumberToParts( pi, {
		minimumIntegerDigits: 2,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}), [
		{
			"type": "integer",
			"value": "03"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		}
	]);

	assert.deepEqual( Globalize.formatNumberToParts( pi, {
		maximumFractionDigits: 0
	}), [
		{
			"type": "integer",
			"value": "3"
		}
	]);

	assert.deepEqual( Globalize.formatNumberToParts( 1.1, {
		minimumFractionDigits: 3
	}), [
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
			"value": "100"
		}
	]);

	assert.deepEqual( Globalize.formatNumberToParts( pi, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3
	}), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		}
	]);

	assert.deepEqual( Globalize.formatNumberToParts( 12345, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3
	}), [
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
			"value": "300"
		}
	]);

	assert.deepEqual( Globalize.formatNumberToParts( 0.00012345, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3
	}), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "000123"
		}
	]);

	assert.deepEqual( Globalize.formatNumberToParts( 0.00010001, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3
	}), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "0001"
		}
	]);

	assert.deepEqual( Globalize.formatNumberToParts( 99999999.99, { useGrouping: false } ), [
		{
			"type": "integer",
			"value": "99999999"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "99"
		}
	]);

	assert.deepEqual( Globalize.formatNumberToParts( 0, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3
	}), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "0"
		}
	]);
});

QUnit.test( "should format percent style", function( assert ) {
	extraSetup();

	assert.deepEqual( Globalize.formatNumberToParts( pi, { style: "percent" } ), [
		{
			"type": "integer",
			"value": "314"
		},
		{
			"type": "percentSign",
			"value": "%"
		}
	]);
	assert.deepEqual( Globalize( "ar" ).formatNumberToParts( pi, { style: "percent" } ), [
		{
			"type": "integer",
			"value": "٣١٤"
		},
		{
			"type": "percentSign",
			"value": "٪"
		}
	]);
});

});
