define([
	"cldr"
], function( Cldr ) {

var allTypes = {
	array: [],
	cldr: new Cldr( "en" ),
	date: new Date(),
	"function": Foo,
	"null": null,
	number: 7,
	plainObject: {},
	string: "foo"
};

function assertParameterType( assert, type, name, fn ) {
	Object.keys( allTypes ).filter( not( type ) ).forEach(function( type ) {
		assert.throws( fn( allTypes[ type ] ), function E_INVALID_PAR_TYPE( error ) {
			return error.code === "E_INVALID_PAR_TYPE" &&
				error.name === name &&
				"value" in error &&
				"expected" in error;
		}, "Expected \"E_INVALID_PAR_TYPE: Invalid `" + name + "` parameter type (" + type + ")\" to be thrown" );
	});
}

function Foo() {}

/**
 * not() should be used with Array.prototype.filter().
 *
 * Return true only if b is different than any a.
 *
 * For example:
 * [ 1, 2, 3 ].filter( not( 2 ) ) => [ 1, 3 ]
 * [ 1, 2, 3 ].filter( not( [ 2, 3 ] ) ) => [ 1 ]
 */
function not( a ) {
	return function( b ) {
		if ( Array.isArray( a ) ) {
			return !a.some(function( a ) {
				return a === b;
			});
		}
		return a !== b;
	};
}

return {

	/**
	 * CLDR content assertion
	 */
	assertCldrContent: function( assert, fn ) {
		assert.throws( fn, function E_MISSING_CLDR( error ) {
			return error.code === "E_MISSING_CLDR" &&
				"path" in error;
		}, "Expected \"E_MISSING_CLDR\" to be thrown" );
	},

	/**
	 * Default locale assertion
	 */
	assertDefaultLocalePresence: function( assert, fn) {
		assert.throws( fn, function E_DEFAULT_LOCALE_NOT_DEFINED( error ) {
			return error.code === "E_DEFAULT_LOCALE_NOT_DEFINED";
		}, "Expected \"E_DEFAULT_LOCALE_NOT_DEFINED\" to be thrown" );
	},

	/**
	 * Parameter assertions
	 */
	assertArrayParameter: function( assert, name, fn ) {
		assertParameterType( assert, "array", name, fn );
	},

	assertCldrJsonDataParameter: function( assert, name, fn ) {
		assertParameterType( assert, [ "array", "cldr", "plainObject" ], name, fn );
	},

	assertCurrencyParameter: function( assert, name, fn ) {
		assertParameterType( assert, [ "string" ], name, fn );
		assert.throws( fn( "ABCD" ), function E_INVALID_PAR_TYPE( error ) {
			return error.code === "E_INVALID_PAR_TYPE" &&
				error.name === name &&
				"value" in error &&
				"expected" in error;
		}, "Expected \"E_INVALID_PAR_TYPE: Invalid `" + name + "` parameter type (string.length > 3)\" to be thrown" );
	},

	assertDateParameter: function( assert, name, fn ) {
		assertParameterType( assert, "date", name, fn );
	},

	assertDatePatternParameter: function( assert, name, fn ) {
		assertParameterType( assert, [ "cldr", "plainObject", "string" ], name, fn );
	},

	assertLocaleParameter: function( assert, name, fn ) {
		assertParameterType( assert, [ "cldr", "string" ], name, fn );
	},

	assertLocaleOrNullParameter: function( assert, name, fn ) {
		assertParameterType( assert, [ "cldr", "null", "string" ], name, fn );
	},

	assertMessagePresence: function( assert, path, fn ) {
		assert.throws( fn, function E_MISSING_PARAMETER( error ) {
			return error.code === "E_MISSING_MESSAGE" &&
				error.path === path;
		}, "Expected \"E_MISSING_MESSAGE: Missing required message content `" + path + "`\" to be thrown" );
	},

	assertMessageType: function( assert, path, fn ) {
		Object.keys( allTypes ).filter( not([ "array", "string" ]) ).forEach(function( type ) {
			assert.throws( fn( allTypes[ type ] ), function E_INVALID_MESSAGE( error ) {
				return error.code === "E_INVALID_MESSAGE" &&
					error.path === path &&
					"expected" in error;
			}, "Expected \"E_INVALID_MESSAGE: Invalid message content `" + path + "`\" to be thrown. (" + type + ")" );
		});
	},

	assertMessageVariablesType: function( assert, name, fn ) {
		assertParameterType( assert, [ "array", "cldr", "number", "plainObject", "string" ], name, fn );
	},

	assertNumberParameter: function( assert, name, fn ) {
		assertParameterType( assert, "number", name, fn );
	},

	assertParameterMissingKey: function( assert, name, key, fn ) {
		assert.throws( fn, function E_PAR_MISSING_KEY( error ) {
			return error.code === "E_PAR_MISSING_KEY" &&
				error.name === name && error.key === key;
		}, "Expected \"E_PAR_MISSING_KEY: Parameter `" + name + "` misses key `" +
			key + "`\" to be thrown" );
	},

	assertParameterPresence: function( assert, name, fn ) {
		assert.throws( fn, function E_MISSING_PARAMETER( error ) {
			return error.code === "E_MISSING_PARAMETER" &&
				error.name === name;
		}, "Expected \"E_MISSING_PARAMETER: Missing `" + name + "` parameter\" to be thrown" );
	},

	assertParameterRange: function( assert, min, max, fn ) {
		[ min - 1, max + 1 ].forEach(function( num ) {
			assert.throws(function() {
				fn( num );
			}, function E_OUT_OF_RANGE( error ) {
				return error.code === "E_PAR_OUT_OF_RANGE";
			}, "Expected \"E_PAR_OUT_OF_RANGE error to be thrown testing " + num );
		});
	},

	assertPathParameter: function( assert, name, fn ) {
		assertParameterType( assert, [ "array", "string" ], name, fn );
	},

	assertPlainObjectParameter: function( assert, name, fn ) {
		assertParameterType( assert, [ "cldr", "plainObject" ], name, fn );
	},

	assertPluralFormatValueParameter: function( assert, name, fn ) {
		assertParameterType( assert, [ "string", "number" ], name, fn );
	},

	assertStringParameter: function( assert, name, fn ) {
		assertParameterType( assert, "string", name, fn );
	},

	/**
	 * Etc
	 */
	resetCldrContent: function() {
		Cldr._resolved = {};
		Cldr._raw = {};
	}
};

});
