(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["nn-NO"] = $.extend(true, {}, invariant, {
        name: "nn-NO",
        englishName: "Norwegian, Nynorsk (Norway)",
        nativeName: "norsk, nynorsk (Noreg)",
        language: "nn",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["$ -n","$ n"],
                ',': " ",
                '.': ",",
                symbol: "kr"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["søndag","måndag","tysdag","onsdag","torsdag","fredag","laurdag"],["sø","må","ty","on","to","fr","la"],["sø","må","ty","on","to","fr","la"]],
                months: [["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember",""],["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d. MMMM yyyy",
                    f: "d. MMMM yyyy HH:mm",
                    F: "d. MMMM yyyy HH:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["nn-NO"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);