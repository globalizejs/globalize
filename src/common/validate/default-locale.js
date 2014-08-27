define([
	"../validate"
], function( validate ) {

return function( value ) {
	validate( "E_DEFAULT_LOCALE_NOT_DEFINED", "Default locale has not been defined.",
		typeof value !== "undefined", {} );
};

});
