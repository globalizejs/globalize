module('jQuery.localize', {
  teardown: function() {
    $.culture = undefined;
  }
});


test('set and retrieve translations', function() {
  $.localize("translate", "fr", "traduire");
  strictEqual( $.localize("translate", "fr"), "traduire", "translate 'translate' to french" );
});

test('set and retrieve plugin translations', function() {
  $.localize("jQuery.localize.plugin", "de", {
    day: "Tag",
    month: "Monat"
  });
  strictEqual( $.localize("jQuery.localize.plugin", "de").day, "Tag", "translate 'day' to german" );
});

test('retrieve translations with assigned culture', function() {
  $.culture = $.cultures.fr;
  $.localize("translate", "fr", "traduire");
  strictEqual( $.localize("translate"), "traduire", "translate 'translate' to french" );
});

test('retrieve plugin translations with assigned culture', function() {
  $.culture = $.cultures.de;
  $.localize("jQuery.localize", "de", {
    day: "Tag",
    month: "Monat"
  });
  strictEqual( $.localize("jQuery.localize").day, "Tag", "translate 'day' to german" );
});

test('retrieve transtaltions with new culture', function() {
  $.culture = "pirate";
  $.localize("translate", "pirate", "TARRRR");
  strictEqual( $.localize("translate"), "TARRRR", "translate 'translate' to pirate language" );
});
