export interface Attributes {
    [index: string]: string | number | boolean | object;
}
export interface Relationship<D extends SimplifiedResourceObjectOrObjects = SimplifiedResourceObjectOrObjects> {
    data: D;
    links?: Links;
    meta?: Meta;
}
export interface Relationships {
    [index: string]: Relationship;
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
export declare type SimplifiedResourceObject = Pick<ResourceObject, 'type' | 'id'>;
export declare type SimplifiedResourceObjects = SimplifiedResourceObject[];
export declare type SimplifiedResourceObjectOrObjects = SimplifiedResourceObject | SimplifiedResourceObjects;
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
