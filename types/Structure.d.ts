export interface Attributes {
    [index: string]: string | number | boolean | object;
}
export interface Relationships {
    [index: string]: {
        data: ResourceObject | ResourceObject[];
        links?: Links;
        meta?: Meta;
    };
}
export interface LinkObject {
    href: string;
    meta: Meta;
}
export interface Links {
    [index: string]: string | LinkObject;
}
export interface Meta {
    [index: string]: any;
}
export declare type ResourceObject = {
    type: string;
    id?: string;
    attributes?: Attributes;
    relationships?: Relationships;
    links?: Links;
};
export declare type ResourceObjects = ResourceObject[];
export declare type ResourceObjectOrObjects = ResourceObject | ResourceObjects;
export interface Error {
    id?: string;
    links?: Links;
    status?: string;
    code?: string;
    title?: string;
    detail?: string;
    source?: {
        pointer?: string;
        parameter?: string;
    };
    meta?: Meta;
}
export interface ResponseWithData<D extends ResourceObjectOrObjects = ResourceObjectOrObjects> {
    data: D;
    included?: ResourceObject[];
    links?: Links;
    errors?: [Error];
    meta?: Meta;
}
export interface ResponseWithErrors<D extends ResourceObjectOrObjects = ResourceObjectOrObjects> {
    data?: D;
    included?: ResourceObject[];
    links?: Links;
    errors: [Error];
    meta?: Meta;
}
export interface ResponseWithMetaData<D extends ResourceObjectOrObjects = ResourceObjectOrObjects> {
    data?: D;
    included?: ResourceObject[];
    links?: Links;
    errors?: [Error];
    meta: Meta;
}
export interface Response<D extends ResourceObjectOrObjects = ResourceObjectOrObjects> {
    data?: D;
    included?: ResourceObject[];
    links?: Links;
    errors?: [Error];
    meta?: Meta;
}
export interface Request extends Response {
}
