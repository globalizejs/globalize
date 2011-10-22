/**
 * Tests the Formatter.
 *
 * @author
 *     Manuel Leuenberger
 */

describe("Formatter", function() {
	
	var localizer;
	var formatter;
	
	beforeEach(function() {
		localizer = new Localizer();
		spyOn(localizer, "format").andCallThrough();
		formatter = new Formatter(localizer);
	});
	
	it("should not have called format", function() {
		expect(localizer.format).not.toHaveBeenCalled();
	});
	
	it("should work without any specifiers", function() {
		var formatted = formatter.format("hello");
		expect(formatted).toEqual("hello");
	});
	
	describe("errors caused by to less arguments", function(){
		
		it("should throw IllegalFormatError with ordinary indexing", function() {
			expect(function() {
				formatter.format("%s");
			}).toThrow(new IllegalFormatError("argument index is too high"));
		});
		
		it("should throw IllegalFormatError with argument indexing", function() {
			expect(function() {
				formatter.format("%2$s %1$s", "a");
			}).toThrow(new IllegalFormatError("argument index is too high"));
		});
		
		it("should throw IllegalFormatError with mixed indexing", function() {
			expect(function() {
				formatter.format("%s %1$s %s", "a");
			}).toThrow(new IllegalFormatError("argument index is too high"));
		});
		
	});
	
	describe("calling the localizer", function() {
	
		describe("precision", function() {
			
			it("should not set precision if not set", function() {
				formatter.format("%s", "a");
				expect(localizer.format).toHaveBeenCalledWith("a", "s");
			});
			
			it("should set precision if set", function() {
				formatter.format("%2f", 1.234);
				expect(localizer.format).toHaveBeenCalledWith(1.234, "f", 2);
			});
			
			it("should set precision if set and allow multiple digits", function() {
				formatter.format("%12f", 1.234);
				expect(localizer.format).toHaveBeenCalledWith(1.234, "f", 12);
			});
			
		});
	
		describe("conversion", function() {
			
			it("should allow multiple digits", function() {
				formatter.format("%abc", 1.234);
				expect(localizer.format).toHaveBeenCalledWith(1.234, "abc");
			});
			
		});
	
		describe("indexing", function() {
			
			it("should work with ordinary indexing", function() {
				var arg1 = "arg1";
				var arg2 = "arg2";
				var arg3 = "arg3";
				formatter.format("%a %b %c", arg1, arg2, arg3);
				expect(localizer.format.argsForCall[0].length).toBe(2);
				expect(localizer.format.argsForCall[0][0]).toBe(arg1);
				expect(localizer.format.argsForCall[0][1]).toEqual("a");
				expect(localizer.format.argsForCall[1].length).toBe(2);
				expect(localizer.format.argsForCall[1][0]).toBe(arg2);
				expect(localizer.format.argsForCall[1][1]).toEqual("b");
				expect(localizer.format.argsForCall[2].length).toBe(2);
				expect(localizer.format.argsForCall[2][0]).toBe(arg3);
				expect(localizer.format.argsForCall[2][1]).toEqual("c");
			});
			
			it("should work with argument indexing", function() {
				var arg1 = "arg1";
				var arg2 = "arg2";
				var arg3 = "arg3";
				formatter.format("%2$a %3$b %1$c", arg1, arg2, arg3);
				expect(localizer.format.argsForCall[0].length).toBe(2);
				expect(localizer.format.argsForCall[0][0]).toBe(arg2);
				expect(localizer.format.argsForCall[0][1]).toEqual("a");
				expect(localizer.format.argsForCall[1].length).toBe(2);
				expect(localizer.format.argsForCall[1][0]).toBe(arg3);
				expect(localizer.format.argsForCall[1][1]).toEqual("b");
				expect(localizer.format.argsForCall[2].length).toBe(2);
				expect(localizer.format.argsForCall[2][0]).toBe(arg1);
				expect(localizer.format.argsForCall[2][1]).toEqual("c");
			});
			
			it("should work with mixed indexing", function() {
				var arg1 = "arg1";
				var arg2 = "arg2";
				formatter.format("%a %1$b %c", arg1, arg2);
				expect(localizer.format.argsForCall[0].length).toBe(2);
				expect(localizer.format.argsForCall[0][0]).toBe(arg1);
				expect(localizer.format.argsForCall[0][1]).toEqual("a");
				expect(localizer.format.argsForCall[1].length).toBe(2);
				expect(localizer.format.argsForCall[1][0]).toBe(arg1);
				expect(localizer.format.argsForCall[1][1]).toEqual("b");
				expect(localizer.format.argsForCall[2].length).toBe(2);
				expect(localizer.format.argsForCall[2][0]).toBe(arg2);
				expect(localizer.format.argsForCall[2][1]).toEqual("c");
			});
			
			it("should allow multiple digits", function() {
				formatter.format("%12$s", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
				expect(localizer.format).toHaveBeenCalledWith(12, "s");
			});
			
			it("should ignore spare arguments", function() {
				formatter.format("%s", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
				expect(localizer.format).toHaveBeenCalledWith(1, "s");
			});
			
		});
		
	});
	
	describe("reassembling", function() {
		
		it("should reassemble in a parallel manner", function() {
			var formatted = formatter.format("hello %s", "%s");
			expect(formatted).toEqual("hello %s");
		});
		
		it("should respect indexing", function() {
			var formatted = formatter.format("Hello %s, nice to %s you. Oh, %1$s, have you seen my %3$s?", "Peter", "meet", "keys");
			expect(formatted).toEqual("Hello Peter, nice to meet you. Oh, Peter, have you seen my keys?");
		});
		
	});

});