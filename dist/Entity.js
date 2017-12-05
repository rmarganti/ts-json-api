"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const mergeReverse = ramda_1.flip(ramda_1.merge);
class Entity {
    constructor(resourceObject) {
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
    static build(type, attributes, id) {
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
     * Return all Attributes
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
     * Return all Relationships
     *
     * @return {Object}
     */
    relationships() {
        return ramda_1.prop('relationships', this.data);
    }
    /**
     * Return a single Relationship value
     *
     * @param  name
     * @return Entity|Entity[]
     */
    relationship(name) {
        const convertToEntity = (relationship) => new Entity(relationship);
        const convertToEntityOrEntities = ramda_1.ifElse(Array.isArray, ramda_1.map(convertToEntity), convertToEntity);
        const isDefined = (item) => typeof item !== 'undefined';
        return ramda_1.pipe(ramda_1.path(['relationships', name, 'data']), ramda_1.ifElse(isDefined, convertToEntityOrEntities, () => undefined))(this.data);
    }
    /**
     * Update the attributes of the Entity
     *
     * @param {Attributes} payload
     */
    update(payload = {}) {
        const updatedData = ramda_1.over(ramda_1.lensProp('attributes'), mergeReverse(payload), this.data);
        return new Entity(updatedData);
    }
    /**
     * Add a relationship to the Entity
     *
     * @param {string} relationship
     * @param {string} type
     * @param {string} id
     */
    addRelationship(relationship, type, id) {
        const updatedData = ramda_1.over(ramda_1.lensPath(['relationships', relationship, 'data']), ramda_1.append({ type, id }), this.data);
        return new Entity(updatedData);
    }
    /**
     * Removes a relationship from the Entity
     *
     * @param {string} type
     * @param {string} id
     */
    removeRelationship(type, id) {
        const hasGivenId = ramda_1.propEq('id', id);
        const updatedData = ramda_1.over(ramda_1.lensPath(['relationships', type, 'data']), ramda_1.reject(hasGivenId), this.data);
        return new Entity(updatedData);
    }
    /**
     * Set a to-one relationship to the given type and id
     *
     * @param {string} relationship
     * @param {string} type
     * @param {string} id
     */
    setRelationship(relationship, type, id) {
        const updatedData = ramda_1.set(ramda_1.lensPath(['relationships', relationship, 'data']), { type, id }, this.data);
        return new Entity(updatedData);
    }
    /**
     * Returns the Entity with the relationships stripped
     *
     * @return Entity
     */
    withoutRelationships() {
        return new Entity(ramda_1.omit(['relationships'], this.data));
    }
    /**
     * Output Entity as a JSON-serializable object
     *
     * @param {boolean} includeRelationships
     */
    toJson(includeRelationships = false) {
        return ramda_1.ifElse(() => includeRelationships, ramda_1.omit(['relationships']), ramda_1.identity)(this.data);
    }
}
exports.default = Entity;
