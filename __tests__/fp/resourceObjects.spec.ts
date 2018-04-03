import * as fns from '../../src/fp/resourceObjects';
import * as JsonApi from '../../src/structure';

import { Article, ArticleItemResponse } from '../mocks/types';

const itemResponse: ArticleItemResponse = require('../mocks/itemResponse.json');
const article: Article = itemResponse.data;

describe('resourceObjects functions', () => {
    it('gets all attributes of a resource object', () => {
        const result = fns.attributes(article);

        expect(result).toEqual({
            title: 'JSON API paints my bikeshed!',
        });
    });

    it('gets a single attribute of a resource object', () => {
        const result = fns.attribute('title', article);

        expect(result).toEqual('JSON API paints my bikeshed!');
    });

    it('gets a single attribute of a resource object with a default fallback', () => {
        const result = fns.attributeOr('banana', 'flavor', article);

        expect(result).toEqual('banana');
    });

    it('sets an attribute', () => {
        const result = fns.setAttribute('title', 'New Title', article);

        expect(result.attributes.title).toEqual('New Title');
    });

    it('updates multiple attributes', () => {
        const result = fns.updateAttributes(
            {
                flavor: 'Piña colada',
                subtitle: 'How I Spent My Summer Vacation',
            },
            article
        );

        expect(result.attributes).toEqual({
            flavor: 'Piña colada',
            subtitle: 'How I Spent My Summer Vacation',
            title: 'JSON API paints my bikeshed!', // This is untouched
        });
    });

    it('gets all relationships of a Resource Object', () => {
        const result = fns.relationships(article);

        expect(result).toEqual(article.relationships);
    });

    it('gets a single relationship', () => {
        const result = fns.relationship('author', article);
        expect(result).toEqual(article.relationships.author);
    });

    it("gets a single relationship's data", () => {
        const result = fns.relationshipData('author', article);
        expect(result).toEqual(article.relationships.author.data);
    });

    it('adds a relationship', () => {
        expect(<JsonApi.ResourceObject[]>article.relationships.comments
            .data).toHaveLength(2);

        const result = fns.addRelationship(
            'comments',
            'comments',
            '4444',
            article
        );

        const comments = result.relationships.comments
            .data as JsonApi.ResourceObject[];

        expect(comments).toHaveLength(3);
        expect(comments[2]).toEqual({
            type: 'comments',
            id: '4444',
        });
    });

    it('removes a relationship', () => {
        const result = fns.removeRelationship('comments', '12', article);

        const comments = result.relationships.comments
            .data as JsonApi.ResourceObject[];

        expect(comments).toHaveLength(1);
        expect(comments[0]).toEqual({
            type: 'comments',
            id: '5',
        });
    });

    it('sets a to-one relationship', () => {
        const result = fns.setRelationship('author', 'people', '9999', article);

        expect(result.relationships.author.data).toEqual({
            type: 'people',
            id: '9999',
        });
    });
});
