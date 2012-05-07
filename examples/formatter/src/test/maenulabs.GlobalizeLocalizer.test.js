/**
 * Tests the GlobalizeLocalizer.
 *
 * @author
 *     Manuel Leuenberger
 */

describe("GlobalizeLocalizer", function() {
	
	beforeEach(function() {
		Globalize.addCultureInfo("en", {
			messages: {
				"key": "message"
			}
		});
		Globalize.addCultureInfo("de", {
			messages: {
				"key": "Nachricht"
			}
		});
		Globalize.culture("en");
		var localizer = new GlobalizeLocalizer("en");
	});
	
	describe("culture", function() {
		
		it("should use the set culture", function() {
			localizer.culture = "de";
			var formatted = localizer.format(1234.567, "n");
			expect(formatted).toEqual("1.234,57");
		});
		
		it("should use the set culture if undefined", function() {
			Globalize.culture("de");
			localizer.culture = undefined;
			var formatted = localizer.format(1234.567, "n");
			expect(formatted).toEqual("1.234,57");
		});
		
	});
	
	describe("format", function() {
		
		it("should format Numbers without conversion", function() {
			var formatted = localizer.format(1234.567, "n");
			expect(formatted).toEqual("1,234.57");
		});
		
		it("should format Numbers with conversion", function() {
			var formatted = localizer.format(1234.567, "n", 1);
			expect(formatted).toEqual("1,234.6");
		});
		
		it("should format Dates", function() {
			var formatted = localizer.format(new Date(1955,10,5), "d");
			expect(formatted).toEqual("11/5/1955");
		});
		
		it("should not format Strings", function() {
			var formatted = localizer.format("hello");
			expect(formatted).toEqual("hello");
		});
		
	});
	
});