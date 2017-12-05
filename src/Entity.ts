import {
    assocPath, append, clone, identity, ifElse, flip, lensPath, lensProp,
    map, merge, omit, over, path, pipe, prop, props, propEq, reject, set
} from 'ramda';

import { Attributes, ResourceObject, Relationships} from './JsonAPIStructure';

const mergeReverse = flip(merge);

export default class Entity {
    private data: ResourceObject;

    constructor(resourceObject: ResourceObject) {
        this.data = resourceObject;

        Object.freeze(this);
    }

    /**
     * Build a new Entity of the given type and attributes
     * (optionally providing and id)
     *
     * @param type
     * @param attributes
     * @param id
     */
    static build(type: string, attributes: Attributes, id?: string) {
        return new Entity({
            type,
            id,
            attributes
        });
    }

    /**
     * Return the type
     *
     * @return {String}
     */
    type(): string {
        return prop('type', this.data);
    }

    /**
     * Return the ID
     *
     * @return {String|undefined}
     */
    id(): string | undefined {
        return prop('id', this.data);
    }

    /**
     * Return all Attributes
     */
    attributes(): Attributes {
        return prop('attributes', this.data);
    }

    /**
     * Return a single Attribute value
     *
     * @param name
     */
    attribute(name: string) {
        return path(['attributes', name], this.data);
    }

    /**
     * Return all Relationships
     *
     * @return {Object}
     */
    relationships(): Relationships {
        return prop('relationships', this.data);
    }

    /**
     * Return a single Relationship value
     *
     * @param  name
     * @return Entity|Entity[]
     */
    relationship(name: string) {
        const convertToEntity = (relationship: ResourceObject) => new Entity(relationship);

        const convertToEntityOrEntities = ifElse(
            Array.isArray,
            map(convertToEntity),
            convertToEntity
        );

        const isDefined = (item: any): boolean => typeof item !== 'undefined';

        return pipe(
            path(['relationships', name, 'data']),
            ifElse(isDefined, convertToEntityOrEntities, () => undefined)
        )(this.data);
    }

    /**
     * Update the attributes of the Entity
     *
     * @param {Attributes} payload
     */
    update(payload: Attributes = {}) {
        const updatedData = over(
            lensProp('attributes'),
            mergeReverse(payload),
            this.data
        );

        return new Entity(updatedData);
    }

    /**
     * Add a relationship to the Entity
     *
     * @param {string} relationship
     * @param {string} type
     * @param {string} id
     */
    addRelationship(relationship: string, type: string, id: string) {
        const updatedData = over(
            lensPath(['relationships', relationship, 'data']),
            append({ type, id }),
            this.data
        );

        return new Entity(updatedData);
    }

    /**
     * Removes a relationship from the Entity
     *
     * @param {string} type
     * @param {string} id
     */
    removeRelationship(type: string, id: string) {
        const hasGivenId = propEq('id', id);

        const updatedData = over(
            lensPath(['relationships', type, 'data']),
            reject(hasGivenId),
            this.data
        );

        return new Entity(updatedData);
    }

    /**
     * Set a to-one relationship to the given type and id
     *
     * @param {string} relationship
     * @param {string} type
     * @param {string} id
     */
    setRelationship(relationship: string, type: string, id: string) {
        const updatedData = set(
            lensPath(['relationships', relationship, 'data']),
            { type, id },
            this.data
        );

        return new Entity(updatedData)
    }

    /**
     * Returns the Entity with the relationships stripped
     *
     * @return Entity
     */
    withoutRelationships() {
        return new Entity(
            omit(['relationships'], this.data)
        );
    }

    /**
     * Output Entity as a JSON-serializable object
     *
     * @param {boolean} includeRelationships
     */
    toJson(includeRelationships: boolean = false) {
        return ifElse(
            () => includeRelationships,
            omit(['relationships']),
            identity
        )(this.data);
    }
}
