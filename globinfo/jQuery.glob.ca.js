(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["ca"] = $.extend(true, {}, invariant, {
        name: "ca",
        englishName: "Catalan",
        nativeName: "català",
        language: "ca",
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
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                firstDay: 1,
                days: {
                    names: ["diumenge","dilluns","dimarts","dimecres","dijous","divendres","dissabte"],
                    namesAbbr: ["dg.","dl.","dt.","dc.","dj.","dv.","ds."],
                    namesShort: ["dg","dl","dt","dc","dj","dv","ds"]
                },
                months: {
                    names: ["gener","febrer","març","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre",""],
                    namesAbbr: ["gen","feb","març","abr","maig","juny","jul","ag","set","oct","nov","des",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"d.C.","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d' / 'MMMM' / 'yyyy",
                    f: "dddd, d' / 'MMMM' / 'yyyy HH:mm",
                    F: "dddd, d' / 'MMMM' / 'yyyy HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM' / 'yyyy"
                }
            })
        }
    }, cultures["ca"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);