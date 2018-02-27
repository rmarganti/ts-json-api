"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const utils_1 = require("./utils");
class ResourceObject {
    constructor(resourceObject) {
        this.data = resourceObject;
        Object.freeze(this);
    }
    /**
     * Static helper to build a new ResourceObject
     *
     * @param resourceObject
     */
    static of(resourceObject) {
        return new ResourceObject(resourceObject);
    }
    /**
     * Apply the supplied function to the internal data and
     * return a new ResourceObject containing the result.
     *
     * @param f A function that accepts a iResource object and returns another
     */
    map(f) {
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
    static build(type, attributes, id) {
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
    type() {
        return ramda_1.prop('type', this.data);
    }
    /**
     * Return the ID
     *
     * @return {String|undefined}
     */
    id() {
        return ramda_1.prop('id', this.data);
    }
    /**
     * Return all iAttributes
     */
    attributes() {
        return ramda_1.prop('attributes', this.data);
    }
    /**
     * Return a single Attribute value
     *
     * @param name
     */
    attribute(name) {
        return ramda_1.path(['attributes', name], this.data);
    }
    /**
     * Return all iRelationships
     *
     * @return {Object}
     */
    relationships() {
        const relationships = ramda_1.propOr({}, 'relationships', this.data);
        return Object.keys(relationships).reduce((carrier, name) => (Object.assign({}, carrier, { [name]: this.relationship(name) })), {});
    }
    /**
     * Return a single Relationship value
     *
     * @param  name
     * @return ResourceObject|ResourceObject[]
     */
    relationship(name) {
        return ramda_1.pipe(ramda_1.path(['relationships', name, 'data']), ramda_1.ifElse(utils_1.isDefined, utils_1.convertToResourceObjectOrResourceObjects, () => undefined))(this.data);
    }
    /**
     * Update the attributes of the ResourceObject
     *
     * @param payload
     */
    update(payload = {}) {
        const updateAttributes = ramda_1.over(ramda_1.lensProp('attributes'), utils_1.mergeReverse(payload));
        return this.map(updateAttributes);
    }
    /**
     * Add a relationship to the ResourceObject by type and id
     *
     * @param relationship
     * @param typeOrResourceObject
     * @param id
     */
    addRelationship(relationship, typeOrResourceObject, id) {
        const addRelationship = ramda_1.over(ramda_1.lensPath(['relationships', relationship, 'data']), ramda_1.append({
            type: typeOrResourceObject instanceof ResourceObject
                ? typeOrResourceObject.type()
                : typeOrResourceObject,
            id: typeOrResourceObject instanceof ResourceObject
                ? typeOrResourceObject.id()
                : id,
        }));
        return this.map(addRelationship);
    }
    /**
     * Removes a relationship from the ResourceObject
     *
     * @param type
     * @param id
     */
    removeRelationship(type, id) {
        const hasGivenId = ramda_1.propEq('id', id);
        const removeRelationship = ramda_1.over(ramda_1.lensPath(['relationships', type, 'data']), ramda_1.reject(hasGivenId));
        return this.map(removeRelationship);
    }
    /**
     * Set a to-one relationship to the given type and id
     *
     * @param relationship
     * @param typeOrResourceObject
     * @param id
     */
    setRelationship(relationship, typeOrResourceObject, id) {
        const setRelationship = ramda_1.set(ramda_1.lensPath(['relationships', relationship, 'data']), {
            type: typeOrResourceObject instanceof ResourceObject
                ? typeOrResourceObject.type()
                : typeOrResourceObject,
            id: typeOrResourceObject instanceof ResourceObject
                ? typeOrResourceObject.id()
                : id,
        });
        return this.map(setRelationship);
    }
    /**
     * Returns the ResourceObject with the relationships stripped
     *
     * @return ResourceObject
     */
    withoutRelationships() {
        return this.map(ramda_1.omit(['relationships']));
    }
    /**
     * Output ResourceObject as a JSON-serializable object
     *
     * @param includeRelationships
     */
    toJSON(includeRelationships = false) {
        return ramda_1.ifElse(() => includeRelationships, ramda_1.omit(['relationships']), ramda_1.identity)(this.data);
    }
}
exports.default = ResourceObject;
