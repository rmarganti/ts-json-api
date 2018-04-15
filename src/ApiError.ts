import { clone } from 'ramda';
import * as JsonApi from './structure';

class ApiError {
    private error: JsonApi.Error;

    constructor(error: JsonApi.Error) {
        this.error = error;
        Object.freeze(this);
    }

    static of(error: JsonApi.Error): ApiError {
        return new ApiError(error);
    }

    map(f: (x: JsonApi.Error) => JsonApi.Error) {
        return ApiError.of(f(this.error));
    }

    toJSON() {
        return clone(this.error);
    }
}

export default ApiError;
