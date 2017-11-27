"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
class Entity {
    constructor(resourceObject) {
        this._type = resourceObject.type;
        this._id = resourceObject.id;
        this._attributes = resourceObject.attributes || {};
        this._relationships = resourceObject.relationships || {};
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
        return this._type;
    }
    /**
     * Return the ID
     *
     * @return {String|undefined}
     */
    id() {
        return this._id;
    }
    /**
     * Return all Attributes
     */
    attributes() {
        return Object.assign({}, this._attributes);
    }
    /**
     * Return a single Attribute value
     *
     * @param name
     */
    attribute(name) {
        return this._attributes[name];
    }
    /**
     * Return all Relationships
     *
     * @return {Object}
     */
    relationships() {
        return Object.keys(this._relationships).reduce((carrier, relationshipName) => {
            return Object.assign({}, carrier, { [relationshipName]: this.relationship(relationshipName) });
        }, {});
    }
    /**
     * Return a single Relationship value
     *
     * @param name
     */
    relationship(name) {
        return this._relationships[name] && ramda_1.clone(this._relationships[name].data);
    }
    /**
     * Update the attributes of the Entity
     *
     * @param {Attributes} payload
     */
    update(payload = {}) {
        return this.cloneAndUpdate({
            attributes: Object.assign({}, this._attributes, payload),
        });
    }
    /**
     * Add a relationship to the Entity
     *
     * @param {string} relationship
     * @param {string} type
     * @param {string} id
     */
    addRelationship(relationship, type, id) {
        const updated = ramda_1.append({
            type,
            id
        }, ramda_1.path([relationship, 'data'], this._relationships) || []);
        const added = ramda_1.assocPath([relationship, 'data'], updated, this._relationships);
        return this.cloneAndUpdate({
            relationships: added
        });
    }
    /**
     * Removes a relationships from the Entity
     *
     * @param {string} type
     * @param {string} id
     */
    removeRelationship(type, id) {
        if (this._relationships === undefined || this._relationships[type] === undefined) {
            return this;
        }
        const updatedRelationships = Object.assign({}, this._relationships, { [type]: Object.assign({}, this._relationships[type], { data: this._relationships[type].data
                    .filter(relationship => relationship.id !== id) }) });
        return this.cloneAndUpdate({
            relationships: updatedRelationships,
        });
    }
    /**
     * Output Entity as a JSON-serializable object
     *
     * @param {boolean} includeRelationships
     */
    toJson(includeRelationships = false) {
        const response = {
            type: this._type,
            id: this._id,
            attributes: this._attributes,
        };
        return includeRelationships
            ? Object.assign(response, { relationships: this._relationships })
            : response;
    }
    /**
     * Create a new Entity with merged current and updated properites
     *
     * @param {Object} updatedProperties
     */
    cloneAndUpdate(updatedProperties = {}) {
        return new Entity(Object.assign({
            id: this._id,
            type: this._type,
            attribute: this._attributes,
            relationships: this._relationships,
        }, updatedProperties));
    }
}
exports.default = Entity;
