import { assocPath, append, clone, path } from 'ramda';

import { Attributes, ResourceObject, Relationships } from './JsonAPIStructure';

export default class Entity {
    private readonly _type: string;

    private readonly _id?: string;

    private readonly _attributes: Attributes;

    private readonly _relationships: Relationships;

    constructor(resourceObject: ResourceObject) {
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
        return this._type;
    }

    /**
     * Return the ID
     *
     * @return {String|undefined}
     */
    id(): string | undefined {
        return this._id;
    }

    /**
     * Return all Attributes
     */
    attributes(): Attributes {
        return Object.assign({}, this._attributes);
    }

    /**
     * Return a single Attribute value
     *
     * @param name
     */
    attribute(name: string) {
        return this._attributes[name];
    }

    /**
     * Return all Relationships
     *
     * @return {Object}
     */
    relationships(): Relationships {
        return Object.keys(this._relationships).reduce((carrier, relationshipName) => {
            return {
                ...carrier,
                [relationshipName]: this.relationship(relationshipName),
            };
        }, {});
    }

    /**
     * Return a single Relationship value
     *
     * @param name
     */
    relationship(name: string) {
        return this._relationships[name] && clone(this._relationships[name].data);
    }

    /**
     * Update the attributes of the Entity
     *
     * @param {Attributes} payload
     */
    update(payload: Attributes = {}) {
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
    addRelationship(relationship: string, type: string, id: string) {
        const updated = append(
            {
                type,
                id
            },
            path([relationship, 'data'], this._relationships) || []
        );

        const added = assocPath(
            [relationship, 'data'],
            updated,
            this._relationships
        );

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
    removeRelationship(type: string, id: string) {
        if (this._relationships === undefined || this._relationships[type] === undefined) {
            return this;
        }

        const updatedRelationships = {
            ...this._relationships,
            [type]: {
                ...this._relationships[type],
                data: (<ResourceObject[]>this._relationships[type].data)
                    .filter(relationship => relationship.id !== id)
            }
        }

        return this.cloneAndUpdate({
            relationships: updatedRelationships,
        });
    }

    /**
     * Output Entity as a JSON-serializable object
     *
     * @param {boolean} includeRelationships
     */
    toJson(includeRelationships: boolean = false) {
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
    private cloneAndUpdate(updatedProperties: object = {}): Entity {
        return new Entity(Object.assign({
            id: this._id,
            type: this._type,
            attribute: this._attributes,
            relationships: this._relationships,
        }, updatedProperties));
    }
}
