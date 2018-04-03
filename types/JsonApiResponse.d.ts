import * as JsonApi from './structure';
import ApiError from './ApiError';
import ResourceObject from './ResourceObject';
declare class JsonApiResponse<D extends JsonApi.Response = JsonApi.Response> {
    private response;
    constructor(response: D);
    static of<S extends JsonApi.Response>(response: S): JsonApiResponse<S>;
    map(f: (x: D) => D): JsonApiResponse<D>;
    /**
     * Retrieve the data from the response
     * as an ResourceObject or array of ResourceObjects
     */
    data(): any;
    /**
     * Retrieve all errors as an array of ApiErrors
     */
    errors(): ApiError[];
    /**
     * Does the JsonApi response have an error?
     */
    hasError(): boolean;
    /**
     * Retrieves all includes an array of ResourceObjects
     */
    included(): ResourceObject[];
    /**
     * Expand a partial ResourceObject to the version in the includes. This is
     * useful for retrieving the full data from a relationships.
     *
     * @param entity An partial ResourceObject with only `id` and `type` fields
     */
    expandInclude(entity: ResourceObject): ResourceObject<JsonApi.ResourceObject> | undefined;
    meta(name: string): any;
    /**
     * Map to the original JSON object
     */
    toJSON(): D;
}
export default JsonApiResponse;
