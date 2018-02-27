"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError {
    constructor(error) {
        this.error = error;
        Object.freeze(this);
    }
    static of(error) {
        return new ApiError(error);
    }
    map(f) {
        return ApiError.of(f(this.error));
    }
}
exports.default = ApiError;
