## E_INVALID_CLDR

Thrown when a CLDR item has an invalid or unexpected value.

Error object:

| Attribute | Value |
| --- | --- |
| code | `E_INVALID_CLDR` |
| description | Reason why the data was considered invalid |

- description "Missing rules to deduce plural form of \`{value}\`"
 
 Thrown when the plural form (also known as plural group) is not found for the given value. This error is very unlikely to occur and is related to incomplete or invalid CLDR `supplemental/plurals-type-cardinal/{language}` data.
