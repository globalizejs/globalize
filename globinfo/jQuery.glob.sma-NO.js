(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["sma-NO"] = $.extend(true, {}, invariant, {
        name: "sma-NO",
        englishName: "Sami, Southern (Norway)",
        nativeName: "åarjelsaemiengiele (Nöörje)",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-%n","%n"],
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["$ -n","$ n"],
                ',': " ",
                '.': ",",
                symbol: "kr"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                days: [["aejlege","måanta","dæjsta","gaskevåhkoe","duarsta","bearjadahke","laavvardahke"],["aej","måa","dæj","gask","duar","bearj","laav"]],
                months: [["tsïengele","goevte","njoktje","voerhtje","suehpede","ruffie","snjaltje","mïetske","skïerede","golke","rahka","goeve",""],["tsïen","goevt","njok","voer","sueh","ruff","snja","mïet","skïer","golk","rahk","goev",""]],
                monthsGenitive: [["tsïengelen","goevten","njoktjen","voerhtjen","suehpeden","ruffien","snjaltjen","mïetsken","skïereden","golken","rahkan","goeven",""],["tsïen","goevt","njok","voer","sueh","ruff","snja","mïet","skïer","golk","rahk","goev",""]],
                AM: "",
                PM: "",
                patterns: {
                    d: "dd.MM.yyyy",
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