## E_INVALID_PAR_VALUE

Thrown for certain parameters when the type is correct, but the value is
invalid. Currently, the only parameter with such validation is the date format
(for either format and parse). Format allows [certain
variants](https://github.com/jquery/globalize/blob/master/doc/api/date/date-formatter.md#parameters),
if it's none of them, error is thrown.

Error object:

| Attribute | Value |
| --- | --- |
| code | `E_INVALID_PAR_VALUE` |
| name | Name of the invalid parameter |
| value | Invalid value |
