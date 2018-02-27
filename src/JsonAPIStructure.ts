export interface iAttributes {
    [index: string]: string | number | boolean,
}

export interface iRelationships {
    [index: string]: {
        data: iResourceObject | iResourceObject[],
        links?: iLinks,
        meta?: iMeta,
    },
}

export interface iLinkObject {
    href: string,
    meta: iMeta,
}

export interface iLinks {
    [index: string]: string | iLinkObject,
}

export interface iMeta {
    [index: string]: any,
}

export interface iResourceObject {
    type: string,
    id?: string,
    attributes?: iAttributes,
    relationships?: iRelationships,
    links?: iLinks,
}

export interface iError {
    id?: string,
    links?: iLinks,
    status?: string,
    code?: string,
    title?: string,
    detail?: string,
    source?: {
        pointer?: string,
        parameter?: string
    }
    meta?: iMeta,
}

export interface iJsonApiResponseWithData {
    data: iResourceObject | iResourceObject[],
    included?: iResourceObject[],
    links?: iLinks,
    errors?: [iError]
    meta?: iMeta,
}

export interface iJsonApiResponseWithError {
    errors: [iError]
    meta?: iMeta,
}

export interface iJsonApiResponseWithMetaData {
    meta: iMeta,
}

export type iJsonApiResponse =
    iJsonApiResponseWithData |
    iJsonApiResponseWithError |
    iJsonApiResponseWithMetaData;
