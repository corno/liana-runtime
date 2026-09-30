import type * as p_ from 'pareto-core/schema'

import type * as s_astn_value_unmarshalling from "astn-runtime/modules/unmarshalling/schemas/value_unmarshalling/schema"
import type * as s_location from "astn-runtime/modules/deserialization/schemas/location/schema"

export type Error =
    | readonly ['astn value unmarshalling', s_astn_value_unmarshalling.Error]
    | readonly ['liana', {
        'type':
        | readonly ['not a valid number', {
            'expected format': string
        }]
        | readonly ['not a valid boolean', {
            'expected format': string
        }]
        | readonly ['unknown option', string]
        | ['state', State_Error]
        | ['dictionary', Dictionary_Error]
        | ['type', Type_Error]

        'range': s_location.Range
    }]

export type State_Error =
    | ['unknown option', string]

export type Dictionary_Error =
    | ['entry not set', string]


export type Type_Error =
    | ['property not set', string]
    | ['missing property', string]

export type Number_Parameters = {
    'type':
    | ['binary', null]
    | ['decimal', null]
    | ['fractional decimal', {
        'digits': number
    }]
    | ['hexadecimal', null]
    | ['iso date', null]
    | ['octal', null]
    | ['scientific notation', {
        'precision': number
    }]
}

export type Boolean_Parameters = {
    'type':
    | ['true/false', null]
}

export type Property_Parameters = {
    'id': string
}

export type Verbose_Group_Parameters = {
    'expected properties': p_.Dictionary<null>
}