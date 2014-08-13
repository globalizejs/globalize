define([
  "../validate"
], function( validate ) {

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
return function( value, name, minimum, maximum ) {
  validate( "E_OUT_OF_RANGE", "Parameter `{name}` has value `{value}` out of range [{minimum}, {maximum}].", value >= minimum && value <= maximum, {
    maximum: maximum,
    minimum: minimum,
    name: name,
    value: value
  });
};

});
