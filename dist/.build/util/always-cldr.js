

var alwaysCldr = function( localeOrCldr ) {
	return localeOrCldr instanceof Cldr ? localeOrCldr : new Cldr( localeOrCldr );
};

