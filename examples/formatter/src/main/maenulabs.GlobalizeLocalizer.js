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
 * Formats Numbers and Dates using Globalize.format. Objects are formatted using
 * the object's toString method.
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
		return object.toString();
	}
};