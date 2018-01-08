import { flip, ifElse, map, merge } from 'ramda';

import { iResourceObject } from './JsonAPIStructure';
import Entity from './Entity';

/**
 * Converts a Resource Object to an Entity
 *
 * @param resourceObject
 */
export const convertToEntity = (resourceObject: iResourceObject) => new Entity(resourceObject);

/**
 * If an Array is provided, it is converted to an Array of Entities.
 * If a single item is provided, it is converted to an Entity
 */
export const convertToEntityOrEntities = ifElse(
    Array.isArray,
    map(convertToEntity),
    convertToEntity
);

/**
 * A predicate that determines if the provided value is defined
 *
 * @param item
 */
export const isDefined = (item: any): boolean => typeof item !== 'undefined';

/**
 * Merge util that moves from left-to-right,
 * useful for merging small data sets into larger
 * data collections
 */
export const mergeReverse = flip(merge);
