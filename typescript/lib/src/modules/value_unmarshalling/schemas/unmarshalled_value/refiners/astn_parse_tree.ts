import * as p_ from 'pareto-core/refiner'
import p_change_context from 'pareto-core/refiner/specials/change_context'

import type * as s_in from "astn-runtime/modules/deserialization/schemas/parse_tree/schema"
import type * as s_out from "../schema.js"
import type * as s_function from "../../unmarshalling/schema.js"


namespace declarations {
    export type Number = p_.Refiner_With_Parameter<
        s_out.Number,
        s_function.Error,
        s_in.Value,
        s_function.Number_Parameters
    >

    export type Boolean = p_.Refiner_With_Parameter<
        s_out.Boolean,
        s_function.Error,
        s_in.Value,
        s_function.Boolean_Parameters
    >


    export type Dictionary = p_.Refiner<
        s_out.Dictionary,
        s_function.Error,
        s_in.Value
    >

    export type List = p_.Refiner<
        s_out.List,
        s_function.Error,
        s_in.Value
    >

    export type Nothing = p_.Refiner<
        s_out.Nothing,
        s_function.Error,
        s_in.Value
    >

    export type Optional = p_.Refiner<
        s_out.Optional,
        s_function.Error,
        s_in.Value
    >

    export type Property = p_.Refiner_With_Parameter<
        s_out.Property,
        s_function.Error,
        s_out.Verbose_Group,
        s_function.Property_Parameters
    >

    export type State = p_.Refiner<
        s_out.State,
        s_function.Error,
        s_in.Value
    >

    export type Text = p_.Refiner<
        s_out.Text,
        s_function.Error,
        s_in.Value
    >

    export type Verbose_Group = p_.Refiner_With_Parameter<
        s_out.Verbose_Group,
        s_function.Error,
        s_in.Value,
        s_function.Verbose_Group_Parameters
    >

}


//dependencies
import * as t_from_loc from "../../primitives/deserializers.js"
import * as r_unmarshalled_value_from_parse_tree from "astn-runtime/modules/unmarshalling/schemas/unmarshalled_value/refiners/parse_tree"
import * as t_parse_tree_to_start_token_range from "astn-runtime/modules/deserialization/schemas/parse_tree/transformers/start_token_range"

export const Number: declarations.Number = ($, abort, $p) => {
    const value = $

    const as_text = r_unmarshalled_value_from_parse_tree.Text(
        $,
        ($) => abort(['astn value unmarshalling', $])
    ).token.value

    return p_.from.state($p.type).decide(
        ($) => {
            switch ($[0]) {
                case 'binary': return p_.option($, ($) => t_from_loc.binary(
                    as_text,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?(0|1)+"
                        }],
                        'range': t_parse_tree_to_start_token_range.Value(value)
                    }]),
                ))
                case 'decimal': return p_.option($, ($) => t_from_loc.decimal(
                    as_text,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?(0|[1-9][0-9]*)"
                        }],
                        'range': t_parse_tree_to_start_token_range.Value(value)
                    }]),
                ))
                case 'fractional decimal': return p_.option($, ($) => t_from_loc.fractional_decimal(
                    as_text,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?(0|[1-9][0-9]*)(\\.[0-9]+)?"
                        }],
                        'range': t_parse_tree_to_start_token_range.Value(value)
                    }]),
                    {
                        'number of fractional digits': $.digits
                    }
                ))
                case 'hexadecimal': return p_.option($, ($) => t_from_loc.hexadecimal(
                    as_text,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?0x(0|[1-9a-fA-F][0-9a-fA-F]*)"
                        }],
                        'range': t_parse_tree_to_start_token_range.Value(value)
                    }]),
                ))
                case 'iso date': return p_.option($, ($) => t_from_loc.iso_date_udhr(
                    as_text,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "YYYY-MM-DD"
                        }],
                        range: t_parse_tree_to_start_token_range.Value(value)
                    }]),
                ))
                case 'octal': return p_.option($, ($) => t_from_loc.octal(
                    as_text,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?0o(0|[1-7][0-7]*)"
                        }],
                        range: t_parse_tree_to_start_token_range.Value(value)
                    }]),
                ))
                case 'scientific notation': return p_.option($, ($) => t_from_loc.scientific_notation(
                    as_text,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?(0|[1-9][0-9]*)(\\.[0-9]+)?([eE][+-]?[0-9]+)?"
                        }],
                        range: t_parse_tree_to_start_token_range.Value(value)
                    }]),
                    {
                        'precision': $.precision
                    }
                ))
                default: return p_.exhaustive($[0])
            }
        })

}

export const Boolean: declarations.Boolean = ($, abort, $p) => {
    const value = $

    const as_text = r_unmarshalled_value_from_parse_tree.Text(
        $,
        ($) => abort(['astn value unmarshalling', $])
    ).token.value

    return p_.from.state($p.type).decide(
        ($) => {
            switch ($[0]) {
                case 'true/false': return p_.option($, ($) => t_from_loc.true_false(
                    as_text,
                    ($) => abort(['liana', {
                        'type': ['not a valid boolean', {
                            'expected format': "true|false"
                        }],
                        'range': t_parse_tree_to_start_token_range.Value(value)
                    }]),
                ))
                default: return p_.exhaustive($[0])
            }
        })

}

export const Dictionary: declarations.Dictionary = ($, abort) => {
    return p_change_context(
        r_unmarshalled_value_from_parse_tree.Dictionary($, ($) => abort(['astn value unmarshalling', $])),
        ($) => {
            const value = $.value
            return {
                'value': $.value,
                'entries': p_.from.dictionary($.entries).map(
                    ($, id) => p_.from.optional($.assignment).decide(
                        ($) => p_.from.optional($.value).decide(
                            ($) => $,
                            () => abort(['liana', {
                                'range': t_parse_tree_to_start_token_range.Value(value),
                                'type': ['dictionary', ['entry not set', id]]
                            }])
                        ),
                        () => abort(['liana', {
                            'range': t_parse_tree_to_start_token_range.Value(value),
                            'type': ['dictionary', ['entry not set', id]]
                        }])
                    ))
            }
        }
    )
}

export const List: declarations.List = ($, abort) => r_unmarshalled_value_from_parse_tree.List($, ($) => abort(['astn value unmarshalling', $]))

export const Nothing: declarations.Nothing = ($, abort) => r_unmarshalled_value_from_parse_tree.Nothing($, ($) => abort(['astn value unmarshalling', $])).null

export const Optional: declarations.Optional = ($, abort) => r_unmarshalled_value_from_parse_tree.Optional($, ($) => abort(['astn value unmarshalling', $]))

export const Property: declarations.Property = ($, abort, $p) => p_.from.dictionary($.properties).get_entry(
    $p.id,
    {
        no_such_entry: () => abort(['liana', {
            'range': t_parse_tree_to_start_token_range.Value($.value),
            'type': ['type', ['missing property', $p.id]]
        }])
    }
)

export const State: declarations.State = ($, abort) => r_unmarshalled_value_from_parse_tree.State($, ($) => abort(['astn value unmarshalling', $]))

export const Text: declarations.Text = ($, abort) => r_unmarshalled_value_from_parse_tree.Text($, ($) => abort(['astn value unmarshalling', $])).token.value

export const Verbose_Group: declarations.Verbose_Group = ($, abort, $p) => p_change_context(
    r_unmarshalled_value_from_parse_tree.Verbose_Group($, ($) => abort(['astn value unmarshalling', $]), $p),
    ($) => {
        const value = $.value
        return {
            'value': $.value,
            'properties': p_.from.dictionary($.properties).map(
                ($, id) => p_.from.optional($.assignment).decide(
                    ($) => p_.from.optional($.value).decide(
                        ($) => $,
                        () => abort(['liana', {
                            'range': t_parse_tree_to_start_token_range.Value(value),
                            'type': ['dictionary', ['entry not set', id]]
                        }])
                    ),
                    () => abort(['liana', {
                        'range': t_parse_tree_to_start_token_range.Value(value),
                        'type': ['dictionary', ['entry not set', id]]
                    }])
                )
            )
        }
    }
)