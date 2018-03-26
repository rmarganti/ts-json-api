import { clone, path, pipe, prop, propOr } from 'ramda';

import * as JsonApi from './Structure';
import ApiError from './ApiError';
import ResourceObject from './ResourceObject';
import { convertToResourceObjectOrResourceObjects } from './utils';

class JsonApiResponse {
    private response: JsonApi.iResponse;

    constructor(response: JsonApi.iResponse) {
        this.response = response;
        Object.freeze(this);
    }

    static of(response: JsonApi.iResponse): JsonApiResponse {
        return new JsonApiResponse(response);
    }

    map(f: (x: JsonApi.iResponse) => JsonApi.iResponse): JsonApiResponse {
        return JsonApiResponse.of(f(this.response));
    }

    /**
     * Retrieve the data from the response
     * as an ResourceObject or array of ResourceObjects
     */
    data(): ResourceObject | ResourceObject[] {
        return pipe(
            propOr(undefined, 'data'),
            convertToResourceObjectOrResourceObjects
        )(this.response);
    }

    /**
     * Retrieve all errors as an array of ApiErrors
     */
    errors(): ApiError[] {
        const errors: JsonApi.iError[] = propOr([], 'errors', this.response);
        return errors.map(ApiError.of);
    }

    /**
     * Does the JsonApi response have an error?
     */
    hasError() {
        return this.errors().length > 0;
    }

    /**
     * Retrieves all includes an array of ResourceObjects
     */
    included() {
        return pipe(
            propOr([], 'included'),
            convertToResourceObjectOrResourceObjects
        )(this.response);
    }

    /**
     * Expand a partial ResourceObject to the version in the includes. This is
     * useful for retrieving the full data from a relationships.
     *
     * @param entity An partial ResourceObject with only `id` and `type` fields
     */
    expandInclude(entity: ResourceObject) {
        if (this.included().length === 0) {
            return undefined;
        }

        return this.included().find((include: ResourceObject) => {
            return (
                include.id() === entity.id() && include.type() === entity.type()
            );
        });
    }

    meta(name: string) {
        const metaFinder: (
            response: JsonApi.iResponseWithMetaData
        ) => any = name ? path(['meta', name]) : prop('meta');

        return metaFinder(this.response as JsonApi.iResponseWithMetaData);
    }

    /**
     * Map to the original JSON object
     */
    toJSON() {
        return clone(this.response);
    }
}

export default JsonApiResponse;
