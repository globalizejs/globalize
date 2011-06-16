(function() {

var allCultures, de, deDE, en;

module("findClosestCulture", {
  setup: function() {
    allCultures = $.global.cultures;
		en = $.global.cultures.en;
		de = $.global.cultures.de;
		deDE = $.global.cultures["de-DE"];
  },
  teardown: function() {
    $.global.cultures = allCultures;
  }
});

test("default should be en", function() {
	// use QUnit.equiv to avoid page-long printing
	ok( QUnit.equiv($.global.findClosestCulture(), en) );
});

test("match xx for xx request", function() {
	ok( QUnit.equiv($.global.findClosestCulture("de"), de) );
	ok( QUnit.equiv($.global.findClosestCulture(["de"]), de) );
	ok( QUnit.equiv($.global.findClosestCulture("de;q=0.4"), de) );
});

test("match xx-XX for xx-XX request", function() {
	ok( QUnit.equiv($.global.findClosestCulture("de-DE"), deDE) );
	ok( QUnit.equiv($.global.findClosestCulture(["de-DE"]), deDE) );
	ok( QUnit.equiv($.global.findClosestCulture("de-DE;q=0.4"), deDE) );
});

test("match xx for xx-XX request", function() {
	ok( QUnit.equiv($.global.findClosestCulture("de-XX"), de) );
	ok( QUnit.equiv($.global.findClosestCulture(["de-XX"]), de) );
	ok( QUnit.equiv($.global.findClosestCulture("de-XX;q=0.4"), de) );
});

test("match null for unknown language", function() {
	ok( QUnit.equiv($.global.findClosestCulture("xx-XX"), null) );
	ok( QUnit.equiv($.global.findClosestCulture(["xx-XX"]), null) );
	ok( QUnit.equiv($.global.findClosestCulture("xx-XX;q=0.4"), null) );
});

test("match xx-XX for xx request", function() {
	$.global.cultures = {
		"de-DE": deDE
	};

	ok( QUnit.equiv($.global.findClosestCulture("de"), deDE) );
	ok( QUnit.equiv($.global.findClosestCulture(["de"]), deDE) );
	ok( QUnit.equiv($.global.findClosestCulture("de;q=0.4"), deDE) );
});

test("match xx if multiple are provided is provided", function() {
	ok( QUnit.equiv($.global.findClosestCulture(["en", "de-DE"]), en) );
	ok( QUnit.equiv($.global.findClosestCulture(["de-DE", "es-MX"]), deDE) );
	ok( QUnit.equiv($.global.findClosestCulture("de-DE, ha"), deDE) );
});

test("if q is not defined it shoud be 1", function() {
	ok( QUnit.equiv($.global.findClosestCulture("fr;q=0.4, es;q=0.5, de-DE"), deDE) );
});

test("match language defined by q", function() {
	ok( QUnit.equiv($.global.findClosestCulture("fr;q=0.4, de-DE;q=0.5"), deDE) );
});

})();