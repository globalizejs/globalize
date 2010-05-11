(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["sk-SK"] = $.extend(true, {}, invariant, {
        name: "sk-SK",
        englishName: "Slovak (Slovakia)",
        nativeName: "slovenčina (Slovenská republika)",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
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
                '/': ". ",
                days: [["nedeľa","pondelok","utorok","streda","štvrtok","piatok","sobota"],["ne","po","ut","st","št","pi","so"]],
                months: [["január","február","marec","apríl","máj","jún","júl","august","september","október","november","december",""],["1","2","3","4","5","6","7","8","9","10","11","12",""]],
                monthsGenitive: [["januára","februára","marca","apríla","mája","júna","júla","augusta","septembra","októbra","novembra","decembra",""],["1","2","3","4","5","6","7","8","9","10","11","12",""]],
                AM: "",
                PM: "",
                eras: [{"name":"n. l.","start":null,"offset":0}],
                patterns: {
                    d: "d. M. yyyy",
                    D: "d. MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d. MMMM yyyy H:mm",
                    F: "d. MMMM yyyy H:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);