import { flip, ifElse, map, merge, propEq } from 'ramda';

import * as JsonApi from './Structure';
import ResourceObject from './ResourceObject';

/**
 * Converts a Resource Object to an ResourceObject
 *
 * @param resourceObject
 */
export const convertToResourceObject = (
    resourceObject: JsonApi.iResourceObject
) => new ResourceObject(resourceObject);

/**
 * If an Array is provided, it is converted to an Array of ResourceObjects.
 * If a single item is provided, it is converted to an ResourceObject
 */
export const convertToResourceObjectOrResourceObjects = ifElse(
    Array.isArray,
    map(convertToResourceObject),
    convertToResourceObject
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

/**
 * Determines if the provided Resource Object has the given ID
 *
 * @param id
 */
export const hasGivenId = (id: string) => propEq('id', id);
