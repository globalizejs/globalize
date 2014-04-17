define([
	"cldr",
	"globalize/plural/form",
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

module( "Plural Form" );

test( "should get plural form of different locales", function() {
	equal( pluralForm( 0, en ), "other", "" );
	equal( pluralForm( 1, en ), "one", "" );
	equal( pluralForm( 2, en ), "other", "" );
	equal( pluralForm( 1412, en ), "other", "" );
	equal( pluralForm( 0.14, en ), "other", "" );
	equal( pluralForm( 3.14, en ), "other", "" );

	equal( pluralForm( 0, ar ), "zero", "" );
	equal( pluralForm( 1, ar ), "one", "" );
	equal( pluralForm( 2, ar ), "two", "" );
	equal( pluralForm( 3, ar ), "few", "" );
	equal( pluralForm( 6, ar ), "few", "" );
	equal( pluralForm( 9, ar ), "few", "" );
	equal( pluralForm( 10, ar ), "few", "" );
	equal( pluralForm( 11, ar ), "many", "" );
	equal( pluralForm( 15, ar ), "many", "" );
	equal( pluralForm( 21, ar ), "many", "" );
	equal( pluralForm( 70, ar ), "many", "" );
	equal( pluralForm( 99, ar ), "many", "" );
	equal( pluralForm( 100, ar ), "other", "" );
	equal( pluralForm( 101, ar ), "other", "" );
	equal( pluralForm( 102, ar ), "other", "" );
	equal( pluralForm( 103, ar ), "few", "" );
	equal( pluralForm( 111, ar ), "many", "" );
	equal( pluralForm( 199, ar ), "many", "" );
	equal( pluralForm( 3.14, ar ), "few", "" );

	equal( pluralForm( 0, ja ), "other", "" );
	equal( pluralForm( 1, ja ), "other", "" );
	equal( pluralForm( 2, ja ), "other", "" );
	equal( pluralForm( 3.14, ja ), "other", "" );

	equal( pluralForm( 0, pt ), "other", "" );
	equal( pluralForm( 1, pt ), "one", "" );
	equal( pluralForm( 2, pt ), "other", "" );
	equal( pluralForm( 0.1, pt ), "one", "" );
	equal( pluralForm( 3.14, pt ), "other", "" );

	equal( pluralForm( 0, ru ), "many", "" );
	equal( pluralForm( 1, ru ), "one", "" );
	equal( pluralForm( 2, ru ), "few", "" );
	equal( pluralForm( 3, ru ), "few", "" );
	equal( pluralForm( 4, ru ), "few", "" );
	equal( pluralForm( 5, ru ), "many", "" );
	equal( pluralForm( 6, ru ), "many", "" );
	equal( pluralForm( 9, ru ), "many", "" );
	equal( pluralForm( 11, ru ), "many", "" );
	equal( pluralForm( 12, ru ), "many", "" );
	equal( pluralForm( 19, ru ), "many", "" );
	equal( pluralForm( 21, ru ), "one", "" );
	equal( pluralForm( 22, ru ), "few", "" );
	equal( pluralForm( 29, ru ), "many", "" );
	equal( pluralForm( 3.14, ru ), "other", "" );

	equal( pluralForm( 0, zh ), "other", "" );
	equal( pluralForm( 1, zh ), "other", "" );
	equal( pluralForm( 2, zh ), "other", "" );
	equal( pluralForm( 3.14, zh ), "other", "" );
});

});
