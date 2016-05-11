define([
    "../core",
    "messageformat-parser",
    "reserved-words"
], function( Globalize, Parser, reserved ) {

/** Creates a new message compiler.
 *
 * @class
 * @param {object} context - Context (this) for formatter functions
 * @param {array} fmtFuncs - Formatter functions
 * @property {object} runtime - Names of the core runtime functions used by the compiled functions
 * @property {array} formatters - The formatter functions used by the compiled functions
 * @property {object} pluralTypes - The plural types used by the compiled functions
 */
function Compiler( context, fmtFuncs ) {
    this._globalize = Globalize;
    this.fmt = fmtFuncs;
    this.runtime = {};
    this.pluralTypes = {
        ordinal: false,
        cardinal: false
    };
    this.formatters = [];
    this.context = context;
}

/** Enable or disable the addition of Unicode control characters to all input
 *  to preserve the integrity of the output when mixing LTR and RTL text.
 *
 * @see http://cldr.unicode.org/development/development-process/design-proposals/bidi-handling-of-structured-text
 *
 * @memberof Compiler
 * @param {boolean} [enable=true]
 * @returns {Compiler} The Compiler instance, to allow for chaining
 */
Compiler.prototype.setBiDiSupport = function( enable ) {
    this.bidiSupport = !!enable || ( typeof enable === "undefined" );
    return this;
};

/** According to the ICU MessageFormat spec, a `#` character directly inside a
 *  `plural` or `selectordinal` statement should be replaced by the number
 *  matching the surrounding statement. By default, messageformat.js will
 *  replace `#` signs with the value of the nearest surrounding `plural` or
 *  `selectordinal` statement.
 *
 *  Set this to true to follow the stricter ICU MessageFormat spec, and to
 *  throw a runtime error if `#` is used with non-numeric input.
 *
 * @memberof Compiler
 * @param {boolean} [enable=true]
 * @returns {Compiler} The Compiler instance, to allow for chaining
 */
Compiler.prototype.setStrictNumberSign = function( enable ) {
    this.strictNumberSign = !!enable || ( typeof enable === "undefined" );

    // TODO
    // this.runtime.setStrictNumber(this.strictNumberSign);
    return this;
};

/** Utility function for quoting an Object's key value if required
 *
 *  Quotes the key if it contains invalid characters or is an
 *  ECMAScript 3rd Edition reserved word (for IE8).
 */
Compiler.propname = function( key, obj ) {
    if ( /^[A-Z_$][0-9A-Z_$]*$/i.test( key ) &&
        [ "break", "continue", "delete", "else", "for", "function", "if", "in", "new",
        "return", "this", "typeof", "var", "void", "while", "with", "case", "catch",
        "default", "do", "finally", "instanceof", "switch", "throw", "try" ].indexOf( key ) < 0 ) {
        return obj ? obj + "." + key : key;
    } else {
        var jkey = JSON.stringify( key );
        return obj ? obj + "[" + jkey + "]" : jkey;
    }
};

/** Utility function for escaping a function name if required
 */
Compiler.funcname = function( key ) {
    var fn = key.trim().replace( /\W+/g, "_" );
    return reserved.check( fn, "es2015", true ) || /^\d/.test( fn ) ? "_" + fn : fn;
};

/** Utility formatter function for enforcing Bidi Structured Text by using UCC
 *
 *  List inlined from data extracted from CLDR v27 & v28
 *  To verify/recreate, use the following:
 *
 *     git clone https://github.com/unicode-cldr/cldr-misc-full.git
 *     cd cldr-misc-full/main/
 *     grep characterOrder -r . | tr '"/' '\t' | cut -f2,6 | grep -C4 right-to-left
 */
Compiler.bidiMarkText = function( text, locale ) {
    function isLocaleRTL( locale ) {
        var rtlLanguages = [ "ar", "ckb", "fa", "he", "ks($|[^bfh])", "lrc", "mzn",
                            "pa-Arab", "ps", "ug", "ur", "uz-Arab", "yi" ];
        return new RegExp( "^" + rtlLanguages.join( "|^" ) ).test( locale );
    }
    var mark = JSON.stringify( isLocaleRTL( locale ) ? "\u200F" : "\u200E" );
    return mark + " + " + text + " + " + mark;
};

/** @private */
Compiler.prototype.cases = function( token, plural ) {
    var needOther = true;
    var r = token.cases.map( function( c ) {
        if ( c.key === "other" ) {
            needOther = false;
        }
        var s = c.tokens.map( function( tok ) { return this.token( tok, plural ); }, this );
        return Compiler.propname( c.key ) + ": " + ( s.join( " + " ) || "\"\"" );
    }, this );
    if ( needOther ) {
        throw new Error( "No 'other' form found in " + JSON.stringify( token ) );
    }
    return "{ " + r.join( ", " ) + " }";
};

/** @private */
Compiler.prototype.token = function( token, plural ) {
    if ( typeof token === "string" ) {
        return JSON.stringify( token );
    }

    var fn, args = [ Compiler.propname( token.arg, "d" ) ];
    switch ( token.type ) {
        case "argument":
            return this.bidiSupport ? Compiler.bidiMarkText( args[0], this.lc ) : args[0];

        case "select":
            fn = "select";
            args.push( this.cases( token, this.strictNumberSign ? null : plural ) );
            this.runtime.select = true;
            break;

        case "selectordinal":
            fn = "plural";
            args.push( 0, Compiler.funcname( this.lc ), this.cases( token, token ), 1 );
            this.runtime.plural = true;
            this.pluralTypes.ordinal = true;
            break;

        case "plural":
            fn = "plural";
            args.push(
                token.offset || 0,
                Compiler.funcname( this.lc ), this.cases( token, token )
            );
            this.runtime.plural = true;
            this.pluralTypes.cardinal = true;
            break;

        case "function":
            if ( !this.fmt[token.key] ) {
                 throw new Error( "Formatting function " +
                    JSON.stringify( token.key ) + " not found!" );
            }
            fn = "fmt[" + JSON.stringify( this.formatters.length ) + "]";
            this.formatters.push( this.fmt[token.key].apply( this.context, token.params || [] ) );
            break;

        case "octothorpe":
            if ( !plural ) {
                return "\"#\"";
            }
            fn = "number";
            args = [ Compiler.propname( plural.arg, "d" ), JSON.stringify( plural.arg ) ];
            if ( plural.offset ) {
                args.push( plural.offset );
            }

            this.runtime.number = true;
            break;
    }

    if ( !fn ) {
        throw new Error( "Parser error for token " + JSON.stringify( token ) );
    }
    return fn + "(" + args.join( ", " ) + ")";
};

/** Recursively compile a string or a tree of strings to JavaScript function sources
 *
 *  If `src` is an object with a key that is also present in `plurals`, the key
 *  in question will be used as the locale identifier for its value. To disable
 *  the compile-time checks for plural & selectordinal keys while maintaining
 *  multi-locale support, use falsy values in `plurals`.
 *
 * @param {string|object} src - the source for which the JS code should be generated
 * @param {string} lc - the default locale
 * @param {object} plurals - a map of pluralization keys for all available locales
 */
Compiler.prototype.compile = function( src, lc ) {
    this.lc = lc;

    // TODO: pc is only needed for validation, disable for now.
    var pc = { cardinal: [], ordinal: [] };
    var r = Parser.parse( src, pc ).map( function( token ) { return this.token( token ); }, this );
    return "function(d) { return " + ( r.join( " + " ) || "\"\"" ) + "; }";
};

return Compiler;

});
