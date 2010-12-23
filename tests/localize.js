module('jQuery.localize');

test('set and retrieve translations', function() {
  $.localize("translate", "fr", "traduire");
  strictEqual( $.localize("translate", "fr"), "traduire", "translate 'translate' to french" );
});

test('set and retrieve translations in plugins', function() {
  $.localize("jQuery.localize", "de", {
    day: "Tag",
    month: "Monat"
  });
  strictEqual( $.localize("jQuery.localize", "de").day, "Tag", "translate 'day' to german" );
});
