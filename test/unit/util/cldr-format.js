define([
    "src/util/cldr-format"
], function (cldrFormat) {

    QUnit.module( "CLDR {0} style string formatter" );

    QUnit.test( "should handle strings with no formatting", function( assert ) {
        assert.equal( cldrFormat("hello"), "hello" );
    });

    QUnit.test( "should handle strings with a formatting", function( assert ) {
        assert.equal( cldrFormat("hello {0}", "world"), "hello world" );
    });

    QUnit.test( "should handle strings with a couple format specifiers", function( assert ) {
        assert.equal( cldrFormat("{1} {0}", "dog", "down"), "down dog" );
    });

});