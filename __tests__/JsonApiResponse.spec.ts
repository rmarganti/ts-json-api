import 'jest';
import { lensPath, map, set } from 'ramda';

import ResourceObject from '../src/ResourceObject';
import JsonApiResponse from '../src/JsonApiResponse';
import * as JsonApi from '../src/structure';

import { Article, ArticleItemResponse } from './mocks/types';
const itemResponse: Article = require('./mocks/itemResponse.json');

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

        expect(expandedAuthor.attribute('first-name')).toEqual('Dan');
    });

    it('can be mapped over', () => {
        const changeTypeToBooks = set(lensPath(['data', 'type']), 'books');

        const result = jsonApiResponse.map(changeTypeToBooks);
        expect(result.data().type()).toEqual('books');
    });
});
