(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["en-PH"] = $.extend(true, {}, en, {
        name: "en-PH",
        englishName: "English (Republic of the Philippines)",
        nativeName: "English (Philippines)",
        numberFormat: {
            currency: {
                symbol: "Php"
            }
        }
    }, cultures["en-PH"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);