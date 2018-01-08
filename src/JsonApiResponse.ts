import { prop } from 'ramda';

import {
    iError,
    iJsonApiResponse,
    iJsonApiResponseWithData,
    iJsonApiResponseWithError,
    iJsonApiResponseWithMetaData,
    iLinks,
    iMeta,
    iResourceObject,
} from "./JsonAPIStructure";
import ApiError from './ApiError';
import Entity from './Entity';
import { convertToEntityOrEntities } from './utils';

class JsonApiResponse {
    private _data: iResourceObject | iResourceObject[];

    private _errors: iError[];

    private _included?: iResourceObject[];

    private _links?: iLinks;

    private _meta?: iMeta;

    constructor(response: iJsonApiResponse) {
        this._data = (<iJsonApiResponseWithData>response).data;
        this._errors = (<iJsonApiResponseWithError>response).errors;
        this._links = (<iJsonApiResponseWithData>response).links;
        this._included = (<iJsonApiResponseWithData>response).included;
        this._meta = (<iJsonApiResponseWithMetaData>response).meta;

        Object.freeze(this);
    }

    /**
     * Retrieve the data from the response
     * as an Entity or array of Entities
     */
    data() {
        return convertToEntityOrEntities(this._data);
    }

    /**
     * Retrieve all errors as an array of ApiErrors
     */
    errors() {
        return this._errors.map(
            error => new ApiError(error)
        );
    }

    /**
     * Does the JsonAPI response have an error?
     */
    hasError() {
        return this._errors.length > 0;
    }

    /**
     * Retrieves all includes an array of Entities
     */
    included() {
        return convertToEntityOrEntities(this._included);
    }

    /**
     * Expand a partial Entity to the version in the includes. This is
     * useful for retrieving the full data from a relationships.
     *
     * @param entity An partial Entity with only `id` and `type` fields
     */
    expandInclude(entity: Entity) {
        if (!this._included) {
            return undefined;
        }

        const foundInclude = this._included.find(
            include => include.id === entity.id() && include.type === entity.type()
        );

        if (!foundInclude) { return undefined; }

        return new Entity(foundInclude);
    }

    meta(name: string) {
        if (!this._meta || !name) {
            return this._meta;
        }

        return prop(name, this._meta);
    }

    /**
     * Map to the original JSON object
     */
    toJSON() {
        return {
            data: this._data,
            errors: this._errors,
            included: this._included,
            links: this._links,
            meta: this._meta,
        };
    }
}

export default JsonApiResponse;
