(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["fr-CH"] = $.extend(true, {}, invariant, {
        name: "fr-CH",
        englishName: "French (Switzerland)",
        nativeName: "français (Suisse)",
        language: "fr",
        numberFormat: {
            ',': "\u0027",
            percent: {
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
                '/': ".",
                firstDay: 1,
                days: [["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],["di","lu","ma","me","je","ve","sa"]],
                months: [["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]],
                AM: null,
                PM: null,
                eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "dddd d MMMM yyyy",
                    f: "dddd d MMMM yyyy HH:mm",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["fr-CH"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);