/**
 * Attributes describing a Resource Object
 */
export interface Attributes {
    [index: string]: string | number | boolean | object;
}
/**
 * Describes a single Relationship type between a
 * Resource Object and one or more other Resource Objects.
 */
export interface Relationship<D extends ResourceObjectOrObjects = ResourceObjectOrObjects> {
    data: D extends ResourceObject ? Pick<D, 'type' | 'id'> : D;
    links?: Links;
    meta?: Meta;
}
/**
 * A Resource object's Relationships.
 */
export interface Relationships {
    [index: string]: Relationship;
}
/**
 * A Link.
 */
export interface LinkObject {
    href: string;
    meta: Meta;
}
/**
 * An index of Links.
 */
export interface Links {
    [index: string]: string | LinkObject;
}
/**
 * An index of Meta data.
 */
export interface Meta {
    [index: string]: any;
}
/**
 * A representation of a single resource.
 */
export declare type ResourceObject = {
    type: string;
    id: string;
    attributes?: Attributes;
    relationships?: Relationships;
    links?: Links;
};
/**
 * An array of Resource Objects.
 */
export declare type ResourceObjects = ResourceObject[];
/**
 * Either or a single Resource Object or an array of Resource Objects.
 */
export declare type ResourceObjectOrObjects = ResourceObject | ResourceObjects;
/**
 * A representation of a new Resource Object that
 * originates at the client and is yet to be created
 * on the server. The main difference between a regular
 * Resource Object is that this may not have an `id` yet.
 */
export declare type NewResourceObject = {
    type: string;
    id?: string;
    attributes?: Attributes;
    relationships?: Relationships;
    links?: Links;
};
/**
 * An Error.
 */
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
/**
 * A Response for sure containing data.
 */
export interface ResponseWithData<D extends ResourceObjectOrObjects = ResourceObjectOrObjects> {
    data: D;
    included?: ResourceObject[];
    links?: Links;
    errors?: [Error];
    meta?: Meta;
}
/**
 * A Response for sure containing Errors.
 */
export interface ResponseWithErrors<D extends ResourceObjectOrObjects = ResourceObjectOrObjects> {
    data?: D;
    included?: ResourceObject[];
    links?: Links;
    errors: [Error];
    meta?: Meta;
}
/**
 * A Response for sure containing top-level Meta data.
 */
export interface ResponseWithMetaData<D extends ResourceObjectOrObjects = ResourceObjectOrObjects> {
    data?: D;
    included?: ResourceObject[];
    links?: Links;
    errors?: [Error];
    meta: Meta;
}
/**
 * A Response from a JSON API-compliant server.
 */
export interface Response<D extends ResourceObjectOrObjects = ResourceObjectOrObjects> {
    data?: D;
    included?: ResourceObject[];
    links?: Links;
    errors?: [Error];
    meta?: Meta;
}
/**
 * A Request to be sent to a JSON API-compliant server.
 */
export interface Request extends Response {
}
