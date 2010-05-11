(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["pl-PL"] = $.extend(true, {}, invariant, {
        name: "pl-PL",
        englishName: "Polish (Poland)",
        nativeName: "polski (Polska)",
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
                symbol: "zł"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                days: [["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"],["N","Pn","Wt","Śr","Cz","Pt","So"]],
                months: [["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień",""],["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru",""]],
                monthsGenitive: [["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia",""],["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru",""]],
                AM: "",
                PM: "",
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "d MMMM yyyy",
                    f: "d MMMM yyyy HH:mm",
                    F: "d MMMM yyyy HH:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);