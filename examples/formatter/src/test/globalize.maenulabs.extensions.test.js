/**
 * Tests the extensions made to Globalize.
 *
 * @author
 *     Manuel Leuenberger
 */

describe("globalize.extensions", function() {
	
	beforeEach(function() {
		Globalize.addCultureInfo("en", {
			messages: {
				"key": "message %n",
				"word": "word"
			}
		});
		Globalize.addCultureInfo("de", {
			messages: {
				"key": "Nachricht %n",
				"word": "Wort"
			}
		});
		Globalize.culture("en");
	});
	
	describe("localize", function() {
		
		it("should not affect the default behaviour without set culture", function() {
			var localized = Globalize.localize("word");
			expect(localized).toEqual("word");
		});
		
		it("should not affect the default behaviour with set culture", function() {
			var localized = Globalize.localize("word", "de");
			expect(localized).toEqual("Wort");
		});
		
		it("should use the set culture", function() {
			var localized = Globalize.localize("key", [1234.567], "de");
			expect(localized).toEqual("Nachricht 1.234,57");
		});
		
		it("should use the set culture if undefined", function() {
			var localized = Globalize.localize("key", [1234.567]);
			expect(localized).toEqual("message 1,234.57");
		});
		
	});
	
});