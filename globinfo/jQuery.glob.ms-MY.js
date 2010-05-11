(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["ms-MY"] = $.extend(true, {}, invariant, {
        name: "ms-MY",
        englishName: "Malay (Malaysia)",
        nativeName: "Bahasa Melayu (Malaysia)",
        numberFormat: {
            currency: {
                decimals: 0,
                symbol: "RM"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"],["Ahad","Isnin","Sel","Rabu","Khamis","Jumaat","Sabtu"]],
                months: [["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember",""],["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogos","Sept","Okt","Nov","Dis",""]],
                AM: "",
                PM: "",
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dd MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "dd MMMM yyyy H:mm",
                    F: "dd MMMM yyyy H:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);