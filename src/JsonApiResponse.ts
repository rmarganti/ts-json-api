import { clone, lensProp, map, path, pipe, prop, propOr } from 'ramda';

import { iError, iJsonApiResponse, iResourceObject } from './JsonAPIStructure';
import ApiError from './ApiError';
import ResourceObject from './ResourceObject';
import { convertToResourceObjectOrResourceObjects } from './utils';

class JsonApiResponse {
    private response: iJsonApiResponse;

    constructor(response: iJsonApiResponse) {
        this.response = response;
        Object.freeze(this);
    }

    static of(response: iJsonApiResponse): JsonApiResponse {
        return new JsonApiResponse(response);
    }

    map(f: (x: iJsonApiResponse) => iJsonApiResponse): JsonApiResponse {
        return JsonApiResponse.of(f(this.response));
    }

    /**
     * Retrieve the data from the response
     * as an ResourceObject or array of ResourceObjects
     */
    data(): ResourceObject | ResourceObject[] {
        return pipe(prop('data'), convertToResourceObjectOrResourceObjects)(
            this.response
        );
    }

    /**
     * Retrieve all errors as an array of ApiErrors
     */
    errors(): ApiError[] {
        return pipe(propOr([], 'errors'), map(ApiError.of))(this.response);
    }

    /**
     * Does the JsonAPI response have an error?
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
        const metaFinder = name ? path(['meta', name]) : prop('meta');

        return metaFinder(this.response);
    }

    /**
     * Map to the original JSON object
     */
    toJSON() {
        clone(this.response);
    }
}

export default JsonApiResponse;
