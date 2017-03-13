define([
	"./similar-fields-map"
], function( dateExpandPatternSimilarFieldsMap ) {

return function( character ) {
	return dateExpandPatternSimilarFieldsMap[ character ] || character;
};

});
