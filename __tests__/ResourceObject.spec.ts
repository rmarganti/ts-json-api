import 'jest';
import { clone, lensPath, map, set } from 'ramda';

import ResourceObject from '../src/ResourceObject';
const mockResponse = require('./mocks/itemResponse.json');

describe('ResourceObject', () => {
    let entity: ResourceObject;

    beforeEach(() => {
        entity = new ResourceObject(clone(mockResponse.data));
    });

    it('builds a new ResourceObject', () => {
        expect(entity.attribute('title')).toEqual(
            'JSON API paints my bikeshed!'
        );
        expect(Object.keys(entity.relationships())).toEqual([
            'author',
            'comments',
        ]);

        expect(entity.relationship('author').id()).toEqual('9');
        expect(entity.relationship('author').type()).toEqual('people');

        expect(entity.relationship('comments')[0].id()).toEqual('5');
        expect(entity.relationship('comments')[0].type()).toEqual('comments');

        expect(entity.relationship('comments')[1].id()).toEqual('12');
        expect(entity.relationship('comments')[1].type()).toEqual('comments');
    });

    it("updated an ResourceObject's attributes immutably", () => {
        const result = entity.update({
            title: 'New title',
            deleted: true,
        });

        expect(entity.attributes()).toEqual({
            title: 'JSON API paints my bikeshed!',
        });

        expect(result.attributes()).toEqual({
            title: 'New title',
            deleted: true,
        });
    });

    it('adds a relationship immutably', () => {
        const result = entity.addRelationship('comments', 'comments', '4444');

        expect(
            entity.relationship('comments').map(comment => comment.id())
        ).toEqual(['5', '12']);

        expect(
            result.relationship('comments').map(comment => comment.id())
        ).toEqual(['5', '12', '4444']);
    });

    it('ads a another ResourceObject as a relationship', () => {
        const relationshipResourceObject = ResourceObject.build(
            'comments',
            { body: 'Inappropriate relationship' },
            '4242'
        );
        const result = entity.addRelationship(
            'comments',
            relationshipResourceObject
        );

        expect(
            entity.relationship('comments').map(comment => comment.id())
        ).toEqual(['5', '12']);

        expect(
            result.relationship('comments').map(comment => comment.id())
        ).toEqual(['5', '12', '4242']);
    });

    it('removes a relationship immutably', () => {
        const result = entity.removeRelationship('comments', '5');

        expect(
            entity.relationship('comments').map(comment => comment.id())
        ).toEqual(['5', '12']);

        expect(
            result.relationship('comments').map(comment => comment.id())
        ).toEqual(['12']);
    });

    it('sets a relationship immutably', () => {
        const result = entity.setRelationship('editor', 'people', '8675309');

        expect(result.relationship('editor').id()).toEqual('8675309');
        expect(result.relationship('editor').type()).toEqual('people');

        expect(entity.relationship('editor')).toBeUndefined;
    });

    it('sets a relationship to another ResourceObject immutably', () => {
        const relationshipResourceObject = ResourceObject.build(
            'people',
            {},
            '4242'
        );

        const result = entity.setRelationship(
            'editor',
            relationshipResourceObject
        );

        expect(result.relationship('editor').id()).toEqual('4242');
        expect(result.relationship('editor').type()).toEqual('people');

        expect(entity.relationship('editor')).toBeUndefined;
    });

    it('can build a new ResourceObject', () => {
        const result = ResourceObject.build('emcee', {
            name: 'SoulSauce',
            status: 'GOAT',
        });

        expect(result.type()).toEqual('emcee');
        expect(result.id()).toBeUndefined();
        expect(result.attributes()).toEqual({
            name: 'SoulSauce',
            status: 'GOAT',
        });
    });

    it('returns the ResourceObject without the relationships', () => {
        const result = entity.withoutRelationships();
        expect(entity.id()).toBeDefined;
        expect(entity.type()).toBeDefined;
        expect(entity.attributes()).toBeDefined;
        expect(entity.relationships()).toBeUndefined;
    });

    it('can return a serializable object', () => {
        expect(Object.keys(entity.toJSON()).sort()).toEqual([
            'attributes',
            'id',
            'links',
            'relationships',
            'type',
        ]);

        expect(
            Object.keys(entity.withoutRelationships().toJSON()).sort()
        ).toEqual(['attributes', 'id', 'links', 'type']);
    });

    it('can be mapped over', () => {
        const changeTitleToBeesKnees = set(
            lensPath(['attributes', 'title']),
            'BeesKnees'
        );

        const result = entity.map(changeTitleToBeesKnees);
        expect(result.attribute('title')).toEqual('BeesKnees');
    });
});
