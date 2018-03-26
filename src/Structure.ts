export interface iAttributes {
    [index: string]: string | number | boolean | object;
}

export interface iRelationships {
    [index: string]: {
        data: iResourceObject | iResourceObject[];
        links?: iLinks;
        meta?: iMeta;
    };
}

export interface iLinkObject {
    href: string;
    meta: iMeta;
}

export interface iLinks {
    [index: string]: string | iLinkObject;
}

export interface iMeta {
    [index: string]: any;
}

export interface iResourceObject<T = string, A = iAttributes> {
    type: T;
    id?: string;
    attributes?: A;
    relationships?: iRelationships;
    links?: iLinks;
}

export interface iError {
    id?: string;
    links?: iLinks;
    status?: string;
    code?: string;
    title?: string;
    detail?: string;
    source?: {
        pointer?: string;
        parameter?: string;
    };
    meta?: iMeta;
}

export interface iResponseWithData {
    data: iResourceObject | iResourceObject[];
    included?: iResourceObject[];
    links?: iLinks;
    errors?: [iError];
    meta?: iMeta;
}

export interface iResponseWithErrors {
    data?: iResourceObject | iResourceObject[];
    included?: iResourceObject[];
    links?: iLinks;
    errors: [iError];
    meta?: iMeta;
}

export interface iResponseWithMetaData {
    data?: iResourceObject | iResourceObject[];
    included?: iResourceObject[];
    links?: iLinks;
    errors?: [iError];
    meta: iMeta;
}

export interface iResponse<D = iResourceObject | iResourceObject[]> {
    data?: D;
    included?: iResourceObject[];
    links?: iLinks;
    errors?: [iError];
    meta?: iMeta;
}
