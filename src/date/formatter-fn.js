define([
	"../common/parts/join"
], function( partsJoin ) {

return function( dateToPartsFormatter ) {
	return function dateFormatter( value ) {
		return partsJoin( dateToPartsFormatter( value ));
	};
};

});
