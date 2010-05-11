(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["hsb-DE"] = $.extend(true, {}, invariant, {
        name: "hsb-DE",
        englishName: "Upper Sorbian (Germany)",
        nativeName: "hornjoserbšćina (Němska)",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
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
                '/': ". ",
                days: [["njedźela","póndźela","wutora","srjeda","štwórtk","pjatk","sobota"],["nje","pón","wut","srj","štw","pja","sob"]],
                months: [["januar","februar","měrc","apryl","meja","junij","julij","awgust","september","oktober","nowember","december",""],["jan","feb","měr","apr","mej","jun","jul","awg","sep","okt","now","dec",""]],
                monthsGenitive: [["januara","februara","měrca","apryla","meje","junija","julija","awgusta","septembra","oktobra","nowembra","decembra",""],["jan","feb","měr","apr","mej","jun","jul","awg","sep","okt","now","dec",""]],
                AM: "",
                PM: "",
                eras: [{"name":"po Chr.","start":null,"offset":0}],
                patterns: {
                    d: "d. M. yyyy",
                    D: "dddd, \u0027dnja\u0027 d. MMMM yyyy",
                    t: "H.mm \u0027hodź.\u0027",
                    T: "H:mm:ss",
                    f: "dddd, \u0027dnja\u0027 d. MMMM yyyy H.mm \u0027hodź.\u0027",
                    F: "dddd, \u0027dnja\u0027 d. MMMM yyyy H:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);