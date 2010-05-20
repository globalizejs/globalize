(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["da-DK"] = $.extend(true, {}, invariant, {
        name: "da-DK",
        englishName: "Danish (Denmark)",
        nativeName: "dansk (Danmark)",
        language: "da",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["$ -n","$ n"],
                ',': ".",
                '.': ",",
                symbol: "kr."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                firstDay: 1,
                days: [["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],["sø","ma","ti","on","to","fr","lø"],["sø","ma","ti","on","to","fr","lø"]],
                months: [["januar","februar","marts","april","maj","juni","juli","august","september","oktober","november","december",""],["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "d. MMMM yyyy",
                    f: "d. MMMM yyyy HH:mm",
                    F: "d. MMMM yyyy HH:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["da-DK"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);