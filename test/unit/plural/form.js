define([
	"cldr",
	"src/plural/form",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"json!fixtures/cldr/supplemental/plurals.json"
], function( Cldr, pluralForm, likelySubtags, plurals ) {

var ar, en, ja, pt, ru, zh;

Cldr.load( likelySubtags );
Cldr.load( plurals );

ar = new Cldr( "ar" );
en = new Cldr( "en" );
ja = new Cldr( "ja" );
pt = new Cldr( "pt" );
ru = new Cldr( "ru" );
zh = new Cldr( "zh" );

QUnit.module( "Plural Form" );

QUnit.test( "should return plural form of different locales", function( assert ) {
	assert.equal( pluralForm( 0, en ), "other" );
	assert.equal( pluralForm( 1, en ), "one" );
	assert.equal( pluralForm( 2, en ), "other" );
	assert.equal( pluralForm( 1412, en ), "other" );
	assert.equal( pluralForm( 0.14, en ), "other" );
	assert.equal( pluralForm( 3.14, en ), "other" );

	assert.equal( pluralForm( 0, ar ), "zero" );
	assert.equal( pluralForm( 1, ar ), "one" );
	assert.equal( pluralForm( 2, ar ), "two" );
	assert.equal( pluralForm( 3, ar ), "few" );
	assert.equal( pluralForm( 6, ar ), "few" );
	assert.equal( pluralForm( 9, ar ), "few" );
	assert.equal( pluralForm( 10, ar ), "few" );
	assert.equal( pluralForm( 11, ar ), "many" );
	assert.equal( pluralForm( 15, ar ), "many" );
	assert.equal( pluralForm( 21, ar ), "many" );
	assert.equal( pluralForm( 70, ar ), "many" );
	assert.equal( pluralForm( 99, ar ), "many" );
	assert.equal( pluralForm( 100, ar ), "other" );
	assert.equal( pluralForm( 101, ar ), "other" );
	assert.equal( pluralForm( 102, ar ), "other" );
	assert.equal( pluralForm( 103, ar ), "few" );
	assert.equal( pluralForm( 111, ar ), "many" );
	assert.equal( pluralForm( 199, ar ), "many" );
	assert.equal( pluralForm( 3.14, ar ), "few" );

	assert.equal( pluralForm( 0, ja ), "other" );
	assert.equal( pluralForm( 1, ja ), "other" );
	assert.equal( pluralForm( 2, ja ), "other" );
	assert.equal( pluralForm( 3.14, ja ), "other" );

	assert.equal( pluralForm( 0, pt ), "other" );
	assert.equal( pluralForm( 1, pt ), "one" );
	assert.equal( pluralForm( 2, pt ), "other" );
	assert.equal( pluralForm( 0.1, pt ), "one" );
	assert.equal( pluralForm( 3.14, pt ), "other" );

	assert.equal( pluralForm( 0, ru ), "many" );
	assert.equal( pluralForm( 1, ru ), "one" );
	assert.equal( pluralForm( 2, ru ), "few" );
	assert.equal( pluralForm( 3, ru ), "few" );
	assert.equal( pluralForm( 4, ru ), "few" );
	assert.equal( pluralForm( 5, ru ), "many" );
	assert.equal( pluralForm( 6, ru ), "many" );
	assert.equal( pluralForm( 9, ru ), "many" );
	assert.equal( pluralForm( 11, ru ), "many" );
	assert.equal( pluralForm( 12, ru ), "many" );
	assert.equal( pluralForm( 19, ru ), "many" );
	assert.equal( pluralForm( 21, ru ), "one" );
	assert.equal( pluralForm( 22, ru ), "few" );
	assert.equal( pluralForm( 29, ru ), "many" );
	assert.equal( pluralForm( 3.14, ru ), "other" );

	assert.equal( pluralForm( 0, zh ), "other" );
	assert.equal( pluralForm( 1, zh ), "other" );
	assert.equal( pluralForm( 2, zh ), "other" );
	assert.equal( pluralForm( 3.14, zh ), "other" );
});

});
