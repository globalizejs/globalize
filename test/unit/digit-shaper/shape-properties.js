define([
	"cldr",
	"src/digit-shaper/properties",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json"
], function( Cldr, properties, arNumbers, likelySubtags ) {

var ar;

Cldr.load(
	arNumbers,
	likelySubtags
);

ar = new Cldr( "ar" );

QUnit.module( "Digit Shape Properties" );

QUnit.test( "should return shaperType", function( assert ) {
	assert.equal( properties( ar, { "shaperType": "National", "textDir": "rtl" } ).shaperType, "National" );
	assert.equal( properties( ar, { "shaperType": "Contextual", "textDir": "rtl" } ).shaperType, "Contextual" );
});

QUnit.test( "should return textDir", function( assert ) {
	assert.equal( properties( ar, { "shaperType": "National", "textDir": "rtl" } ).textDir, "rtl" );
	assert.equal( properties( ar, { "shaperType": "Contextual", "textDir": "ltr" } ).textDir, "ltr" );
	assert.equal( properties( ar, { "shaperType": "Contextual", "textDir": "auto" } ).textDir, "auto" );
});

QUnit.test( "should return arabic locale", function( assert ) {
	assert.equal( properties( ar, { "shaperType": "National", "textDir": "rtl" } ).locale, "ar" );
});

QUnit.test( "should return digits map for both Arabic digits", function( assert ) {
	assert.deepEqual( properties( ar, { "shaperType": "National", "textDir": "rtl" } ).nuDigitsMap, {
		"0": "٠",
		"1": "١",
		"2": "٢",
		"3": "٣",
		"4": "٤",
		"5": "٥",
		"6": "٦",
		"7": "٧",
		"8": "٨",
		"9": "٩",
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

});
