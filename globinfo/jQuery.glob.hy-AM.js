(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["hy-AM"] = $.extend(true, {}, invariant, {
        name: "hy-AM",
        englishName: "Armenian (Armenia)",
        nativeName: "Հայերեն (Հայաստան)",
        numberFormat: {
            currency: {
                pattern: ["-n $","n $"],
                symbol: "դր."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["Կիրակի","Երկուշաբթի","Երեքշաբթի","Չորեքշաբթի","Հինգշաբթի","ՈՒրբաթ","Շաբաթ"],["Կիր","Երկ","Երք","Չրք","Հնգ","ՈՒր","Շբթ"],["Կ","Ե","Ե","Չ","Հ","Ո","Շ"]],
                months: [["Հունվար","Փետրվար","Մարտ","Ապրիլ","Մայիս","Հունիս","Հուլիս","Օգոստոս","Սեպտեմբեր","Հոկտեմբեր","Նոյեմբեր","Դեկտեմբեր",""],["ՀՆՎ","ՓՏՎ","ՄՐՏ","ԱՊՐ","ՄՅՍ","ՀՆՍ","ՀԼՍ","ՕԳՍ","ՍԵՊ","ՀՈԿ","ՆՈՅ","ԴԵԿ",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d MMMM, yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d MMMM, yyyy H:mm",
                    F: "d MMMM, yyyy H:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM, yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);