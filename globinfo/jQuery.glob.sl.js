(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["sl"] = $.extend(true, {}, invariant, {
        name: "sl",
        englishName: "Slovenian",
        nativeName: "slovenski",
        language: "sl",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["nedelja","ponedeljek","torek","sreda","četrtek","petek","sobota"],["ned","pon","tor","sre","čet","pet","sob"],["ne","po","to","sr","če","pe","so"]],
                months: [["januar","februar","marec","april","maj","junij","julij","avgust","september","oktober","november","december",""],["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "d.M.yyyy",
                    D: "d. MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d. MMMM yyyy H:mm",
                    F: "d. MMMM yyyy H:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["sl"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);