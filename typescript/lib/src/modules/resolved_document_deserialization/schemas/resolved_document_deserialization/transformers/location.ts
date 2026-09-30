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
import * as t_deserialize_to_location from "../../../../unresolved_document_deserialization/schemas/unresolved_document_deserialization/transformers/location.js"


export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'unresolved document deserialization': return p_.option($, ($) => t_deserialize_to_location.Error($))
            case 'resolving': return p_.option($, ($): s_out.Possible_Range => ['range', $.location])
            default: return p_.exhaustive($[0])
        }
    })