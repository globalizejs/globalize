(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["ga"] = $.extend(true, {}, en, {
        name: "ga",
        englishName: "Irish",
        nativeName: "Gaeilge",
        language: "ga",
        numberFormat: {
            currency: {
                pattern: ["-$n","$n"],
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                firstDay: 1,
                days: {
                    names: ["Dé Domhnaigh","Dé Luain","Dé Máirt","Dé Céadaoin","Déardaoin","Dé hAoine","Dé Sathairn"],
                    namesAbbr: ["Domh","Luan","Máir","Céad","Déar","Aoi","Sath"],
                    namesShort: ["Do","Lu","Má","Cé","De","Ao","Sa"]
                },
                months: {
                    names: ["Eanáir","Feabhra","Márta","Aibreán","Bealtaine","Meitheamh","Iúil","Lúnasa","Meán Fómhair","Deireadh Fómhair","Samhain","Nollaig",""],
                    namesAbbr: ["Ean","Feabh","Már","Aib","Bealt","Meith","Iúil","Lún","M.Fómh","D.Fómh","Samh","Noll",""]
                },
                AM: ["r.n.","r.n.","R.N."],
                PM: ["i.n.","i.n.","I.N."],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "d MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "d MMMM yyyy HH:mm",
                    F: "d MMMM yyyy HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["ga"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);