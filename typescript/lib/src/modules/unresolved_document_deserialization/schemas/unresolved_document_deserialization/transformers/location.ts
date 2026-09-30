import * as p_ from 'pareto-core/transformer'

//schemas
import type * as s_in from "../schema.js"
import type * as s_out from "astn-runtime/modules/deserialization/schemas/location/schema"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Possible_Range
    >
}

//dependencies
import * as ser_parse_tree_deserialization from "astn-runtime/modules/deserialization/schemas/parse_tree_deserialization/transformers/location"
import * as t_unmarshalling_to_location from "../../../../value_unmarshalling/schemas/unmarshalling/transformers/location.js"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'parse tree deserialization': return p_.option($, ($) => ser_parse_tree_deserialization.Error($))
            case 'unmarshalling': return p_.option($, ($) => ['range', t_unmarshalling_to_location.Error($)])
            default: return p_.exhaustive($[0])
        }
    })