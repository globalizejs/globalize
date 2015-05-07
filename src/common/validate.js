define( [
	"./create-error",
	"../util/always-array",
	"../util/is-plain-object",
	"cldr",
	"../core"
], function( createError, alwaysArray, isPlainObject, Cldr, Globalize ) {

function validate( code, message, check, attributes ) {
	if ( !check ) {
		throw createError( code, message, attributes );
	}
}

function cldr( path, value, options ) {
	var skipBoolean;
	options = options || {};

	skipBoolean = alwaysArray( options.skip ).some( function( pathRe ) {
		return pathRe.test( path );
	} );

	validate( "E_MISSING_CLDR", "Missing required CLDR content `{path}`.", value || skipBoolean, {
		path: path
	} );
}

function defaultLocale( value ) {
	validate( "E_DEFAULT_LOCALE_NOT_DEFINED", "Default locale has not been defined.",
		value !== undefined, {} );
}

function messageBundle( cldr ) {
	validate(
		"E_MISSING_MESSAGE_BUNDLE",
		"Missing message bundle for locale `{locale}`.",
		cldr.attributes.bundle && cldr.get( "globalize-messages/{bundle}" ) !== undefined,
		{
			locale: cldr.locale
		}
	);
}

function messagePresence( path, value ) {
	path = path.join( "/" );
	validate( "E_MISSING_MESSAGE", "Missing required message content `{path}`.",
		value !== undefined, { path: path } );
}

function messageType( path, value ) {
	path = path.join( "/" );
	validate(
		"E_INVALID_MESSAGE",
		"Invalid message content `{path}`. {expected} expected.",
		typeof value === "string",
		{
			expected: "a string",
			path: path
		}
	);
}

function parameterPresence( value, name ) {
	validate( "E_MISSING_PARAMETER", "Missing required parameter `{name}`.",
		value !== undefined, { name: name } );
}

/**
 * range( value, name, minimum, maximum )
 *
 * @value [Number].
 * @name [String] name of variable.
 * @minimum [Number]. The lowest valid value, inclusive.
 * @maximum [Number]. The greatest valid value, inclusive.
 */
function parameterRange( value, name, minimum, maximum ) {
	validate(
		"E_PAR_OUT_OF_RANGE",
		"Parameter `{name}` has value `{value}` out of range [{minimum}, {maximum}].",
		value === undefined || value >= minimum && value <= maximum,
		{
			maximum: maximum,
			minimum: minimum,
			name: name,
			value: value
		}
	);
}

function parameterType( value, name, check, expected ) {
	validate(
		"E_INVALID_PAR_TYPE",
		"Invalid `{name}` parameter ({value}). {expected} expected.",
		check,
		{
			expected: expected,
			name: name,
			value: value
		}
	);
}

function pluralModulePresence() {
	validate( "E_MISSING_PLURAL_MODULE", "Plural module not loaded.",
		Globalize.plural !== undefined, {} );
}

function parameterTypeArray( value, name ) {
	parameterType( value, name, value === undefined || Array.isArray( value ), "Array" );
}

function parameterTypeCurrency( value, name ) {
	parameterType(
		value,
		name,
		value === undefined || typeof value === "string" && ( /^[A-Za-z]{3}$/ ).test( value ),
		"3-letter currency code string as defined by ISO 4217"
	);
}

function parameterTypeDate( value, name ) {
	parameterType( value, name, value === undefined || value instanceof Date, "Date" );
}

function parameterTypeLocale( value, name ) {
	parameterType(
		value,
		name,
		value === undefined || typeof value === "string" || value instanceof Cldr,
		"String or Cldr instance"
	);
}

function parameterTypeArrayOrObject( value, name ) {
	parameterType(
		value,
		name,
		value === undefined || isPlainObject( value ) || Array.isArray( value ),
		"Array or Plain Object"
	);
}

function parameterTypeNumber( value, name ) {
	parameterType(
		value,
		name,
		value === undefined || typeof value === "number",
		"Number"
	);
}

function parameterTypeObject( value, name ) {
	parameterType(
		value,
		name,
		value === undefined || isPlainObject( value ),
		"Plain Object"
	);
}

function parameterTypePlural( value, name ) {
	parameterType(
		value,
		name,
		value === undefined || value === "cardinal" || value === "ordinal",
		"String \"cardinal\" or \"ordinal\""
	);
}

function parameterTypeString( value, name ) {
	parameterType(
		value,
		name,
		value === undefined || typeof value === "string",
		"a string"
	);
}

return {
	cldr: cldr,
	defaultLocale: defaultLocale,
	messageBundle: messageBundle,
	messagePresence: messagePresence,
	messageType: messageType,
	parameterPresence: parameterPresence,
	parameterRange: parameterRange,
	parameterType: parameterType,
	pluralModulePresence: pluralModulePresence,
	parameterTypeArray: parameterTypeArray,
	parameterTypeCurrency: parameterTypeCurrency,
	parameterTypeDate: parameterTypeDate,
	parameterTypeLocale: parameterTypeLocale,
	parameterTypeArrayOrObject: parameterTypeArrayOrObject,
	parameterTypeNumber: parameterTypeNumber,
	parameterTypeObject: parameterTypeObject,
	parameterTypePlural: parameterTypePlural,
	parameterTypeString: parameterTypeString
};

} );
