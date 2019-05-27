import 'jest';
import { lensPath, set } from 'ramda';

import ResourceObject from '../src/ApiResourceObject';
import JsonApiResponse from '../src/ApiResponse';

import { itemResponse } from '../__mocks__/itemResponse';
import { ArticleItemResponse } from '../__mocks__/types';

describe('JsonApiResponse', () => {
    let jsonApiResponse: JsonApiResponse<ArticleItemResponse>;

    beforeEach(() => {
        jsonApiResponse = JsonApiResponse.of(itemResponse);
    });

    it('builds a new JsonApiResponse', () => {
        expect(jsonApiResponse.hasError()).toBeFalsy;
        expect(jsonApiResponse.errors()).toEqual([]);
        expect(jsonApiResponse.data()).toBeInstanceOf(ResourceObject);

        expect(Array.isArray(jsonApiResponse.included())).toBeTruthy;
        expect(jsonApiResponse.included()[0]).toBeInstanceOf(ResourceObject);
    });

    it('expands a relationship to the full include', () => {
        const author = jsonApiResponse.data().relationship('author');
        const expandedAuthor = jsonApiResponse.expandInclude(author);

        expect(expandedAuthor!.attribute('firstName')).toEqual('Dan');
    });

    it('can be mapped over', () => {
        const changeTypeToBooks = set(lensPath(['data', 'type']), 'books');

        const result = jsonApiResponse.map(changeTypeToBooks);
        expect(result.data().type()).toEqual('books');
    });
});
