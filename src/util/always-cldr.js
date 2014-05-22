define([
	"cldr"
], function( Cldr ) {

return function( localeOrCldr ) {
	return localeOrCldr instanceof Cldr ? localeOrCldr : new Cldr( localeOrCldr );
};

});
