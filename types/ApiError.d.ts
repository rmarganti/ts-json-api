import * as JsonApi from './structure';
declare class ApiError {
    private error;
    constructor(error: JsonApi.Error);
    static of(error: JsonApi.Error): ApiError;
    map(f: (x: JsonApi.Error) => JsonApi.Error): ApiError;
    toJSON(): JsonApi.Error;
}
export default ApiError;
