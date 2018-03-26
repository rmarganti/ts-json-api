import * as JsonApi from './Structure';
import ApiError from './ApiError';
import ResourceObject from './ResourceObject';
declare class JsonApiResponse {
    private response;
    constructor(response: JsonApi.iResponse);
    static of(response: JsonApi.iResponse): JsonApiResponse;
    map(f: (x: JsonApi.iResponse) => JsonApi.iResponse): JsonApiResponse;
    /**
     * Retrieve the data from the response
     * as an ResourceObject or array of ResourceObjects
     */
    data(): ResourceObject | ResourceObject[];
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
    included(): any;
    /**
     * Expand a partial ResourceObject to the version in the includes. This is
     * useful for retrieving the full data from a relationships.
     *
     * @param entity An partial ResourceObject with only `id` and `type` fields
     */
    expandInclude(entity: ResourceObject): any;
    meta(name: string): any;
    /**
     * Map to the original JSON object
     */
    toJSON(): JsonApi.iResponse<JsonApi.iResourceObject<string, JsonApi.iAttributes> | JsonApi.iResourceObject<string, JsonApi.iAttributes>[]>;
}
export default JsonApiResponse;
