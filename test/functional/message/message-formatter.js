define([
	"globalize",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"json!cldr-data/supplemental/currencyData.json",
	"json!cldr-data/supplemental/plurals.json",
	"json!cldr-data/supplemental/ordinals.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/en/units.json",
	"json!cldr-data/main/en/currencies.json",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/main/en/timeZoneNames.json",
	"json!cldr-data/main/en/dateFields.json",
	"json!iana-tz-data.json",
	"../../util",

	"cldr/unresolved",
	"globalize/message",
	"globalize/plural"
], function( Globalize, likelySubtags, numberingSystems, currencyData, plurals,
	ordinals, timeData, weekData, enNumbers, enUnitFields, enCurrencies, enCaGregorian,
	enTimeZoneNames, enDateFields, ianaTimezoneData, util ) {

function extraSetup() {
	Globalize.load(
		numberingSystems,
		currencyData,
		enNumbers,
		enUnitFields,
		enCurrencies,
		timeData,
		weekData,
		enCaGregorian,
		enTimeZoneNames,
		enDateFields
	);
	Globalize.loadTimeZone( ianaTimezoneData );
}

QUnit.assert.messageFormatter = function( locale, path, variables, expected ) {
	if ( arguments.length === 3 ) {
		expected = variables;
		variables = undefined;
	}
	this.equal( Globalize( locale ).messageFormatter( path )( variables ), expected );
};

QUnit.assert.messageBundlePresence = function( fn ) {
	this.throws( fn, function E_MISSING_MESSAGE_BUNDLE( error ) {
		return error.code === "E_MISSING_MESSAGE_BUNDLE" &&
			"locale" in error;
	}, "Expected \"E_MISSING_MESSAGE_BUNDLE\" to be thrown" );
};

QUnit.module( ".messageFormatter( path )", {
	setup: function() {
		Globalize.load( likelySubtags );
		Globalize.load( plurals );
		Globalize.load( ordinals );
		Globalize.loadMessages({
			root: {
				amen: "Amen"
			},
			de: {},
			en: {
				greetings: {
					hello: "Hello",
					helloArray: "Hello, {0}",
					helloArray2: "Hello, {0} and {1}",
					helloName: "Hello, {name}"
				},
				like: [
					"{count, plural, offset:1",
					"     =0 {Be the first to like this}",
					"     =1 {You liked this}",
					"    one {You and {someone} liked this}",
					"  other {You and # others liked this}",
					"}"
				],
				party: [
					"{hostGender, select,",
					"  female {{host} invites {guest} to her party}",
					"    male {{host} invites {guest} to his party}",
					"   other {{host} invites {guest} to their party}",
					"}"
				],
				task: [
					"You have {0, plural,",
					"    one {one task}",
					"  other {# tasks}",
					"} remaining"
				],
				ordinal: [
					"{cat, selectordinal, one{#st} two{#nd} few{#rd} other{#th} }",
					"category"
				],
				date: {
					date: "date: {x, date, long}",
					time: "time: {x, time, long}",
					datetime: "datetime: {x, datetime, long}",
					raw: "date raw: {x, date,  y-M-d HH:mm:ss zzzz  }",
					rawComma: "date raw comma: {x, date,  y-M-d, HH:mm:ss zzzz  }",
					skeleton: "date skeleton: {x, date, skeleton, GyMMMEdhms}",
					skeletonInvalid: "date skeleton: {x, date, skeleton}"
				},
				relativetime: {
					default: "relativetime: {x, relativetime, minute}",
					short: "relativetime short: {x, relativetime, minute, short}",
					narrow: "relativetime narrow: {x, relativetime, minute, narrow}"
				},
				number: {
					decimal: "number decimal: {x, number}",
					percent: "number percent: {x, number, percent}"
				},
				currency: {
					symbol: "currency symbol: {x, currency, USD}",
					accounting: "currency accounting: {x, currency, USD, accounting}",
					code: "currency code: {x, currency, USD, code}",
					name: "currency name: {x, currency, USD, name}"
				},
				unit: {
					long: "unit long: {x, unit, second, long}",
					short: "unit short: {x, unit, second, short}",
					narrow: "unit narrow: {x, unit, second, narrow}"
				}
			},
			"en-GB": {},
			fr: {},
			pt: {
				amen: "Amém"
			},
			"pt-PT": {},
			zh: {
				amen: "阿门"
			}
		});
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should pass test's prerequisites", function( assert ) {
	var sr = new Globalize( "sr" );

	// OBS: Ensure `sr` cldr/main dataset hasn't being loaded elsewhere. It's a prerequisites for
	// the below messageBundlePresence test.
	assert.deepEqual( sr.cldr.attributes.bundle, null, "`sr` cldr/main dataset cannot be loaded" );
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "path", function() {
		Globalize( "en" ).messageFormatter();
	});

	util.assertPathParameter( assert, "path", function( invalidValue ) {
		return function() {
			Globalize( "en" ).messageFormatter( invalidValue );
		};
	});
});

QUnit.test( "should validate messages", function( assert ) {
	assert.messageBundlePresence(function() {
		Globalize( "sr" ).messageFormatter( "path" );
	});

	util.assertMessagePresence( assert, "non-existent/path", function() {
		Globalize( "en" ).messageFormatter( "non-existent/path" );
	});

	util.assertMessageType( assert, "invalid-message", function( invalidValue ) {
		Globalize.loadMessages({
			en: {
				"invalid-message": invalidValue
			}
		});
		return function() {
			Globalize( "en" ).messageFormatter( "invalid-message" );
		};
	});
});

QUnit.test( "should return the loaded translation", function( assert ) {
	assert.messageFormatter( "pt", "amen", "Amém" );
	assert.messageFormatter( "zh", "amen", "阿门" );
});

QUnit.test( "should traverse the translation data", function( assert ) {
	assert.messageFormatter( "en", "greetings/hello", "Hello" );
	assert.messageFormatter( "en", [ "greetings", "hello" ], "Hello" );
});

QUnit.test( "should return inherited translation if cldr/unresolved is loaded", function( assert ) {
	assert.messageFormatter( "en", "amen", "Amen" );
	assert.messageFormatter( "de", "amen", "Amen" );
	assert.messageFormatter( "en-GB", "amen", "Amen" );
	assert.messageFormatter( "fr", "amen", "Amen" );
	assert.messageFormatter( "pt-PT", "amen", "Amém" );
});

QUnit.test( "should support ICU message format", function( assert ) {
	var like;

	// Var replacement
	assert.messageFormatter( "en", "greetings/helloArray", [ "Beethoven" ], "Hello, Beethoven" );
	assert.messageFormatter( "en", "greetings/helloArray", "Beethoven", "Hello, Beethoven" );
	assert.messageFormatter( "en", "greetings/helloArray2", [ "Beethoven", "Mozart" ],
		"Hello, Beethoven and Mozart" );
	assert.equal(
		Globalize( "en" ).messageFormatter( "greetings/helloArray2" )( "Beethoven", "Mozart" ),
		"Hello, Beethoven and Mozart"
	);
	assert.messageFormatter( "en", "greetings/helloName", {
		name: "Beethoven"
	}, "Hello, Beethoven" );

	// Plural
	assert.messageFormatter( "en", "task", 123, "You have 123 tasks remaining" );

	// Select
	assert.messageFormatter( "en", "party", {
		guest: "Mozart",
		host: "Beethoven",
		hostGender: "male"
	}, "Beethoven invites Mozart to his party" );

	// Plural offset
	like = new Globalize( "en" ).messageFormatter( "like" );
	assert.equal( like({ count: 0 }), "Be the first to like this" );

	assert.equal( like({ count: 1 }), "You liked this" );

	assert.equal( like({
		count: 2,
		someone: "Beethoven"
	}), "You and Beethoven liked this" );

	assert.equal( like({ count: 3 }), "You and 2 others liked this" );

	// Selectordinal
	assert.messageFormatter( "en", "ordinal", {
		cat: 1,
	}, "1st category" );

	assert.messageFormatter( "en", "ordinal", {
		cat: 2,
	}, "2nd category" );

	assert.messageFormatter( "en", "ordinal", {
		cat: 3,
	}, "3rd category" );

	assert.messageFormatter( "en", "ordinal", {
		cat: 4,
	}, "4th category" );
});

QUnit.test( "should support formatters in messages", function( assert ) {
	extraSetup();

	var date = new Date( 2010, 8, 15, 17, 35, 7, 369 );

	assert.messageFormatter( "en", "date/date", {
		x: date,
	}, "date: September 15, 2010" );
	assert.messageFormatter( "en", "date/time", {
		x: date,
	}, "time: 5:35:07 PM GMT+2" );
	assert.messageFormatter( "en", "date/datetime", {
		x: date,
	}, "datetime: September 15, 2010 at 5:35:07 PM GMT+2" );
	assert.messageFormatter( "en", "date/raw", {
		x: date,
	}, "date raw:   2010-9-15 17:35:07 GMT+02:00  " );
	assert.messageFormatter( "en", "date/rawComma", {
		x: date,
	}, "date raw comma:   2010-9-15, 17:35:07 GMT+02:00  " );
	assert.messageFormatter( "en", "date/skeleton", {
		x: date,
	}, "date skeleton: Wed, Sep 15, 2010 AD, 5:35:07 PM" );
	assert.messageFormatter( "en", "date/skeletonInvalid", {
		x: date,
	}, "date skeleton:  7174l4ton" );

	assert.messageFormatter( "en", "relativetime/default", {
		x: 2,
	}, "relativetime: in 2 minutes" );
	assert.messageFormatter( "en", "relativetime/default", {
		x: -2,
	}, "relativetime: 2 minutes ago" );
	assert.messageFormatter( "en", "relativetime/short", {
		x: 2,
	}, "relativetime short: in 2 min." );
	assert.messageFormatter( "en", "relativetime/short", {
		x: -2,
	}, "relativetime short: 2 min. ago" );
	assert.messageFormatter( "en", "relativetime/narrow", {
		x: 2,
	}, "relativetime narrow: in 2 min." );
	assert.messageFormatter( "en", "relativetime/narrow", {
		x: -2,
	}, "relativetime narrow: 2 min. ago" );

	assert.messageFormatter( "en", "number/decimal", {
		x: 0.5,
	}, "number decimal: 0.5" );
	assert.messageFormatter( "en", "number/percent", {
		x: 0.5,
	}, "number percent: 50%" );

	assert.messageFormatter( "en", "currency/symbol", {
		x: 100,
	}, "currency symbol: $100.00" );
	assert.messageFormatter( "en", "currency/accounting", {
		x: 100,
	}, "currency accounting: $100.00" );
	assert.messageFormatter( "en", "currency/code", {
		x: 100,
	}, "currency code: 100.00 USD" );
	assert.messageFormatter( "en", "currency/name", {
		x: 100,
	}, "currency name: 100.00 US dollars" );

	assert.messageFormatter( "en", "unit/long", {
		x: 42,
	}, "unit long: 42 seconds" );
	assert.messageFormatter( "en", "unit/short", {
		x: 42,
	}, "unit short: 42 sec" );
	assert.messageFormatter( "en", "unit/narrow", {
		x: 42,
	}, "unit narrow: 42s" );
});

// Reference #473
QUnit.test( "should NOT merge array data", function( assert ) {
	// Re-loading a message that uses array syntax.
	Globalize.loadMessages({
		en: {
			task: [
				"You have {0, plural,",
				"    one {one task}",
				"  other {# tasks}",
				"} remaining"
			]
		}
	});
	assert.messageFormatter( "en", "task", 123, "You have 123 tasks remaining" );
});

});
