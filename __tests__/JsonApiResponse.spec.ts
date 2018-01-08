import 'jest';

import Entity from '../src/Entity';
import JsonApiResponse from '../src/JsonApiResponse';
const mockResponse = require('./mocks/JsonApiResponse.json');

describe('JsonApiResponse', () => {
    let jsonApiResponse: JsonApiResponse;

    beforeEach(() => {
        jsonApiResponse = new JsonApiResponse(mockResponse);
    });

    it('builds a new JsonApiResponse', () => {
        expect(jsonApiResponse.hasError()).toBeFalsy;
        expect(jsonApiResponse.data()).toBeInstanceOf(Entity);

        expect(Array.isArray(jsonApiResponse.included())).toBeTruthy;
        expect(jsonApiResponse.included()[0]).toBeInstanceOf(Entity);
    });

    it('expands a relationship to the full include', () => {
        const author = jsonApiResponse.data().relationship('author');
        const expandedAuthor = jsonApiResponse.expandInclude(author);

        expect(expandedAuthor.attribute('first-name')).toEqual('Dan');
    });
});
