import * as JsonApi from './Structure';
declare class ApiError {
    private error;
    constructor(error: JsonApi.iError);
    static of(error: JsonApi.iError): ApiError;
    map(f: (x: JsonApi.iError) => JsonApi.iError): ApiError;
}
export default ApiError;
