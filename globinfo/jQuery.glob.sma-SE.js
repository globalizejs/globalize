(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["sma-SE"] = $.extend(true, {}, invariant, {
        name: "sma-SE",
        englishName: "Sami, Southern (Sweden)",
        nativeName: "åarjelsaemiengiele (Sveerje)",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "kr"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                firstDay: 1,
                days: [["aejlege","måanta","dæjsta","gaskevåhkoe","duarsta","bearjadahke","laavvardahke"],["aej","måa","dæj","gask","duar","bearj","laav"],["a","m","d","g","d","b","l"]],
                months: [["tsïengele","goevte","njoktje","voerhtje","suehpede","ruffie","snjaltje","mïetske","skïerede","golke","rahka","goeve",""],["tsïen","goevt","njok","voer","sueh","ruff","snja","mïet","skïer","golk","rahk","goev",""]],
                monthsGenitive: [["tsïengelen","goevten","njoktjen","voerhtjen","suehpeden","ruffien","snjaltjen","mïetsken","skïereden","golken","rahkan","goeven",""],["tsïen","goevt","njok","voer","sueh","ruff","snja","mïet","skïer","golk","rahk","goev",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "MMMM d\u0027. b. \u0027yyyy",
                    f: "MMMM d\u0027. b. \u0027yyyy HH:mm",
                    F: "MMMM d\u0027. b. \u0027yyyy HH:mm:ss",
                    M: "MMMM d\u0027. b. \u0027",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);