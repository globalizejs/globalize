(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["nl-NL"] = $.extend(true, {}, invariant, {
        name: "nl-NL",
        englishName: "Dutch (Netherlands)",
        nativeName: "Nederlands (Nederland)",
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
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                firstDay: 1,
                days: [["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"],["zo","ma","di","wo","do","vr","za"],["zo","ma","di","wo","do","vr","za"]],
                months: [["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december",""],["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "d-M-yyyy",
                    D: "dddd d MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "dddd d MMMM yyyy H:mm",
                    F: "dddd d MMMM yyyy H:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);