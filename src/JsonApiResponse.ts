import { clone, path, pipe, prop, propOr } from 'ramda';

import * as JsonApi from './structure';
import ApiError from './ApiError';
import ResourceObject from './ResourceObject';
import { convertToResourceObjectOrResourceObjects } from './utils';

class JsonApiResponse<D extends JsonApi.Response = JsonApi.Response> {
    private response: D;

    constructor(response: D) {
        this.response = response;
        Object.freeze(this);
    }

    static of<S extends JsonApi.Response>(response: S): JsonApiResponse<S> {
        return new JsonApiResponse(response);
    }

    map(f: (x: D) => D): JsonApiResponse<D> {
        return JsonApiResponse.of(f(this.response));
    }

    /**
     * Retrieve the data from the response
     * as an ResourceObject or array of ResourceObjects
     */
    data() {
        return convertToResourceObjectOrResourceObjects(this.response.data);
    }

    /**
     * Retrieve all errors as an array of ApiErrors
     */
    errors(): ApiError[] {
        const errors: JsonApi.Error[] = this.response.errors || [];
        return errors.map(ApiError.of);
    }

    /**
     * Does the JsonApi response have an error?
     */
    hasError(): boolean {
        return this.errors().length > 0;
    }

    /**
     * Retrieves all includes an array of ResourceObjects
     */
    included(): ResourceObject[] {
        return convertToResourceObjectOrResourceObjects(
            this.response.included || []
        );
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
        const metaFinder: (response: JsonApi.ResponseWithMetaData) => any = name
            ? path(['meta', name])
            : prop('meta');

        return metaFinder(this.response as JsonApi.ResponseWithMetaData);
    }

    /**
     * Map to the original JSON object
     */
    toJSON(): D {
        return clone(this.response);
    }
}

export default JsonApiResponse;
