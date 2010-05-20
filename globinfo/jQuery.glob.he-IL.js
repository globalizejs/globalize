(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["he-IL"] = $.extend(true, {}, invariant, {
        name: "he-IL",
        englishName: "Hebrew (Israel)",
        nativeName: "עברית (ישראל)",
        language: "he",
        isRTL: true,
        numberFormat: {
            percent: {
                pattern: ["-n%","n%"]
            },
            currency: {
                pattern: ["$-n","$ n"],
                symbol: "₪"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["יום ראשון","יום שני","יום שלישי","יום רביעי","יום חמישי","יום שישי","שבת"],["יום א","יום ב","יום ג","יום ד","יום ה","יום ו","שבת"],["א","ב","ג","ד","ה","ו","ש"]],
                months: [["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר",""],["ינו","פבר","מרץ","אפר","מאי","יונ","יול","אוג","ספט","אוק","נוב","דצמ",""]],
                eras: [{"name":"לספירה","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd dd MMMM yyyy",
                    f: "dddd dd MMMM yyyy HH:mm",
                    F: "dddd dd MMMM yyyy HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            }),
            Hebrew: $.extend(true, {}, standard, {
                name: "Hebrew",
                '/': " ",
                days: [["יום ראשון","יום שני","יום שלישי","יום רביעי","יום חמישי","יום שישי","שבת"],["א","ב","ג","ד","ה","ו","ש"],["א","ב","ג","ד","ה","ו","ש"]],
                months: [["תשרי","חשון","כסלו","טבת","שבט","אדר","אדר ב","ניסן","אייר","סיון","תמוז","אב","אלול"],["תשרי","חשון","כסלו","טבת","שבט","אדר","אדר ב","ניסן","אייר","סיון","תמוז","אב","אלול"]],
                eras: [{"name":"C.E.","start":null,"offset":0}],
                twoDigitYearMax: 5790,
                patterns: {
                    d: "dd MMMM yyyy",
                    D: "dddd dd MMMM yyyy",
                    f: "dddd dd MMMM yyyy HH:mm",
                    F: "dddd dd MMMM yyyy HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["he-IL"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);