"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const ApiError_1 = require("./ApiError");
const utils_1 = require("./utils");
class JsonApiResponse {
    constructor(response) {
        this.response = response;
        Object.freeze(this);
    }
    static of(response) {
        return new JsonApiResponse(response);
    }
    map(f) {
        return JsonApiResponse.of(f(this.response));
    }
    /**
     * Retrieve the data from the response
     * as an ResourceObject or array of ResourceObjects
     */
    data() {
        return ramda_1.pipe(ramda_1.prop('data'), utils_1.convertToResourceObjectOrResourceObjects)(this.response);
    }
    /**
     * Retrieve all errors as an array of ApiErrors
     */
    errors() {
        return ramda_1.pipe(ramda_1.propOr([], 'errors'), ramda_1.map(ApiError_1.default.of))(this.response);
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
        return ramda_1.pipe(ramda_1.propOr([], 'included'), utils_1.convertToResourceObjectOrResourceObjects)(this.response);
    }
    /**
     * Expand a partial ResourceObject to the version in the includes. This is
     * useful for retrieving the full data from a relationships.
     *
     * @param entity An partial ResourceObject with only `id` and `type` fields
     */
    expandInclude(entity) {
        if (this.included().length === 0) {
            return undefined;
        }
        return this.included().find((include) => {
            return (include.id() === entity.id() && include.type() === entity.type());
        });
    }
    meta(name) {
        const metaFinder = name ? ramda_1.path(['meta', name]) : ramda_1.prop('meta');
        return metaFinder(this.response);
    }
    /**
     * Map to the original JSON object
     */
    toJSON() {
        ramda_1.clone(this.response);
    }
}
exports.default = JsonApiResponse;
