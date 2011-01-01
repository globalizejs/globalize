$(document).ready(function() {
  $.extend($.tmpl.tag, {
    "t": {
      _default: { $2: 'null' },
      open: "var localize_path = $1.split('.'); var depth = localize_path.length; var localized = jQuery.localize(localize_path[0], $2); for(i = 1; i < depth; i++) { localized = localized[localize_path[i]]; }; _.push(localized);"
    }
  });

  $.culture = "en";

  $.localize("home", "en", {
    desc: "Great movies",
    movies: {
      clockwork_orange: {
        name: "A Clockwork Orange"
      },
      eternal_sunshine: {
        name: "Eternal Sunshine of the Spotless Mind"
      }
    }
  });

  $.localize("home", "de", {
    desc: "Tolle Filme",
    movies: {
      clockwork_orange: {
        name: "Uhrwerk Orange"
      },
      eternal_sunshine: {
        name: "Vergiss mein nicht!"
      }
    }
  });

  var home = {
    movies: [
      { Name: "home.movies.clockwork_orange.name", release: "1971" },
      { Name: "home.movies.eternal_sunshine.name", release: "2004" }
    ]
  };

  $( "#movies-tmpl" ).tmpl( home ).appendTo( "#movies" );
});
