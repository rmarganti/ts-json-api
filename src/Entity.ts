import {
    assocPath, append, clone, identity, ifElse, flip, lensPath, lensProp,
    map, merge, omit, over, path, pipe, prop, propOr, props, propEq, reject, set
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
        return prop('type', this.data as Record<any, any>);
    }

    /**
     * Return the ID
     *
     * @return {String|undefined}
     */
    id(): string | undefined {
        return prop('id', this.data as Record<any, any>);
    }

    /**
     * Return all Attributes
     */
    attributes(): Attributes {
        return prop('attributes', this.data as Record<any, any>);
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
    relationships(): any {
        const relationships = propOr({}, 'relationships', this.data);

        return Object.keys(relationships).reduce((carrier: object, name: string) => ({
            ...carrier,
            [name]: this.relationship(name),
        }), {});
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
     * @param payload
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
     * Add a relationship to the Entity by type and id
     *
     * @param relationship
     * @param typeOrEntity
     * @param id
     */
    addRelationship(relationship: string, typeOrEntity: string | Entity, id?: string): Entity {
        const updatedData = over(
            lensPath(['relationships', relationship, 'data']),
            append({
                type: (typeOrEntity instanceof Entity) ? typeOrEntity.type() : typeOrEntity,
                id: (typeOrEntity instanceof Entity) ? typeOrEntity.id() : id,
            }),
            this.data
        );

        return new Entity(updatedData);
    }

    /**
     * Removes a relationship from the Entity
     *
     * @param type
     * @param id
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
     * @param relationship
     * @param typeOrEntity
     * @param id
     */
    setRelationship(relationship: string, typeOrEntity: string | Entity, id?: string) {
        const updatedData = set(
            lensPath(['relationships', relationship, 'data']),
            {
                type: typeOrEntity instanceof Entity ? typeOrEntity.type() : typeOrEntity,
                id: typeOrEntity instanceof Entity ? typeOrEntity.id() : id,
            },
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
     * @param includeRelationships
     */
    toJson(includeRelationships: boolean = false) {
        return ifElse(
            () => includeRelationships,
            omit(['relationships']),
            identity
        )(this.data);
    }
}
