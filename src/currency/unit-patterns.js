define([
	"../util/object/filter",
	"../number/numbering-system"
], function( objectFilter, numberNumberingSystem ) {

return function( cldr ) {
	return objectFilter( cldr.main([
		"numbers",
		"currencyFormats-numberSystem-" + numberNumberingSystem( cldr )
	]), /^unitPattern/ );
};

});
