

/**
 * range( value, name, minimum, maximum )
 *
 * @value [Number].
 *
 * @name [String] name of variable.
 *
 * @minimum [Number]. The lowest valid value, inclusive.
 *
 * @maximum [Number]. The greatest valid value, inclusive.
 */
var validateParameterRange = function( value, name, minimum, maximum ) {
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
};

