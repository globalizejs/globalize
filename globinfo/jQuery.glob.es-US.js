(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["es-US"] = $.extend(true, {}, invariant, {
        name: "es-US",
        englishName: "Spanish (United States)",
        nativeName: "Español (Estados Unidos)",
        language: "es",
        numberFormat: {
            groupSizes: [3,0],
            percent: {
                groupSizes: [3,0]
            },
            currency: {
                symbol: "$"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: {
                    names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
                    namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
                    namesShort: ["do","lu","ma","mi","ju","vi","sa"]
                },
                months: {
                    names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
                    namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
                },
                eras: [{"name":"d.C.","start":null,"offset":0}],
                patterns: {
                    d: "M/d/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "dddd, MMMM dd, yyyy h:mm tt",
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    M: "dd' de 'MMMM",
                    Y: "MMMM' de 'yyyy"
                }
            })
        }
    }, cultures["es-US"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);