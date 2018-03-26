import * as JsonApi from './Structure';
declare class ResourceObject {
    private data;
    constructor(resourceObject: JsonApi.iResourceObject);
    /**
     * Static helper to build a new ResourceObject
     *
     * @param resourceObject
     */
    static of(resourceObject: JsonApi.iResourceObject): ResourceObject;
    /**
     * Apply the supplied function to the internal data and
     * return a new ResourceObject containing the result.
     *
     * @param f A function that accepts a iResource object and returns another
     */
    map(f: (x: JsonApi.iResourceObject) => JsonApi.iResourceObject): ResourceObject;
    /**
     * Build a new ResourceObject of the given type and attributes
     * (optionally providing and id)
     *
     * @param type
     * @param attributes
     * @param id
     */
    static build(type: string, attributes: JsonApi.iAttributes, id?: string): ResourceObject;
    /**
     * Return the type
     *
     * @return {String}
     */
    type(): string;
    /**
     * Return the ID
     *
     * @return {String|undefined}
     */
    id(): string | undefined;
    /**
     * Return all iAttributes
     */
    attributes(): JsonApi.iAttributes;
    /**
     * Return a single Attribute value
     *
     * @param name
     */
    attribute(name: string): {};
    /**
     * Return all iRelationships
     *
     * @return {Object}
     */
    relationships(): any;
    /**
     * Return a single Relationship value
     *
     * @param  name
     * @return ResourceObject|ResourceObject[]
     */
    relationship(name: string): any;
    /**
     * Update the attributes of the ResourceObject
     *
     * @param payload
     */
    update(payload?: JsonApi.iAttributes): ResourceObject;
    /**
     * Add a relationship to the ResourceObject by type and id
     *
     * @param relationship
     * @param typeOrResourceObject
     * @param id
     */
    addRelationship(relationship: string, typeOrResourceObject: string | ResourceObject, id?: string): ResourceObject;
    /**
     * Removes a relationship from the ResourceObject
     *
     * @param type
     * @param id
     */
    removeRelationship(type: string, id: string): ResourceObject;
    /**
     * Set a to-one relationship to the given type and id
     *
     * @param relationship
     * @param typeOrResourceObject
     * @param id
     */
    setRelationship(relationship: string, typeOrResourceObject: string | ResourceObject, id?: string): ResourceObject;
    /**
     * Returns the ResourceObject with the relationships stripped
     *
     * @return ResourceObject
     */
    withoutRelationships(): ResourceObject;
    /**
     * Output ResourceObject as a JSON-serializable object
     *
     * @param includeRelationships
     */
    toJSON(includeRelationships?: boolean): any;
}
export default ResourceObject;
