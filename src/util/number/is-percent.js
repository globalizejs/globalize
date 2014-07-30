define(function() {

/**
 * isPercent( value )
 *
 * @value (String)
 *
 * Return (Boolean) true if value contains a "%".
 */
return function( value ) {
  return value.indexOf( "%" ) !== -1;
};

});
