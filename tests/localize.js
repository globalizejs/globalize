module('localize', {
  teardown: function() {
    $.global.culture = undefined;
  }
});


test('set and retrieve translations', function() {
  $.global.localize("translate", "fr", "traduire");
  strictEqual( $.global.localize("translate", "fr"), "traduire", "translate 'translate' to french" );
});

test('set and retrieve plugin translations', function() {
  $.global.localize("jQuery.localize.plugin", "de", {
    day: "Tag",
    month: "Monat"
  });
  strictEqual( $.global.localize("jQuery.localize.plugin", "de").day, "Tag", "translate 'day' to german" );
});

test('retrieve translations with assigned culture', function() {
  $.global.culture = $.global.cultures.fr;
  $.global.localize("translate", "fr", "traduire");
  strictEqual( $.global.localize("translate"), "traduire", "translate 'translate' to french" );
});

test('retrieve plugin translations with assigned culture', function() {
  $.global.culture = $.global.cultures.de;
  $.global.localize("jQuery.localize", "de", {
    day: "Tag",
    month: "Monat"
  });
  strictEqual( $.global.localize("jQuery.localize").day, "Tag", "translate 'day' to german" );
});

test('retrieve transtaltions with new culture', function() {
  $.global.culture = "pirate";
  $.global.localize("translate", "pirate", "TARRRR");
  strictEqual( $.global.localize("translate"), "TARRRR", "translate 'translate' to pirate language" );
});
