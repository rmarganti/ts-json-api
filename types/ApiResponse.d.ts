import * as JsonApi from './structure';
import ApiError from './ApiError';
import ApiResourceObject from './ApiResourceObject';
declare class ApiResponse<D extends JsonApi.Response = JsonApi.Response> {
    private response;
    constructor(response: D);
    static of<S extends JsonApi.Response>(response: S): ApiResponse<S>;
    map(f: (x: D) => D): ApiResponse<D>;
    /**
     * Retrieve the data from the response
     * as an ApiResourceObject or array of ApiResourceObjects
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
     * Retrieves all includes an array of ApiResourceObjects
     */
    included(): ApiResourceObject[];
    /**
     * Expand a partial ApiResourceObject to the version in the includes. This is
     * useful for retrieving the full data from a relationships.
     *
     * @param entity An partial ApiResourceObject with only `id` and `type` fields
     */
    expandInclude(entity: ApiResourceObject): ApiResourceObject<JsonApi.NewResourceObject> | undefined;
    meta(name: string): any;
    /**
     * Map to the original JSON object
     */
    toJSON(): D;
}
export default ApiResponse;
