(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["mk-MK"] = $.extend(true, {}, invariant, {
        name: "mk-MK",
        englishName: "Macedonian (Former Yugoslav Republic of Macedonia)",
        nativeName: "македонски јазик (Македонија)",
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
                symbol: "ден."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["недела","понеделник","вторник","среда","четврток","петок","сабота"],["нед","пон","втр","срд","чет","пет","саб"],["не","по","вт","ср","че","пе","са"]],
                months: [["јануари","февруари","март","април","мај","јуни","јули","август","септември","октомври","ноември","декември",""],["јан","фев","мар","апр","мај","јун","јул","авг","сеп","окт","ное","дек",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);