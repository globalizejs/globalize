define([
	"cldr",
	"../type"
], function( Cldr, validateType ) {

return function( value, name ) {
	validateType( value, name, value === undefined ||
		typeof value === "string" || value instanceof Cldr, "String or Cldr instance" );
};

});
