(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["pt-PT"] = $.extend(true, {}, invariant, {
        name: "pt-PT",
        englishName: "Portuguese (Portugal)",
        nativeName: "português (Portugal)",
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
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                firstDay: 1,
                days: [["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],["dom","seg","ter","qua","qui","sex","sáb"],["D","S","T","Q","Q","S","S"]],
                months: [["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",""],["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez",""]],
                AM: null,
                PM: null,
                eras: [{"name":"d.C.","start":null,"offset":0}],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dddd, d\u0027 de \u0027MMMM\u0027 de \u0027yyyy",
                    f: "dddd, d\u0027 de \u0027MMMM\u0027 de \u0027yyyy HH:mm",
                    F: "dddd, d\u0027 de \u0027MMMM\u0027 de \u0027yyyy HH:mm:ss",
                    M: "d/M",
                    Y: "MMMM\u0027 de \u0027yyyy"
                }
            })
        }
    }, cultures["pt-PT"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);