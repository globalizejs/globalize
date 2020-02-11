define([
	"../common/parts/join"
], function( partsJoin ) {

return function( currencyToPartsFormatter ) {
	return function currencyFormatter( value ) {
		return partsJoin( currencyToPartsFormatter( value ));
	};
};

});
