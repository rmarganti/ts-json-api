"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const ResourceObject_1 = require("./ResourceObject");
/**
 * Converts a Resource Object to an ResourceObject
 *
 * @param resourceObject
 */
exports.convertToResourceObject = (resourceObject) => new ResourceObject_1.default(resourceObject);
/**
 * If an Array is provided, it is converted to an Array of ResourceObjects.
 * If a single item is provided, it is converted to an ResourceObject
 */
exports.convertToResourceObjectOrResourceObjects = ramda_1.ifElse(Array.isArray, ramda_1.map(exports.convertToResourceObject), exports.convertToResourceObject);
/**
 * A predicate that determines if the provided value is defined
 *
 * @param item
 */
exports.isDefined = (item) => typeof item !== 'undefined';
/**
 * Merge util that moves from left-to-right,
 * useful for merging small data sets into larger
 * data collections
 */
exports.mergeReverse = ramda_1.flip(ramda_1.merge);
/**
 * Determines if the provided Resource Object has the given ID
 *kjjjj
 * @param id
 */
exports.hasGivenId = (id) => ramda_1.propEq('id', id);
