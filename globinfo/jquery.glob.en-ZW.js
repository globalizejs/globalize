(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["en-ZW"] = $.extend(true, {}, en, {
        name: "en-ZW",
        englishName: "English (Zimbabwe)",
        nativeName: "English (Zimbabwe)",
        numberFormat: {
            currency: {
                symbol: "Z$"
            }
        }
    }, cultures["en-ZW"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);