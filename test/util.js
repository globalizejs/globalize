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
	object: new Foo(),
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
	 * Parameter Presence assertion
	 */
	assertParameterPresence: function( assert, name, fn ) {
		assert.throws( fn, function E_MISSING_PARAMETER( error ) {
			return error.code === "E_MISSING_PARAMETER" &&
				error.name === name;
		}, "Expected \"E_MISSING_PARAMETER: Missing `" + name + "` parameter\" to be thrown" );
	},

	/**
	 * Parameter Type assertions
	 */
	assertArrayParameter: function( assert, name, fn ) {
		assertParameterType( assert, "array", name, fn );
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

	assertNumberParameter: function( assert, name, fn ) {
		assertParameterType( assert, "number", name, fn );
	},

	assertPathParameter: function( assert, name, fn ) {
		assertParameterType( assert, [ "array", "string" ], name, fn );
	},

	assertPlainObjectParameter: function( assert, name, fn ) {
		assertParameterType( assert, [ "cldr", "plainObject" ], name, fn );
	},

	assertStringParameter: function( assert, name, fn ) {
		assertParameterType( assert, "string", name, fn );
	}
};

});
