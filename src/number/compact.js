define([
  "./numbering-system"
], function( numberNumberingSystem ) {

/**
 * Compact( name, cldr )
 *
 * @compactType [String] Compact mode, `short` or `long`.
 *
 * @cldr [Cldr instance].
 *
 * Return the localized compact map for the given compact mode.
 */
return function( compactType, cldr ) {
  return cldr.main([
    "numbers/decimalFormats-numberSystem-" + numberNumberingSystem( cldr ),
    compactType,
    "decimalFormat"
  ]);
};

});
