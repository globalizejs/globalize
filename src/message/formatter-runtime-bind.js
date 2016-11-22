define(function() {

return function( messageformatter, formatterSrc, runtime, pluralType, locale, formatters ) {
	var hasFormatters = formatters.length > 0;

	messageformatter.toString = function() {
		var locals = [];
		var argCount = 0,
			args = [];

		if ( runtime.number ) {
			locals.push( "var number = messageFormat.number;" );
		}

		if ( runtime.plural ) {
			locals.push( "var plural = messageFormat.plural;" );
		}

		if ( runtime.select ) {
			locals.push( "var select = messageFormat.select;" );
		}

		if ( pluralType !== false ) {
			args.push( locale );
			argCount++;
		}

		return "(function( " + args.join( ", " ) + " ) {\n" +
			( locals.length ? ( locals.join( "\n" ) + "\n" ) : "" ) +
			( hasFormatters ? "  var fmt = [].slice.call( arguments, " + argCount + " );\n" : "" ) +
			"  return " + formatterSrc + "\n" +
			"})";
	};

	return messageformatter;
};

});
