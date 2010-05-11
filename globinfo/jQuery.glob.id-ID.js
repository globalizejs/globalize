(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["id-ID"] = $.extend(true, {}, invariant, {
        name: "id-ID",
        englishName: "Indonesian (Indonesia)",
        nativeName: "Bahasa Indonesia (Indonesia)",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                ',': ".",
                '.': ","
            },
            currency: {
                decimals: 0,
                ',': ".",
                '.': ",",
                symbol: "Rp"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],["Minggu","Sen","Sel","Rabu","Kamis","Jumat","Sabtu"]],
                months: [["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","Nopember","Desember",""],["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agust","Sep","Okt","Nop","Des",""]],
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