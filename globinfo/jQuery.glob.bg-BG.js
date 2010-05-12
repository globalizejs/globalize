(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["bg-BG"] = $.extend(true, {}, invariant, {
        name: "bg-BG",
        englishName: "Bulgarian (Bulgaria)",
        nativeName: "български (България)",
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
                symbol: "лв."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["неделя","понеделник","вторник","сряда","четвъртък","петък","събота"],["нед","пон","вт","ср","четв","пет","съб"],["н","п","в","с","ч","п","с"]],
                months: [["януари","февруари","март","април","май","юни","юли","август","септември","октомври","ноември","декември",""],["ян","февр","март","апр","май","юни","юли","авг","септ","окт","ноември","дек",""]],
                AM: null,
                PM: null,
                eras: [{"name":"след новата ера","start":null,"offset":0}],
                patterns: {
                    d: "d.M.yyyy \u0027г.\u0027",
                    D: "dd MMMM yyyy \u0027г.\u0027",
                    t: "HH:mm \u0027ч.\u0027",
                    T: "HH:mm:ss \u0027ч.\u0027",
                    f: "dd MMMM yyyy \u0027г.\u0027 HH:mm \u0027ч.\u0027",
                    F: "dd MMMM yyyy \u0027г.\u0027 HH:mm:ss \u0027ч.\u0027",
                    M: "dd MMMM",
                    Y: "MMMM yyyy \u0027г.\u0027"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);