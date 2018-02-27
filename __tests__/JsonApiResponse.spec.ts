import 'jest';
import { lensPath, map, set } from 'ramda';

import ResourceObject from '../src/ResourceObject';
import JsonApiResponse from '../src/JsonApiResponse';
const mockResponse = require('./mocks/JsonApiResponse.json');

describe('JsonApiResponse', () => {
    let jsonApiResponse: JsonApiResponse;

    beforeEach(() => {
        jsonApiResponse = JsonApiResponse.of(mockResponse);
    });

    it('builds a new JsonApiResponse', () => {
        expect(jsonApiResponse.hasError()).toBeFalsy;
        expect(jsonApiResponse.errors()).toEqual([]);
        expect(jsonApiResponse.data()).toBeInstanceOf(ResourceObject);

        expect(Array.isArray(jsonApiResponse.included())).toBeTruthy;
        expect(jsonApiResponse.included()[0]).toBeInstanceOf(ResourceObject);
    });

    it('expands a relationship to the full include', () => {
        const author = (<ResourceObject>jsonApiResponse.data()).relationship(
            'author'
        );
        const expandedAuthor = jsonApiResponse.expandInclude(author);

        expect(expandedAuthor.attribute('first-name')).toEqual('Dan');
    });

    it('can be mapped over', () => {
        const changeTypeToBooks = set(lensPath(['data', 'type']), 'books');

        const result: JsonApiResponse = map(changeTypeToBooks, jsonApiResponse);
        expect((<ResourceObject>result.data()).type()).toEqual('books');
    });
});
