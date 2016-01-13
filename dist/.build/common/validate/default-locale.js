

var validateDefaultLocale = function( value ) {
	validate( "E_DEFAULT_LOCALE_NOT_DEFINED", "Default locale has not been defined.",
		value !== undefined, {} );
};

