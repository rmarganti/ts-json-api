import { iError } from "./JsonApiStructure";

class ApiError {
    private error: iError;

    constructor(error: iError) {
        this.error = error;
        Object.freeze(this);
    }

    static of(error: iError): ApiError {
        return new ApiError(error);
    }

    map(f: (x: iError) => iError) {
        return ApiError.of(f(this.error));
    }
}

export default ApiError;
