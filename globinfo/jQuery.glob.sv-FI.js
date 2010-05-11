(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["sv-FI"] = $.extend(true, {}, invariant, {
        name: "sv-FI",
        englishName: "Swedish (Finland)",
        nativeName: "svenska (Finland)",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': " ",
                '.': ",",
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                days: [["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"],["sö","må","ti","on","to","fr","lö"]],
                months: [["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december",""],["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec",""]],
                AM: "",
                PM: "",
                patterns: {
                    d: "d.M.yyyy",
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