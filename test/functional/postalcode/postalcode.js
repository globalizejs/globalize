define([
	"globalize",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/postalCodeData.json",
	"../../util",
	"json!./dummy/kr.json",
	"json!./dummy/us.json",

	"globalize/postalcode"

], function( Globalize, likelySubtags, postalcode, util, kr, us ) {

	QUnit.module( ".validatePostalCode( value )", {
		setup: function() {
			Globalize.load( likelySubtags, {
				main: {
					ko: {}
				}
			});
			Globalize.locale( "ko" );
		},
		teardown: util.resetCldrContent
	});

	QUnit.test( "should validate parameters", function( assert ) {
		util.assertParameterPresence( assert, "value", function() {
			Globalize.validatePostalCode();
		});

		util.assertStringParameter( assert, "value", function( invalidValue ) {
			return function() {
				Globalize.validatePostalCode( invalidValue );
			};
		});
	});

	QUnit.test( "should validate CLDR content", function( assert ) {
		util.assertCldrContent( assert, function() {
			Globalize.validatePostalCode( "427-090" );
		});
	});
	QUnit.test( "should return boolean", function( assert ) {
		Globalize.load( postalcode );
		assert.strictEqual( Globalize.validatePostalCode( "427-090" ), true );
		assert.strictEqual( Globalize.validatePostalCode( "4270-090" ), false );
		assert.strictEqual( Globalize.validatePostalCode( "427-0090" ), false );
		assert.strictEqual( Globalize.validatePostalCode( "427090" ), false );
		assert.strictEqual( Globalize.validatePostalCode( "thisistest" ), false );

		assert.strictEqual( Globalize( "und-AD" ).validatePostalCode( "AD123" ), true );
		assert.strictEqual( Globalize( "und-AD" ).validatePostalCode( "ad345" ), false );

		assert.strictEqual( Globalize( "en" ).validatePostalCode( "12345" ), true );
		assert.strictEqual( Globalize( "en" ).validatePostalCode( "12345-6789" ), true );
		assert.strictEqual( Globalize( "en" ).validatePostalCode( "12345-67899" ), false );
		assert.strictEqual( Globalize( "en" ).validatePostalCode( "12345 6789" ), true );
		assert.strictEqual( Globalize( "en" ).validatePostalCode( "12345 67899" ), false );

		assert.strictEqual( Globalize( "ar" ).validatePostalCode( "12345" ), true );
		assert.strictEqual( Globalize( "ar" ).validatePostalCode( "123456" ), false );
		assert.strictEqual( Globalize( "ar" ).validatePostalCode( "12345-12" ), false );

		assert.strictEqual( Globalize( "ja" ).validatePostalCode( "123-4567" ), true );
		assert.strictEqual( Globalize( "ja" ).validatePostalCode( "123-456" ), false );
		assert.strictEqual( Globalize( "ja" ).validatePostalCode( "1234-567" ), false );
		assert.strictEqual( Globalize( "ja" ).validatePostalCode( "1234567" ), false );

		assert.strictEqual( Globalize( "ru" ).validatePostalCode( "123456" ), true );
		assert.strictEqual( Globalize( "ru" ).validatePostalCode( "1234567" ), false );
		assert.strictEqual( Globalize( "ru" ).validatePostalCode( "123-45" ), false );

		assert.strictEqual( Globalize( "zh" ).validatePostalCode( "123456" ), true );
		assert.strictEqual( Globalize( "zh" ).validatePostalCode( "123-45" ), false );
		assert.strictEqual( Globalize( "zh" ).validatePostalCode( "1234567" ), false );

		assert.strictEqual( Globalize( "en" ).validatePostalCode( "12345" ), true );
		assert.strictEqual( Globalize( "en" ).validatePostalCode( "12345", "CN" ), false );
		assert.strictEqual( Globalize( "en" ).validatePostalCode( "123456" ), false );
		assert.strictEqual( Globalize( "en" ).validatePostalCode( "123456", "CN" ), true );
		assert.strictEqual( Globalize( "en" ).validatePostalCode( "12345-6789" ), true );
		assert.strictEqual( Globalize( "en" ).validatePostalCode( "12345-6789", "CN" ), false );

		assert.strictEqual( Globalize.postalCodeValidator()( "123-456" ), true );
		assert.strictEqual( Globalize.postalCodeValidator( "US" )( "12345" ), true );
		assert.strictEqual( Globalize.postalCodeValidator( "CN" )( "12345" ), false );
		assert.strictEqual( Globalize.postalCodeValidator( "US" )( "123456" ), false );
		assert.strictEqual( Globalize.postalCodeValidator( "CN" )( "123456" ), true );
		assert.strictEqual( Globalize.postalCodeValidator( "US" )( "12345-6789" ), true );
		assert.strictEqual( Globalize.postalCodeValidator( "CN" )( "12345-6789" ), false );

		kr.features.forEach(function( item ){
			assert.strictEqual( Globalize( "ko" ).validatePostalCode( item.properties.Postcode ), true );
		});
		us.features.forEach(function( item ){
			assert.strictEqual( Globalize( "us" ).validatePostalCode( item.properties.Postcode ), true );
		});
	});

});
