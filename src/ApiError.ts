import { iError } from "./JsonApiStructure";

class ApiError {
    private error: iError;

    constructor(error: iError) {
        this.error = error;
    }
}

export default ApiError;
