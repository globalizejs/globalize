(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["br"] = $.extend(true, {}, invariant, {
        name: "br",
        englishName: "Breton",
        nativeName: "brezhoneg",
        language: "br",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
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
                firstDay: 1,
                days: [["Sul","Lun","Meurzh","Merc\u0027her","Yaou","Gwener","Sadorn"],["Sul","Lun","Meu.","Mer.","Yaou","Gwe.","Sad."],["Su","Lu","Mz","Mc","Ya","Gw","Sa"]],
                months: [["Genver","C\u0027hwevrer","Meurzh","Ebrel","Mae","Mezheven","Gouere","Eost","Gwengolo","Here","Du","Kerzu",""],["Gen.","C\u0027hwe.","Meur.","Ebr.","Mae","Mezh.","Goue.","Eost","Gwen.","Here","Du","Kzu",""]],
                AM: null,
                PM: null,
                eras: [{"name":"g. J.-K.","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd d MMMM yyyy",
                    f: "dddd d MMMM yyyy HH:mm",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["br"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);