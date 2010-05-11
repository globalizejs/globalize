(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["es-CL"] = $.extend(true, {}, invariant, {
        name: "es-CL",
        englishName: "Spanish (Chile)",
        nativeName: "Español (Chile)",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["-$ n","$ n"],
                ',': ".",
                '.': ",",
                symbol: "$"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                days: [["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],["dom","lun","mar","mié","jue","vie","sáb"]],
                months: [["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]],
                AM: "",
                PM: "",
                eras: [{"name":"d.C.","start":null,"offset":0}],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dddd, dd\u0027 de \u0027MMMM\u0027 de \u0027yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "dddd, dd\u0027 de \u0027MMMM\u0027 de \u0027yyyy H:mm",
                    F: "dddd, dd\u0027 de \u0027MMMM\u0027 de \u0027yyyy H:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM\u0027 de \u0027yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);