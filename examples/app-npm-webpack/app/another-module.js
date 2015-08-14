var Globalize = require( "globalize" );

// Use Globalize to format dates.
document.getElementById( "date" ).innerHTML = Globalize.formatDate( new Date(), {
	datetime: "medium"
});
