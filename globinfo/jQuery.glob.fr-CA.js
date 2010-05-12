(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["fr-CA"] = $.extend(true, {}, invariant, {
        name: "fr-CA",
        englishName: "French (Canada)",
        nativeName: "français (Canada)",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["(n $)","n $"],
                ',': " ",
                '.': ",",
                symbol: "$"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                days: [["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],["di","lu","ma","me","je","ve","sa"]],
                months: [["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]],
                AM: null,
                PM: null,
                eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "d MMMM yyyy",
                    f: "d MMMM yyyy HH:mm",
                    F: "d MMMM yyyy HH:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM, yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);