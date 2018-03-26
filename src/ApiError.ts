import * as JsonApi from './Structure';

class ApiError {
    private error: JsonApi.iError;

    constructor(error: JsonApi.iError) {
        this.error = error;
        Object.freeze(this);
    }

    static of(error: JsonApi.iError): ApiError {
        return new ApiError(error);
    }

    map(f: (x: JsonApi.iError) => JsonApi.iError) {
        return ApiError.of(f(this.error));
    }
}

export default ApiError;
