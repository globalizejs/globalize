(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["br-FR"] = $.extend(true, {}, en, {
        name: "br-FR",
        englishName: "Breton (France)",
        nativeName: "brezhoneg (Frañs)",
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
                firstDay: 1,
                days: {
                    names: ["Sul","Lun","Meurzh","Merc'her","Yaou","Gwener","Sadorn"],
                    namesAbbr: ["Sul","Lun","Meu.","Mer.","Yaou","Gwe.","Sad."],
                    namesShort: ["Su","Lu","Mz","Mc","Ya","Gw","Sa"]
                },
                months: {
                    names: ["Genver","C'hwevrer","Meurzh","Ebrel","Mae","Mezheven","Gouere","Eost","Gwengolo","Here","Du","Kerzu",""],
                    namesAbbr: ["Gen.","C'hwe.","Meur.","Ebr.","Mae","Mezh.","Goue.","Eost","Gwen.","Here","Du","Kzu",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"g. J.-K.","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd d MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dddd d MMMM yyyy HH:mm",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["br-FR"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);