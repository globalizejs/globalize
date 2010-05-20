(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["sr-Cyrl-ME"] = $.extend(true, {}, invariant, {
        name: "sr-Cyrl-ME",
        englishName: "Serbian (Cyrillic, Montenegro)",
        nativeName: "српски (Црна Гора)",
        language: "sr-Cyrl",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["недеља","понедељак","уторак","среда","четвртак","петак","субота"],["нед","пон","уто","сре","чет","пет","суб"],["не","по","ут","ср","че","пе","су"]],
                months: [["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар",""],["јан","феб","мар","апр","мај","јун","јул","авг","сеп","окт","нов","дец",""]],
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
                    M: "d. MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["sr-Cyrl-ME"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);