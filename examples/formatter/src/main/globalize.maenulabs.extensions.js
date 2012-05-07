/**
 * Extends Globalize to use the formatter in localize.
 *
 * @author
 *     Manuel Leuenberger
 */

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