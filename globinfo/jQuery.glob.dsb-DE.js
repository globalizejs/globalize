(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["dsb-DE"] = $.extend(true, {}, invariant, {
        name: "dsb-DE",
        englishName: "Lower Sorbian (Germany)",
        nativeName: "dolnoserbšćina (Nimska)",
        language: "dsb",
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
                firstDay: 1,
                days: [["njeźela","ponjeźele","wałtora","srjoda","stwortk","pětk","sobota"],["nje","pon","wał","srj","stw","pět","sob"],["n","p","w","s","s","p","s"]],
                months: [["januar","februar","měrc","apryl","maj","junij","julij","awgust","september","oktober","nowember","december",""],["jan","feb","měr","apr","maj","jun","jul","awg","sep","okt","now","dec",""]],
                monthsGenitive: [["januara","februara","měrca","apryla","maja","junija","julija","awgusta","septembra","oktobra","nowembra","decembra",""],["jan","feb","měr","apr","maj","jun","jul","awg","sep","okt","now","dec",""]],
                AM: null,
                PM: null,
                eras: [{"name":"po Chr.","start":null,"offset":0}],
                patterns: {
                    d: "d. M. yyyy",
                    D: "dddd, \u0027dnja\u0027 d. MMMM yyyy",
                    t: "H.mm \u0027goź.\u0027",
                    T: "H:mm:ss",
                    f: "dddd, \u0027dnja\u0027 d. MMMM yyyy H.mm \u0027goź.\u0027",
                    F: "dddd, \u0027dnja\u0027 d. MMMM yyyy H:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["dsb-DE"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);