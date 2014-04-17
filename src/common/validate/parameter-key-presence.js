define([
	"../validate"
], function( validate ) {

/**
 * parameterKeyPresence( value, name, key )
 *
 * @value [Object] Variable value.
 *
 * @name [String] Name of variable.
 *
 * @key [String] The lowest valid value, inclusive.
 */
return function( value, name, key ) {
	validate(
		"E_PAR_MISSING_KEY",
		"Parameter `{name}` misses key `{key}`",
		value === undefined || key in value,
		{
			key: key,
			name: "messageData"
		}
	);
};

});
