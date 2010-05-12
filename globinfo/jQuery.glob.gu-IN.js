(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["gu-IN"] = $.extend(true, {}, invariant, {
        name: "gu-IN",
        englishName: "Gujarati (India)",
        nativeName: "ગુજરાતી (ભારત)",
        numberFormat: {
            groupSizes: [3,2],
            percent: {
                groupSizes: [3,2]
            },
            currency: {
                pattern: ["$ -n","$ n"],
                groupSizes: [3,2],
                symbol: "રૂ"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                firstDay: 1,
                days: [["રવિવાર","સોમવાર","મંગળવાર","બુધવાર","ગુરુવાર","શુક્રવાર","શનિવાર"],["રવિ","સોમ","મંગળ","બુધ","ગુરુ","શુક્ર","શનિ"],["ર","સ","મ","બ","ગ","શ","શ"]],
                months: [["જાન્યુઆરી","ફેબ્રુઆરી","માર્ચ","એપ્રિલ","મે","જૂન","જુલાઈ","ઑગસ્ટ","સપ્ટેમ્બર","ઑક્ટ્બર","નવેમ્બર","ડિસેમ્બર",""],["જાન્યુ","ફેબ્રુ","માર્ચ","એપ્રિલ","મે","જૂન","જુલાઈ","ઑગસ્ટ","સપ્ટે","ઑક્ટો","નવે","ડિસે",""]],
                AM: ["પૂર્વ મધ્યાહ્ન","પૂર્વ મધ્યાહ્ન","પૂર્વ મધ્યાહ્ન"],
                PM: ["ઉત્તર મધ્યાહ્ન","ઉત્તર મધ્યાહ્ન","ઉત્તર મધ્યાહ્ન"],
                patterns: {
                    d: "dd-MM-yy",
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