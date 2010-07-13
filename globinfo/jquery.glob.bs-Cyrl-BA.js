(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["bs-Cyrl-BA"] = $.extend(true, {}, en, {
        name: "bs-Cyrl-BA",
        englishName: "Bosnian (Cyrillic, Bosnia and Herzegovina)",
        nativeName: "босански (Босна и Херцеговина)",
        language: "bs-Cyrl",
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
                symbol: "КМ"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["недјеља","понедјељак","уторак","сриједа","четвртак","петак","субота"],
                    namesAbbr: ["нед","пон","уто","сре","чет","пет","суб"],
                    namesShort: ["н","п","у","с","ч","п","с"]
                },
                months: {
                    names: ["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар",""],
                    namesAbbr: ["јан","феб","мар","апр","мај","јун","јул","авг","сеп","окт","нов","дец",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"н.е.","start":null,"offset":0}],
                patterns: {
                    d: "d.M.yyyy",
                    D: "d. MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d. MMMM yyyy H:mm",
                    F: "d. MMMM yyyy H:mm:ss",
                    M: "d. MMMM"
                }
            })
        }
    }, cultures["bs-Cyrl-BA"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);