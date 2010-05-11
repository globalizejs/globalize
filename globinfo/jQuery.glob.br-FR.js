(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["br-FR"] = $.extend(true, {}, invariant, {
        name: "br-FR",
        englishName: "Breton (France)",
        nativeName: "brezhoneg (Frañs)",
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
                days: [["Sul","Lun","Meurzh","Merc\u0027her","Yaou","Gwener","Sadorn"],["Sul","Lun","Meu.","Mer.","Yaou","Gwe.","Sad."]],
                months: [["Genver","C\u0027hwevrer","Meurzh","Ebrel","Mae","Mezheven","Gouere","Eost","Gwengolo","Here","Du","Kerzu",""],["Gen.","C\u0027hwe.","Meur.","Ebr.","Mae","Mezh.","Goue.","Eost","Gwen.","Here","Du","Kzu",""]],
                AM: "",
                PM: "",
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
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);