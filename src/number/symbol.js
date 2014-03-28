define([
	"./numbering-system",
	"./symbol/name"
], function( numberNumberingSystem, numberSymbolName ) {

/**
 * MinusSign( symbol, cldr )
 *
 * Return the localized minus sign.
 */
return function( symbol, cldr ) {
	return cldr.main([
		"numbers/symbols-numberSystem-" + numberNumberingSystem( cldr ),
		numberSymbolName[ symbol ]
	]);
};

});
