"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const utils_1 = require("./utils");
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
     * @return Entity|Entity[]
     */
    relationship(name) {
        return ramda_1.pipe(ramda_1.path(['relationships', name, 'data']), ramda_1.ifElse(utils_1.isDefined, utils_1.convertToEntityOrEntities, () => undefined))(this.data);
    }
    /**
     * Update the attributes of the Entity
     *
     * @param payload
     */
    update(payload = {}) {
        const updatedData = ramda_1.over(ramda_1.lensProp('attributes'), utils_1.mergeReverse(payload), this.data);
        return new Entity(updatedData);
    }
    /**
     * Add a relationship to the Entity by type and id
     *
     * @param relationship
     * @param typeOrEntity
     * @param id
     */
    addRelationship(relationship, typeOrEntity, id) {
        const updatedData = ramda_1.over(ramda_1.lensPath(['relationships', relationship, 'data']), ramda_1.append({
            type: (typeOrEntity instanceof Entity) ? typeOrEntity.type() : typeOrEntity,
            id: (typeOrEntity instanceof Entity) ? typeOrEntity.id() : id,
        }), this.data);
        return new Entity(updatedData);
    }
    /**
     * Removes a relationship from the Entity
     *
     * @param type
     * @param id
     */
    removeRelationship(type, id) {
        const hasGivenId = ramda_1.propEq('id', id);
        const updatedData = ramda_1.over(ramda_1.lensPath(['relationships', type, 'data']), ramda_1.reject(hasGivenId), this.data);
        return new Entity(updatedData);
    }
    /**
     * Set a to-one relationship to the given type and id
     *
     * @param relationship
     * @param typeOrEntity
     * @param id
     */
    setRelationship(relationship, typeOrEntity, id) {
        const updatedData = ramda_1.set(ramda_1.lensPath(['relationships', relationship, 'data']), {
            type: typeOrEntity instanceof Entity ? typeOrEntity.type() : typeOrEntity,
            id: typeOrEntity instanceof Entity ? typeOrEntity.id() : id,
        }, this.data);
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
     * @param includeRelationships
     */
    toJSON(includeRelationships = false) {
        return ramda_1.ifElse(() => includeRelationships, ramda_1.omit(['relationships']), ramda_1.identity)(this.data);
    }
}
exports.default = Entity;
