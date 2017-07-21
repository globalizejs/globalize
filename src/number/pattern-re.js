define(function() {

/**
 * EBNF representation:
 *
 * number_pattern_re =        prefix?
 *                            padding?
 *                            (integer_fraction_pattern | significant_pattern)
 *                            scientific_notation?
 *                            suffix?
 *
 * prefix =                   non_number_stuff
 *
 * padding =                  "*" regexp(.)
 *
 * integer_fraction_pattern = integer_pattern
 *                            fraction_pattern?
 *
 * integer_pattern =          regexp([#,]*[0,]*0+)
 *
 * fraction_pattern =         "." regexp(0*[0-9]*#*)
 *
 * significant_pattern =      regexp([#,]*@+#*)
 *
 * scientific_notation =      regexp(E\+?0+)
 *
 * suffix =                   non_number_stuff
 *
 * non_number_stuff =         regexp(('[^']+'|''|[^*#@0,.E])*)
 *
 *
 * Regexp groups:
 *
 *  0: number_pattern_re
 *  1: prefix
 *  2: -
 *  3: -
 *  4: padding
 *  5: (integer_fraction_pattern | significant_pattern)
 *  6: integer_fraction_pattern
 *  7: integer_pattern
 *  8: fraction_pattern
 *  9: significant_pattern
 * 10: scientific_notation
 * 11: suffix
 * 12: -
 */
return ( /^(('([^']|'')*'|[^*#@0,.E])*)(\*.)?((([#,]*[0,]*0+)(\.0*[0-9]*#*)?)|([#,]*@+#*))(E\+?0+)?(('[^']+'|''|[^*#@0,.E])*)$/ );

});
