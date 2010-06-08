(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["en-US"] = $.extend(true, {}, en, {

    }, cultures["en-US"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);