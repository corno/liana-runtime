import * as p_ from 'pareto-core/transformer'

//schemas
import type * as s_in from "../schema.js"
import type * as s_out from "astn-runtime/modules/deserialization/schemas/location/schema"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Range
    >
}

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'liana': return p_.option($, ($) => $.range)
            case 'astn value unmarshalling': return p_.option($, ($) => $.range)
            default: return p_.exhaustive($[0])
        }
    })