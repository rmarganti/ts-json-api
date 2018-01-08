"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const ApiError_1 = require("./ApiError");
const Entity_1 = require("./Entity");
const utils_1 = require("./utils");
class JsonApiResponse {
    constructor(response) {
        this._data = response.data;
        this._errors = response.errors;
        this._links = response.links;
        this._included = response.included;
        this._meta = response.meta;
        Object.freeze(this);
    }
    /**
     * Retrieve the data from the response
     * as an Entity or array of Entities
     */
    data() {
        return utils_1.convertToEntityOrEntities(this._data);
    }
    /**
     * Retrieve all errors as an array of ApiErrors
     */
    errors() {
        return this._errors.map(error => new ApiError_1.default(error));
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
        return utils_1.convertToEntityOrEntities(this._included);
    }
    /**
     * Expand a partial Entity to the version in the includes. This is
     * useful for retrieving the full data from a relationships.
     *
     * @param entity An partial Entity with only `id` and `type` fields
     */
    expandInclude(entity) {
        if (!this._included) {
            return undefined;
        }
        const foundInclude = this._included.find(include => include.id === entity.id() && include.type === entity.type());
        if (!foundInclude) {
            return undefined;
        }
        return new Entity_1.default(foundInclude);
    }
    meta(name) {
        if (!this._meta || !name) {
            return this._meta;
        }
        return ramda_1.prop(name, this._meta);
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
exports.default = JsonApiResponse;
