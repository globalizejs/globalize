(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["rm"] = $.extend(true, {}, invariant, {
        name: "rm",
        englishName: "Romansh",
        nativeName: "Rumantsch",
        language: "rm",
        numberFormat: {
            ',': "\u0027",
            percent: {
                pattern: ["-n%","n%"],
                ',': "\u0027"
            },
            currency: {
                pattern: ["$-n","$ n"],
                ',': "\u0027",
                symbol: "fr."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                firstDay: 1,
                days: [["dumengia","glindesdi","mardi","mesemna","gievgia","venderdi","sonda"],["du","gli","ma","me","gie","ve","so"],["du","gli","ma","me","gie","ve","so"]],
                months: [["schaner","favrer","mars","avrigl","matg","zercladur","fanadur","avust","settember","october","november","december",""],["schan","favr","mars","avr","matg","zercl","fan","avust","sett","oct","nov","dec",""]],
                AM: null,
                PM: null,
                eras: [{"name":"s. Cr.","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d MMMM yyyy",
                    f: "dddd, d MMMM yyyy HH:mm",
                    F: "dddd, d MMMM yyyy HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["rm"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);