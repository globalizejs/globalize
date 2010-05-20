(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["pt"] = $.extend(true, {}, invariant, {
        name: "pt",
        englishName: "Portuguese",
        nativeName: "Português",
        language: "pt",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["-$ n","$ n"],
                ',': ".",
                '.': ",",
                symbol: "R$"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],["dom","seg","ter","qua","qui","sex","sáb"],["D","S","T","Q","Q","S","S"]],
                months: [["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro",""],["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez",""]],
                AM: null,
                PM: null,
                eras: [{"name":"d.C.","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d\u0027 de \u0027MMMM\u0027 de \u0027yyyy",
                    f: "dddd, d\u0027 de \u0027MMMM\u0027 de \u0027yyyy HH:mm",
                    F: "dddd, d\u0027 de \u0027MMMM\u0027 de \u0027yyyy HH:mm:ss",
                    M: "dd\u0027 de \u0027MMMM",
                    Y: "MMMM\u0027 de \u0027yyyy"
                }
            })
        }
    }, cultures["pt"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);