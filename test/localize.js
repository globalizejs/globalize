module('localize', {
  teardown: function() {
    Globalize.culture = undefined;
  }
});


test('set and retrieve translations', function() {
  Globalize.localize("translate", "fr", "traduire");
  strictEqual( Globalize.localize("translate", "fr"), "traduire", "translate 'translate' to french" );
});

test('set and retrieve plugin translations', function() {
  Globalize.localize("jQuery.localize.plugin", "de", {
    day: "Tag",
    month: "Monat"
  });
  strictEqual( Globalize.localize("jQuery.localize.plugin", "de").day, "Tag", "translate 'day' to german" );
});

test('retrieve translations with assigned culture', function() {
  Globalize.culture = Globalize.cultures.fr;
  Globalize.localize("translate", "fr", "traduire");
  strictEqual( Globalize.localize("translate"), "traduire", "translate 'translate' to french" );
});

test('retrieve plugin translations with assigned culture', function() {
  Globalize.culture = Globalize.cultures.de;
  Globalize.localize("jQuery.localize", "de", {
    day: "Tag",
    month: "Monat"
  });
  strictEqual( Globalize.localize("jQuery.localize").day, "Tag", "translate 'day' to german" );
});

test('retrieve transtaltions with new culture', function() {
  Globalize.culture = "pirate";
  Globalize.localize("translate", "pirate", "TARRRR");
  strictEqual( Globalize.localize("translate"), "TARRRR", "translate 'translate' to pirate language" );
});
