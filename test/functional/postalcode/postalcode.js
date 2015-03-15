define([
    "globalize",
    "json!cldr-data/supplemental/likelySubtags.json",
    "json!cldr-data/supplemental/postalCodeData.json",
    "../../util",

    "globalize/postalcode"
], function( Globalize, likelySubtags, postalcode, util ) {

    function extraSetup() {
        Globalize.load( postalcode );
    }

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
            Globalize.validatePostalCode("427-090");
        });
    });
    QUnit.test( "should return boolean", function( assert ) {
        extraSetup();
        assert.equal(Globalize.validatePostalCode("427-090") ,true);
        assert.equal(Globalize.validatePostalCode("4270-090") ,false);
        assert.equal(Globalize.validatePostalCode("427-0090") ,false);
        assert.equal(Globalize.validatePostalCode("427090") , false);
        assert.equal(Globalize.validatePostalCode("thisistest") ,false);
        assert.equal( Globalize( "en" ).validatePostalCode("12345"), true );
        assert.equal( Globalize( "en" ).validatePostalCode("12345-6789"), true );
        assert.equal( Globalize( "en" ).validatePostalCode("12345-67899"), false );
        assert.equal( Globalize( "en" ).validatePostalCode("12345 6789"), true );
        assert.equal( Globalize( "en" ).validatePostalCode("12345 67899"), false );

        assert.equal( Globalize( "ar" ).validatePostalCode("12345"), true );
        assert.equal( Globalize( "ar" ).validatePostalCode("123456"), false );
        assert.equal( Globalize( "ar" ).validatePostalCode("12345-12"),false );

        assert.equal( Globalize( "ja" ).validatePostalCode("123-4567"), true );
        assert.equal( Globalize( "ja" ).validatePostalCode("123-456"), false );
        assert.equal( Globalize( "ja" ).validatePostalCode("1234-567"), false );
        assert.equal( Globalize( "ja" ).validatePostalCode("1234567"), false );

        assert.equal( Globalize( "ru" ).validatePostalCode("123456"), true );
        assert.equal( Globalize( "ru" ).validatePostalCode("1234567"), false );
        assert.equal( Globalize( "ru" ).validatePostalCode("123-45"), false );

        assert.equal( Globalize( "zh" ).validatePostalCode("123456"), true );
        assert.equal( Globalize( "zh" ).validatePostalCode("123-45"), false );
        assert.equal( Globalize( "zh" ).validatePostalCode("1234567"), false );
    });

});
