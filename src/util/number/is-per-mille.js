define(function() {

/**
 * isPerMille( value )
 *
 * @value (String)
 *
 * Return (Boolean) true if value contains a per mille symbol.
 */
return function( value ) {
  return value.indexOf( "\u2030" ) !== -1;
};

});
