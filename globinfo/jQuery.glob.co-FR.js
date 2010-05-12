(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["co-FR"] = $.extend(true, {}, invariant, {
        name: "co-FR",
        englishName: "Corsican (France)",
        nativeName: "Corsu (France)",
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
                days: [["dumenica","luni","marti","mercuri","ghjovi","venderi","sabbatu"],["dum.","lun.","mar.","mer.","ghj.","ven.","sab."],["du","lu","ma","me","gh","ve","sa"]],
                months: [["ghjennaghju","ferraghju","marzu","aprile","maghju","ghjunghju","lugliu","aostu","settembre","ottobre","nuvembre","dicembre",""],["ghje","ferr","marz","apri","magh","ghju","lugl","aost","sett","otto","nuve","dice",""]],
                AM: null,
                PM: null,
                eras: [{"name":"dopu J-C","start":null,"offset":0}],
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