import { ResourceObject, ResourceObjectOrObjects } from './resourceObjects';
import { Links, Meta } from './shared';

/**
 * A Response for sure containing data.
 */
export type ResponseWithData<
    D extends ResourceObjectOrObjects = ResourceObjectOrObjects
> = {
    data: D;
    included?: ResourceObject[];
    links?: Links;
    errors?: [Error];
    meta?: Meta;
};

/**
 * A Response for sure containing Errors.
 */
export type ResponseWithErrors<
    D extends ResourceObjectOrObjects = ResourceObjectOrObjects
> = {
    data?: D;
    included?: ResourceObject[];
    links?: Links;
    errors: [Error];
    meta?: Meta;
};

/**
 * A Response for sure containing top-level Meta data.
 */
export type ResponseWithMetaData<
    D extends ResourceObjectOrObjects = ResourceObjectOrObjects
> = {
    data?: D;
    included?: ResourceObject[];
    links?: Links;
    errors?: [Error];
    meta: Meta;
};

/**
 * A Response from a JSON API-compliant server.
 */
export type Response<
    D extends ResourceObjectOrObjects = ResourceObjectOrObjects
> = ResponseWithData<D> | ResponseWithErrors<D> | ResponseWithMetaData<D>;

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
