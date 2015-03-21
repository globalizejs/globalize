define([
	"globalize",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/postalCodeData.json",
	"../../util",

	"globalize/postalcode"
], function( Globalize, likelySubtags, postalcode, util ) {

	QUnit.module( ".validatePostalCode( value )", {
		setup: function() {
			Globalize.load( likelySubtags, {
				main: {
					ko: {}
				}
			});
			Globalize.locale( "ko-KR" );
		},
		teardown: util.resetCldrContent
	});

	QUnit.test( "should validate parameters", function( assert ) {
		util.assertParameterPresence( assert, "value", function() {
			Globalize.validatePostalCode();
		});

		util.assertStringParameter( assert, "value", function( invalidValue, invalidRegin) {
			return function() {
				Globalize.validatePostalCode( invalidValue, invalidRegin );
			};
		});
	});

	QUnit.test( "should validate CLDR content", function( assert ) {
		util.assertCldrContent( assert, function() {
			Globalize.validatePostalCode( "427-090", "ko-KR" );
		});
	});
	QUnit.test( "should return boolean", function( assert ) {
		Globalize.load( postalcode );
		assert.strictEqual( Globalize.validatePostalCode( "427-090", "KR" ), true );
		assert.strictEqual( Globalize.validatePostalCode( "4270-090", "KR" ), false );
		assert.strictEqual( Globalize.validatePostalCode( "427-0090", "KR" ), false );
		assert.strictEqual( Globalize.validatePostalCode( "427090", "KR" ), false );
		assert.strictEqual( Globalize.validatePostalCode( "thisistest", "KR" ), false );

		assert.strictEqual( Globalize.validatePostalCode( "AD123", "AD" ), true );
		assert.strictEqual( Globalize.validatePostalCode( "ad345", "AD" ), false );

		assert.strictEqual( Globalize.validatePostalCode( "12345", "US" ), true );
		assert.strictEqual( Globalize.validatePostalCode( "12345-6789", "US" ), true );
		assert.strictEqual( Globalize.validatePostalCode( "12345-67899", "US" ), false );
		assert.strictEqual( Globalize.validatePostalCode( "12345 6789", "US" ), true );
		assert.strictEqual( Globalize.validatePostalCode( "12345 67899", "US" ), false );

		assert.strictEqual( Globalize.validatePostalCode( "12345", "EG" ), true );
		assert.strictEqual( Globalize.validatePostalCode( "123456", "EG" ), false );
		assert.strictEqual( Globalize.validatePostalCode( "12345-12", "EG" ), false );

		assert.strictEqual( Globalize.validatePostalCode( "123-4567", "JP" ), true );
		assert.strictEqual( Globalize.validatePostalCode( "123-456", "JP" ), false );
		assert.strictEqual( Globalize.validatePostalCode( "1234-567", "JP" ), false );
		assert.strictEqual( Globalize.validatePostalCode( "1234567", "JP" ), false );

		assert.strictEqual( Globalize.validatePostalCode( "123456", "RU" ), true );
		assert.strictEqual( Globalize.validatePostalCode( "1234567", "RU" ), false );
		assert.strictEqual( Globalize.validatePostalCode( "123-45", "RU" ), false );

		assert.strictEqual( Globalize.validatePostalCode( "123456", "CN" ), true );
		assert.strictEqual( Globalize.validatePostalCode( "123-45", "CN" ), false );
		assert.strictEqual( Globalize.validatePostalCode( "1234567", "CN" ), false );

		assert.strictEqual( Globalize.validatePostalCode( "12345", "US" ), true );
		assert.strictEqual( Globalize.validatePostalCode( "12345", "CN" ), false );
		assert.strictEqual( Globalize.validatePostalCode( "123456", "US" ), false );
		assert.strictEqual( Globalize.validatePostalCode( "123456", "CN" ), true );
		assert.strictEqual( Globalize.validatePostalCode( "12345-6789", "US" ), true );
		assert.strictEqual( Globalize.validatePostalCode( "12345-6789", "CN" ), false );

		assert.strictEqual( Globalize.postalCodeValidator( "KR")( "123-456" ), true );
		assert.strictEqual( Globalize.postalCodeValidator( "US" )( "12345" ), true );
		assert.strictEqual( Globalize.postalCodeValidator( "CN" )( "12345" ), false );
		assert.strictEqual( Globalize.postalCodeValidator( "US" )( "123456" ), false );
		assert.strictEqual( Globalize.postalCodeValidator( "CN" )( "123456" ), true );
		assert.strictEqual( Globalize.postalCodeValidator( "US" )( "12345-6789" ), true );
		assert.strictEqual( Globalize.postalCodeValidator( "CN" )( "12345-6789" ), false );
	});

});
