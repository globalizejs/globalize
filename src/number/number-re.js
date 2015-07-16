define(function() {

/**
 * EBNF representation:
 *
 * number_pattern_re =        prefix_including_padding?
 *                            number
 *                            scientific_notation?
 *                            suffix?
 *
 * number =                   integer_including_group_separator fraction_including_decimal_separator
 *
 * integer_including_group_separator =
 *                            regexp([0-9,]*[0-9]+)
 *
 * fraction_including_decimal_separator =
 *                            regexp((\.[0-9]+)?)

 * prefix_including_padding = non_number_stuff
 *
 * scientific_notation =      regexp(E[+-]?[0-9]+)
 *
 * suffix =                   non_number_stuff
 *
 * non_number_stuff =         regexp([^0-9]*)
 *
 *
 * Regexp groups:
 *
 * 0: number_pattern_re
 * 1: prefix
 * 2: integer_including_group_separator fraction_including_decimal_separator
 * 3: integer_including_group_separator
 * 4: fraction_including_decimal_separator
 * 5: scientific_notation
 * 6: suffix
 */
return ( /^([^0-9]*)(([0-9,]*[0-9]+)(\.[0-9]+)?)(E[+-]?[0-9]+)?([^0-9]*)$/ );

});
