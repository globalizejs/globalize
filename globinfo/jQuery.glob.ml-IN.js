(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["ml-IN"] = $.extend(true, {}, invariant, {
        name: "ml-IN",
        englishName: "Malayalam (India)",
        nativeName: "മലയാളം (ഭാരതം)",
        numberFormat: {
            groupSizes: [3,2],
            percent: {
                pattern: ["-%n","%n"],
                groupSizes: [3,2]
            },
            currency: {
                pattern: ["$ -n","$ n"],
                groupSizes: [3,2],
                symbol: "ക"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                days: [["ഞായറാഴ്ച","തിങ്കളാഴ്ച","ചൊവ്വാഴ്ച","ബുധനാഴ്ച","വ്യാഴാഴ്ച","വെള്ളിയാഴ്ച","ശനിയാഴ്ച"],["ഞായർ.","തിങ്കൾ.","ചൊവ്വ.","ബുധൻ.","വ്യാഴം.","വെള്ളി.","ശനി."]],
                months: [["ജനുവരി","ഫെബ്റുവരി","മാറ്ച്ച്","ഏപ്റില്","മെയ്","ജൂണ്","ജൂലൈ","ഓഗസ്ററ്","സെപ്ററംബറ്","ഒക്ടോബറ്","നവംബറ്","ഡിസംബറ്",""],["ജനുവരി","ഫെബ്റുവരി","മാറ്ച്ച്","ഏപ്റില്","മെയ്","ജൂണ്","ജൂലൈ","ഓഗസ്ററ്","സെപ്ററംബറ്","ഒക്ടോബറ്","നവംബറ്","ഡിസംബറ്",""]],
                patterns: {
                    d: "dd-MM-yy",
                    D: "dd MMMM yyyy",
                    t: "HH.mm",
                    T: "HH.mm.ss",
                    f: "dd MMMM yyyy HH.mm",
                    F: "dd MMMM yyyy HH.mm.ss",
                    M: "dd MMMM",
                    Y: "MMMM, yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);