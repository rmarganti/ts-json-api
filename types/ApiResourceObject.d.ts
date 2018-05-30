import { Attributes, NewResourceObject } from './structure';
declare class ApiResourceObject<D extends NewResourceObject = NewResourceObject> {
    private data;
    constructor(resourceObject: D);
    /**
     * Static helper to build a new ApiResourceObject
     *
     * @param resourceObject
     */
    static of<S extends NewResourceObject = NewResourceObject>(resourceObject: S): ApiResourceObject<S>;
    /**
     * Apply the supplied function to the internal data and
     * return a new ApiResourceObject containing the result.
     *
     * @param f A function that accepts a iResource object and returns another
     */
    map(f: (x: D) => D): ApiResourceObject<D>;
    /**
     * Build a new ResourceObject of the given type and attributes
     * (optionally providing and id)
     *
     * @param type
     * @param attributes
     * @param id
     */
    static build(type: string, attributes: Attributes, id?: string): ApiResourceObject<{
        type: string;
        id: string | undefined;
        attributes: Attributes;
    }>;
    /**
     * Return the type
     *
     * @return {String}
     */
    type(): string;
    /**
     * Return the ID
     */
    id(): string | undefined;
    /**
     * Return all Attributes
     */
    attributes(): D["attributes"];
    /**
     * Return a single Attribute value
     *
     * @param name
     */
    attribute(name: string): {} | undefined;
    /**
     * Return all iRelationships
     */
    relationships(): {};
    /**
     * Return a single Relationship value
     *
     * @param name
     */
    relationship(name: string): any;
    /**
     * Update the attributes of the ResourceObject
     *
     * @param payload
     */
    update(payload?: Attributes): ApiResourceObject<D>;
    /**
     * Add a relationship to the ResourceObject by type and id
     *
     * @param relationship
     * @param typeOrResourceObject
     * @param id
     */
    addRelationship(relationship: string, typeOrResourceObject: string | ApiResourceObject, id?: string): ApiResourceObject;
    /**
     * Removes a relationship from the ResourceObject
     *
     * @param type
     * @param id
     */
    removeRelationship(type: string, id: string): ApiResourceObject<D>;
    /**
     * Set a to-one relationship to the given type and id
     *
     * @param relationship
     * @param typeOrResourceObject
     * @param id
     */
    setRelationship(relationship: string, typeOrResourceObject: string | ApiResourceObject, id?: string): ApiResourceObject<D>;
    /**
     * Returns the ResourceObject with the relationships stripped
     *
     * @return ResourceObject
     */
    withoutRelationships(): any;
    /**
     * Output ResourceObject as a JSON-serializable object
     *
     * @param includeRelationships
     */
    toJSON(includeRelationships?: boolean): any;
}
export default ApiResourceObject;
