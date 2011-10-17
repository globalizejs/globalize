/**
 * Localizer using Globalize.
 *
 * @author
 *     Manuel Leuenberger
 */

/**
 * Creates a GlobalizeLocalizer.
 * 
 * @param culture
 *     The optional culture String that will be used for formatting. If not 
 *     specified, the current culture will be used
 */
function GlobalizeLocalizer(culture) {
	
	Localizer.apply(this, arguments);
	
	/**
	 * The culture String.
	 */
	this.culture = culture;
	
}
GlobalizeLocalizer.prototype = new Localizer();
GlobalizeLocalizer.prototype.constructor = GlobalizeLocalizer;

/**
 * Formats Numbers and Dates using Globalize.format. Objects are localized using
 * Globalize.localize and the object's toString method, if the conversion is 'S',
 * otherwise it will not be.
 * 
 * {@inheritDoc}
 */
GlobalizeLocalizer.prototype.format = function(object, conversion, precision) {
	if (typeof object == 'number') {
		if (precision == undefined) {
			return Globalize.format(object, conversion, this.culture);
		} else {
			return Globalize.format(object, conversion + precision, this.culture);
		}
	} else if (object instanceof Date) {
		return Globalize.format(object, conversion, this.culture);
	} else {
		if (conversion == "S") {
			return Globalize.localize(object.toString(), [], this.culture);
		} else {
			return object.toString();
		}
	}
};

var localizer = new GlobalizeLocalizer();
var formatter = new Formatter(localizer);
var localize = Globalize.localize;
Globalize.localize = function() {
	if (arguments.length < 2 || typeof arguments[1] == "string") {
		return localize.apply(Globalize, arguments);
	}
	var message = arguments[0];
	var args = arguments[1];
	var culture = arguments[2];
	var localized = localize.apply(Globalize, [message, culture]);
	var formatArguments = [localized || message];
	for (var i = 0; i < args.length; i++) {
		formatArguments.push(args[i]);
	}
	localizer.culture = culture;
	return formatter.format.apply(formatter, formatArguments);
};