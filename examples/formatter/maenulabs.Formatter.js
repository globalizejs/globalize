/**
 * Provides String formatting, like java.util.Formatter.
 *
 * @author
 *     Manuel Leuenberger
 */

/**
 * Creates a Localizer. Extend it, this will just format using toString.
 */
function Localizer() {
	
}

/**
 * Formats the object using the specified conversion, and precision, if it's a
 * Number.
 *
 * @param object
 *     The Object to format
 * @param conversion
 *     A conversion String
 * @param precision
 *     Only used for Numbers, the number of digits after the decimal point
 *
 * @return
 *     The formatted String
 *
 * @throws IllegalFormatError
 *     If the comination of arguments is not understood
 */
Localizer.prototype.format = function(object, conversion, precision) {
	return object.toString();
};


/**
 * Creates a Formatter.
 *
 * @param localizer
 *     The Localizer to use for localizing the Dates and Numbers
 */
function Formatter(localizer) {
	
	/**
	 * The Localizer.
	 */
	this.localizer = localizer;
	
}

/**
 * The RegExp for a specifier.
 */
Formatter.SPECIFIER = /%(\d+\$)?\d*[a-zA-Z]+/g;
/**
 * The RegExp for the argument index.
 */
Formatter.SPECIFIER_ARGUMENT_INDEX = /(\d+)\$/;
/**
 * The RegExp for the precision.
 */
Formatter.SPECIFIER_PRECISION = /(\d+)[a-zA-Z]+/;
/**
 * The RegExp for the conversion.
 */
Formatter.SPECIFIER_CONVERSION = /([a-zA-Z]+)/;

/**
 * Formats the specifed String with the specified arguments.
 *
 * @param format
 *     The format String
 * @param args
 *     The arguments to use as a variable length argument list
 *
 * @return
 *     The formatted String
 *
 * @throws IllegalFormatError
 *     If the format String has an illegal syntax or not enough arguments are
 *     supplied
 */
Formatter.prototype.format = function() {
	var i;
	var format = arguments[0];
	var args = [];
	for (i = 1; i < arguments.length; i++) {
		args.push(arguments[i]);
	}
	
	// split it before to allow concurrent replacing
	var specifiers = format.match(Formatter.SPECIFIER);
	if (!specifiers) {
		return format;
	}
	var remains = []
	var remain = format;
	for (i = 0; i < specifiers.length; i++) {
		var splitted = remain.split(specifiers[i], 1)[0];
		remains.push(splitted);
		remain = remain.substring(splitted.length + specifiers[i].length, remain.length);
	}
	remains.push(remain);
	
	// format using the specifiers
	var orderedFormattedSpecifiers = [];
	var ordinaryIndex = 0;
	for (i = 0; i < specifiers.length; i++) {
		var specifier = specifiers[i];
		var argumentIndexMatch = specifier.match(Formatter.SPECIFIER_ARGUMENT_INDEX);
		var conversionMatch = specifier.match(Formatter.SPECIFIER_CONVERSION);
		var precisionMatch = specifier.match(Formatter.SPECIFIER_PRECISION);
		var argumentIndex;
		var conversion;
		var precision;
		if (argumentIndexMatch) {
			argumentIndex = parseInt(argumentIndexMatch[1]) - 1;
		} else {
			argumentIndex = ordinaryIndex;
			ordinaryIndex++;
		}
		if (argumentIndex >= args.length) {
			throw new IllegalFormatError("argument index is too high");
		}
		conversion = conversionMatch[1];
		if (precisionMatch) {
			precision = parseInt(precisionMatch[1]);
		}
		var localized;
		if (precisionMatch) {
			localized = this.localizer.format(args[argumentIndex], conversion, precision);
		} else {
			localized = this.localizer.format(args[argumentIndex], conversion);
		}
		orderedFormattedSpecifiers.push(localized);
	}
	
	// build the formatted String
	var formatted = "";
	for (i = 0; i < specifiers.length; i++) {
		formatted += remains[i] + orderedFormattedSpecifiers[i];
	}
	formatted += remains[i];
	return formatted;
};

/**
 * Creates an IllegalFormatError.
 *
 * @param message
 *     An optional message
 */
function IllegalFormatError(message) {
	Error.apply(this, arguments);
	
	this.message = message;
	
}
IllegalFormatError.prototype = new Error();
IllegalFormatError.prototype.constructor = IllegalFormatError;
IllegalFormatError.prototype.name = "IllegalFormatError";