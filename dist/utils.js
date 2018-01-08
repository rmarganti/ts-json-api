"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const Entity_1 = require("./Entity");
/**
 * Converts a Resource Object to an Entity
 *
 * @param resourceObject
 */
exports.convertToEntity = (resourceObject) => new Entity_1.default(resourceObject);
/**
 * If an Array is provided, it is converted to an Array of Entities.
 * If a single item is provided, it is converted to an Entity
 */
exports.convertToEntityOrEntities = ramda_1.ifElse(Array.isArray, ramda_1.map(exports.convertToEntity), exports.convertToEntity);
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
