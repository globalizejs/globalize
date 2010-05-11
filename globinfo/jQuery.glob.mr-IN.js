(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["mr-IN"] = $.extend(true, {}, invariant, {
        name: "mr-IN",
        englishName: "Marathi (India)",
        nativeName: "मराठी (भारत)",
        numberFormat: {
            groupSizes: [3,2],
            percent: {
                groupSizes: [3,2]
            },
            currency: {
                pattern: ["$ -n","$ n"],
                groupSizes: [3,2],
                symbol: "रु"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                days: [["रविवार","सोमवार","मंगळवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"],["रवि.","सोम.","मंगळ.","बुध.","गुरु.","शुक्र.","शनि."]],
                months: [["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टेंबर","ऑक्टोबर","नोव्हेंबर","डिसेंबर",""],["जाने.","फेब्रु.","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टें.","ऑक्टो.","नोव्हें.","डिसें.",""]],
                AM: "म.पू.",
                PM: "म.नं.",
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dd MMMM yyyy",
                    f: "dd MMMM yyyy HH:mm",
                    F: "dd MMMM yyyy HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM, yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);