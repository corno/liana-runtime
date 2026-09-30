import * as p_ from 'pareto-core/serializer'

//schemas
import type * as s_in from "./schema.js"

namespace declarations {
    export type Error = p_.Serializer<
        s_in.Error
    >
}

//dependencies
import * as ser_parse_tree_deserialization from "astn-runtime/modules/deserialization/schemas/parse_tree_deserialization/serializers"

import * as ser_unmarshalling from "../../../value_unmarshalling/schemas/unmarshalling/serializers.js"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'parse tree deserialization': return p_.option($, ($) => ser_parse_tree_deserialization.Error($))
            case 'unmarshalling': return p_.option($, ($) => ser_unmarshalling.Error($))
            default: return p_.exhaustive($[0])
        }
    })