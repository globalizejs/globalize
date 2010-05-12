(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["sv-SE"] = $.extend(true, {}, invariant, {
        name: "sv-SE",
        englishName: "Swedish (Sweden)",
        nativeName: "svenska (Sverige)",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "kr"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                firstDay: 1,
                days: [["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"],["sö","må","ti","on","to","fr","lö"],["sö","må","ti","on","to","fr","lö"]],
                months: [["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december",""],["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "\u0027den \u0027d MMMM yyyy",
                    f: "\u0027den \u0027d MMMM yyyy HH:mm",
                    F: "\u0027den \u0027d MMMM yyyy HH:mm:ss",
                    M: "\u0027den \u0027d MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);