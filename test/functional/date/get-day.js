define([
    "globalize",
    "json!cldr-data/main/en/ca-gregorian.json",
    "json!cldr-data/main/de/ca-gregorian.json",
    "json!cldr-data/supplemental/likelySubtags.json",
    "../../util",

    "globalize/date"
], function( Globalize, enCaGregorian, deCaGregorian, likelySubtags, util ) {

QUnit.module( "getDay function (no cldr)", {
    setup: function() {
        Globalize.load( likelySubtags, {
            main: {
                en: {}
            }
        });
        Globalize.locale( "en" );
    },
    teardown: util.resetCldrContent
} );

QUnit.test( "should validate CLDR content", function( assert ) {
    util.assertCldrContent( assert, function() {
        Globalize.getDay( "sun" );
    });
});

QUnit.test( "should validate day argument presence", function( assert ) {
    util.assertParameterPresence( assert, "day", function() {
        Globalize.getDay( );
    });
});

QUnit.test( "should validate day argument is string", function( assert ) {
    util.assertStringParameter( assert, "day", function(invalidValue) {
        return function() {
            Globalize.getDay(invalidValue);
        };
    });
});

QUnit.test( "should validate format argument is string", function( assert ) {
    util.assertStringParameter( assert, "format", function(invalidValue) {
        return function() {
            Globalize.getDay("sun", invalidValue);
        };
    });
});

var en, de;
QUnit.module( "getDay function", {
    setup: function() {
        Globalize.load( enCaGregorian, deCaGregorian, likelySubtags );
        Globalize.locale( "en" );
        en = new Globalize( "en" );
        de = new Globalize( "de" );
    },
    teardown: util.resetCldrContent
});

QUnit.test( "should return an default locale day", function( assert ) {
    assert.equal( Globalize.getDay("wed"), "Wednesday" );
});

QUnit.test( "should return an english day asked", function( assert ) {
    assert.equal( en.getDay("sun"), "Sunday" );
});

QUnit.test( "should return an german day asked", function( assert ) {
    assert.equal( de.getDay("mon"), "Montag" );
});

QUnit.test( "should return a wide day if asked explicitly", function( assert ) {
    assert.equal( de.getDay("tue", "wide"), "Dienstag" );
});

QUnit.test( "should return a short day asked", function( assert ) {
    assert.equal( de.getDay("sun", "short"), "So." );
});

QUnit.test( "should return a short day asked", function( assert ) {
    assert.equal( Globalize.getDay("sun", "narrow"), "S" );
});

});
