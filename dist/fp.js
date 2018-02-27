"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const utils_1 = require("./utils");
exports.type = ramda_1.prop('type');
exports.id = ramda_1.prop('id');
/**
 * Return all attributes
 */
exports.attributes = ramda_1.prop('attributes');
/**
 * Return a single Attribute value
 *
 * string -> object -> any
 */
exports.attribute = ramda_1.curry((name, resourceObject) => ramda_1.path(['attributes', name], resourceObject));
/**
 * Return all iRelationships
 *
 * object -> object
 */
exports.relationships = ramda_1.propOr({}, 'relationships');
/**
 * Return a single Relationship value
 *
 * string -> object -> any
 */
exports.relationship = ramda_1.curry((name, resourceObject) => ramda_1.path(['relationships', name, 'data'], resourceObject));
/**
 * Update the attributes of the Resource Object
 *
 * object -> object -> object
 */
exports.updateAttributes = ramda_1.curry((payload = {}, resourceObject) => ramda_1.over(ramda_1.lensProp('attributes'), utils_1.mergeReverse(payload), resourceObject));
/**
 * Add a relationship to the Resource Object by type and id
 *
 * @param relationship
 * @param typeOrResource Object
 * @param id
 */
exports.addRelationship = ramda_1.curry((relationship, type, id, resourceObject) => ramda_1.over(ramda_1.lensPath(['relationships', relationship, 'data']), ramda_1.append({ type, id }), resourceObject));
/**
 * Removes a relationship from the Resource Object
 *
 * @param type
 * @param id
 */
exports.removeRelationship = ramda_1.curry((type, id, resourceObject) => ramda_1.over(ramda_1.lensPath(['relationships', type, 'data']), ramda_1.reject(utils_1.hasGivenId(id)), resourceObject));
/**
 * Set a to-one relationship to the given type and id
 *
 * @param relationship
 * @param typeOrResource Object
 * @param id
 */
exports.setRelationship = ramda_1.curry((relationship, type, id, resourceObject) => ramda_1.set(ramda_1.lensPath(['relationships', relationship, 'data']), { type, id }, resourceObject));
