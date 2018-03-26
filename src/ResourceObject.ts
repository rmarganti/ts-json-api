import {
    assocPath,
    append,
    clone,
    identity,
    ifElse,
    flip,
    lensPath,
    lensProp,
    map,
    omit,
    over,
    path,
    pipe,
    prop,
    propOr,
    props,
    propEq,
    reject,
    set,
} from 'ramda';

import * as JsonApi from './Structure';

import {
    convertToResourceObjectOrResourceObjects,
    isDefined,
    mergeReverse,
} from './utils';

class ResourceObject {
    private data: JsonApi.iResourceObject;

    constructor(resourceObject: JsonApi.iResourceObject) {
        this.data = resourceObject;
        Object.freeze(this);
    }

    /**
     * Static helper to build a new ResourceObject
     *
     * @param resourceObject
     */
    static of(resourceObject: JsonApi.iResourceObject) {
        return new ResourceObject(resourceObject);
    }

    /**
     * Apply the supplied function to the internal data and
     * return a new ResourceObject containing the result.
     *
     * @param f A function that accepts a iResource object and returns another
     */
    map(f: (x: JsonApi.iResourceObject) => JsonApi.iResourceObject) {
        return ResourceObject.of(f(this.data));
    }

    /**
     * Build a new ResourceObject of the given type and attributes
     * (optionally providing and id)
     *
     * @param type
     * @param attributes
     * @param id
     */
    static build(type: string, attributes: JsonApi.iAttributes, id?: string) {
        return new ResourceObject({
            type,
            id,
            attributes,
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
     * Return all iAttributes
     */
    attributes(): JsonApi.iAttributes {
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
     * Return all iRelationships
     *
     * @return {Object}
     */
    relationships(): any {
        const relationships = propOr({}, 'relationships', this.data);

        return Object.keys(relationships).reduce(
            (carrier: object, name: string) => ({
                ...carrier,
                [name]: this.relationship(name),
            }),
            {}
        );
    }

    /**
     * Return a single Relationship value
     *
     * @param  name
     * @return ResourceObject|ResourceObject[]
     */
    relationship(name: string) {
        return pipe(
            path(['relationships', name, 'data']),
            ifElse(
                isDefined,
                convertToResourceObjectOrResourceObjects,
                () => undefined
            )
        )(this.data);
    }

    /**
     * Update the attributes of the ResourceObject
     *
     * @param payload
     */
    update(payload: JsonApi.iAttributes = {}) {
        const updateAttributes = over(
            lensProp('attributes'),
            mergeReverse(payload)
        );

        return this.map(updateAttributes);
    }

    /**
     * Add a relationship to the ResourceObject by type and id
     *
     * @param relationship
     * @param typeOrResourceObject
     * @param id
     */
    addRelationship(
        relationship: string,
        typeOrResourceObject: string | ResourceObject,
        id?: string
    ): ResourceObject {
        const addRelationship = over(
            lensPath(['relationships', relationship, 'data']),
            append({
                type:
                    typeOrResourceObject instanceof ResourceObject
                        ? typeOrResourceObject.type()
                        : typeOrResourceObject,
                id:
                    typeOrResourceObject instanceof ResourceObject
                        ? typeOrResourceObject.id()
                        : id,
            })
        );

        return this.map(addRelationship);
    }

    /**
     * Removes a relationship from the ResourceObject
     *
     * @param type
     * @param id
     */
    removeRelationship(type: string, id: string) {
        const hasGivenId = propEq('id', id);

        const removeRelationship = over(
            lensPath(['relationships', type, 'data']),
            reject(hasGivenId)
        );

        return this.map(removeRelationship);
    }

    /**
     * Set a to-one relationship to the given type and id
     *
     * @param relationship
     * @param typeOrResourceObject
     * @param id
     */
    setRelationship(
        relationship: string,
        typeOrResourceObject: string | ResourceObject,
        id?: string
    ) {
        const setRelationship = set(
            lensPath(['relationships', relationship, 'data']),
            {
                type:
                    typeOrResourceObject instanceof ResourceObject
                        ? typeOrResourceObject.type()
                        : typeOrResourceObject,
                id:
                    typeOrResourceObject instanceof ResourceObject
                        ? typeOrResourceObject.id()
                        : id,
            }
        );

        return this.map(setRelationship);
    }

    /**
     * Returns the ResourceObject with the relationships stripped
     *
     * @return ResourceObject
     */
    withoutRelationships() {
        return this.map(omit(['relationships']));
    }

    /**
     * Output ResourceObject as a JSON-serializable object
     *
     * @param includeRelationships
     */
    toJSON(includeRelationships: boolean = false) {
        return ifElse(
            () => includeRelationships,
            omit(['relationships']),
            identity
        )(this.data);
    }
}

export default ResourceObject;
