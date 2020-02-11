define([
	"../common/parts/join"
], function( partsJoin ) {

return function( numberToPartsFormatter ) {
	return function numberFormatter( value ) {
		return partsJoin( numberToPartsFormatter( value ));
	};
};

});
