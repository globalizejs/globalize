define([
	"globalize",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/plurals.json",
	"../../util",

	"cldr/unresolved",
	"globalize/message",
	"globalize/plural"
], function( Globalize, likelySubtags, plurals, util ) {

QUnit.assert.messageFormatter = function( locale, path, variables, expected ) {
	if ( arguments.length === 3 ) {
		expected = variables;
		variables = undefined;
	}
	this.equal( Globalize( locale ).messageFormatter( path )( variables ), expected );
};

QUnit.module( ".messageFormatter( path )", {
	setup: function() {
		Globalize.load( likelySubtags );
		Globalize.load( plurals );
		Globalize.loadMessages({
			root: {
				amen: "Amen"
			},
			pt: {
				amen: "Amém"
			},
			zh: {
				amen: "阿门"
			},
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
				]
			}
		});
	},
	teardown: util.resetCldrContent
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
});

});
