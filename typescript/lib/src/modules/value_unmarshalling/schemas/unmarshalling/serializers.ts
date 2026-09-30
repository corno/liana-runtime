import * as p_ from 'pareto-core/serializer'

//schemas
import type * as s_in from "./schema.js"

namespace declarations {
    export type Error = p_.Serializer<
        s_in.Error
    >
}

//dependencies
import * as ser_value_unmarshalling from "astn-runtime/modules/unmarshalling/schemas/value_unmarshalling/serializers"

export const Error: declarations.Error = ($) => p_.ph.composed([
    p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'liana': return p_.option($, ($) => p_.ph.composed([
                    p_.from.state($.type).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'not a valid number': return p_.option($, ($) => p_.ph.composed([
                                    p_.ph.literal("not a valid number, expected: '"),
                                    p_.ph.literal($['expected format']),
                                    p_.ph.literal("'")
                                ]))
                                case 'not a valid boolean': return p_.option($, ($) => p_.ph.composed([
                                    p_.ph.literal("not a valid boolean, expected: '"),
                                    p_.ph.literal($['expected format']),
                                    p_.ph.literal("'")
                                ]))
                                case 'unknown option': return p_.option($, ($) => p_.ph.composed([
                                    p_.ph.literal("unknown option: '"),
                                    p_.ph.literal($),
                                    p_.ph.literal("'")
                                ]))
                                case 'state': return p_.option($, ($) => p_.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'unknown option': return p_.option($, ($) => p_.ph.composed([
                                                p_.ph.literal("unknown option: '"),
                                                p_.ph.literal($),
                                                p_.ph.literal("'")
                                            ]))

                                            default: return p_.exhaustive($[0])
                                        }
                                    }))
                                case 'dictionary': return p_.option($, ($) => p_.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'entry not set': return p_.option($, ($) => p_.ph.composed([
                                                p_.ph.literal("entry not set: '"),
                                                p_.ph.literal($),
                                                p_.ph.literal("'")
                                            ]))

                                            default: return p_.exhaustive($[0])
                                        }
                                    }))
                                case 'type': return p_.option($, ($) => p_.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'property not set': return p_.option($, ($) => p_.ph.composed([
                                                p_.ph.literal("property not set: '"),
                                                p_.ph.literal($),
                                                p_.ph.literal("'")
                                            ]))
                                            case 'missing property': return p_.option($, ($) => p_.ph.composed([
                                                p_.ph.literal("missing property: '"),
                                                p_.ph.literal($),
                                                p_.ph.literal("'")
                                            ]))
                                            default: return p_.exhaustive($[0])
                                        }
                                    }))
                                default: return p_.exhaustive($[0])
                            }
                        }),
                ]))
                case 'astn value unmarshalling': return p_.option($, ($) => ser_value_unmarshalling.Error($))
                default: return p_.exhaustive($[0])
            }
        }),

])